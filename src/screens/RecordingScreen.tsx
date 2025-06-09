import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import {VideoFile} from 'react-native-vision-camera';
import {storage} from '@/utils/mmkv';

import {width} from '@/utils/dimensions';
import {FaceRegistration, CheckSuccess, CatSad} from '@/assets/svgs';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {Camera, useCameraDevice, useFrameProcessor} from 'react-native-vision-camera';
import {Face, useFaceDetector, FaceDetectionOptions} from 'react-native-vision-camera-face-detector';
import {Worklets} from 'react-native-worklets-core';
import {registerFace} from '@/services/face';
import LoadingIndicator from '@/component/theme/LoadingIndicator';
import {useUserStore} from '@/store/useUserStore';
import Button from '@/component/button/Button';

type FaceFlowStep = 'face_in_frame' | 'hold_still' | 'rotate_clockwise' | 'rotate_counterclockwise';

const RecordingScreen = () => {
  const {bottom} = useSafeAreaInsets();
  const {setUser} = useUserStore();
  const faceDetectionOptions = useRef<FaceDetectionOptions>({
    performanceMode: 'accurate',
    classificationMode: 'all',
    minFaceSize: 0.15,
  }).current;

  const device = useCameraDevice('front');
  const {detectFaces} = useFaceDetector(faceDetectionOptions);
  const camera = useRef<Camera>(null);
  const [isRecording, setIsRecording] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [isUploadingSuccess, setIsUploadingSuccess] = useState(false);
  const [isUploadingError, setIsUploadingError] = useState(false);
  const [recordedVideo, setRecordedVideo] = useState<VideoFile | null>(null);
  const [touchCount, setTouchCount] = useState(() => storage.getNumber('touchCount') || 0);
  const [showDebug, setShowDebug] = useState(() => storage.getBoolean('showDebug') || false);
  // 회전 감지를 위한 상태들
  const [step, setStep] = useState<FaceFlowStep>('face_in_frame');
  const [holdStillStart, setHoldStillStart] = useState<number | null>(null);
  const previousFaceAngle = useRef<number | null>(null);
  const rotationProgress = useRef<number>(0);
  const counterClockwiseStartTime = useRef<number | null>(null);
  const [debugInfo, setDebugInfo] = useState({
    yaw: 0,
    roll: 0,
    pitch: 0,
    isFaceDetected: false,
  });

  const stepMessages: Record<FaceFlowStep, string> = {
    face_in_frame: '얼굴이 프레임 안에 들어오게 하세요',
    hold_still: '2초 동안 정면을 유지해주세요',
    rotate_clockwise: '이제 시계 방향으로 천천히 고개를 돌려주세요',
    rotate_counterclockwise: '반시계 방향으로 천천히 고개를 돌려주세요',
  };

  const navigation = useNavigation();

  useEffect(() => {
    (async () => {
      const status = await Camera.requestCameraPermission();
      // console.log({status});
    })();
  }, [device]);

  const startRecording = async () => {
    if (camera.current && !isRecording) {
      try {
        await camera.current.startRecording({
          onRecordingFinished: async (video) => {
            setRecordedVideo(video);
          },
          onRecordingError: (error) => {
            // console.error('Recording error:', error);
          },
        });
        setIsRecording(true);
      } catch (e) {
        console.error('Failed to start recording:', e);
      }
    }
  };

  const stopRecording = async () => {
    if (camera.current && isRecording) {
      try {
        await camera.current.stopRecording();
        setIsRecording(false);
      } catch (e) {
        console.error('Failed to stop recording:', e);
      }
    }
  };

  const uploadFace = async () => {
    if (!recordedVideo) return;

    setIsUploading(true);
    try {
      const response = await registerFace(recordedVideo);
      // console.log(response);
      if (response.success) {
        setUser({faceRegistration: true});
        setIsUploadingSuccess(true);
      } else {
        setIsUploadingError(true);
      }
    } catch (error) {
      setIsUploading(false);
      console.error('Face registration error:', error);
    }
  };

  const detectRotation = (currentAngle: number) => {
    if (previousFaceAngle.current === null) {
      previousFaceAngle.current = currentAngle;
      return;
    }

    // 각도 차이 계산 (-180 ~ 180 범위로 정규화)
    let angleDiff = currentAngle - previousFaceAngle.current;
    if (angleDiff > 180) angleDiff -= 360;
    if (angleDiff < -180) angleDiff += 360;

    // console.log('회전 감지:', {
    //   currentAngle: currentAngle.toFixed(2),
    //   previousAngle: previousFaceAngle.current.toFixed(2),
    //   angleDiff: angleDiff.toFixed(2),
    //   rotationProgress: rotationProgress.current.toFixed(2),
    //   step,
    // });

    // 회전 감지 (3도 이상 움직임이 있을 때만 감지)
    if (Math.abs(angleDiff) > 3) {
      if (step === 'rotate_clockwise') {
        if (angleDiff > 0) {
          rotationProgress.current += angleDiff;
          // console.log('시계방향 회전 진행:', rotationProgress.current.toFixed(2));
        }
      } else if (step === 'rotate_counterclockwise') {
        if (angleDiff < 0) {
          if (counterClockwiseStartTime.current === null) {
            counterClockwiseStartTime.current = Date.now();
          }
          rotationProgress.current += Math.abs(angleDiff);
          // console.log('반시계방향 회전 진행:', rotationProgress.current.toFixed(2));
        }
      }

      // 90도 회전이 완료되면 다음 단계로
      if (rotationProgress.current >= 90) {
        if (step === 'rotate_clockwise') {
          // console.log('시계방향 회전 완료 -> 반시계방향 회전 단계로 전환');
          setStep('rotate_counterclockwise');
          rotationProgress.current = 0;
          previousFaceAngle.current = currentAngle;
        } else if (step === 'rotate_counterclockwise') {
          const currentTime = Date.now();
          const elapsedTime = counterClockwiseStartTime.current ? (currentTime - counterClockwiseStartTime.current) / 1000 : 0;

          if (elapsedTime >= 2) {
            // console.log('반시계방향 회전 완료 -> 녹화 종료 및 업로드 시작');
            stopRecording();
            uploadFace();
          } else {
            // console.log(`반시계방향 회전 진행 중... (${elapsedTime.toFixed(1)}초)`);
          }
        }
      }
    }

    // 각도가 너무 크게 변하면 이전 각도를 현재 각도로 업데이트
    if (Math.abs(angleDiff) > 45) {
      previousFaceAngle.current = currentAngle;
      return;
    }

    previousFaceAngle.current = currentAngle;
  };

  const handleDetectedFaces = Worklets.createRunOnJS((faces: Face[]) => {
    if (faces.length === 0) {
      // console.log('얼굴이 감지되지 않음');
      setDebugInfo((prev) => ({...prev, isFaceDetected: false}));
      if (step === 'face_in_frame') {
        setStep('face_in_frame');
      }
      setHoldStillStart(null);
      stopRecording();
      return;
    }

    const face = faces[0];
    const yawAngle = face.yawAngle || 0;
    const rollAngle = face.rollAngle || 0;
    const pitchAngle = face.pitchAngle || 0;

    setDebugInfo({
      yaw: yawAngle,
      roll: rollAngle,
      pitch: pitchAngle,
      isFaceDetected: true,
    });

    // 얼굴이 프레임 중앙에 있는지 확인 (각도 제한을 20도로 증가)
    const isFaceCentered = Math.abs(yawAngle) < 20 && Math.abs(rollAngle) < 20 && Math.abs(pitchAngle) < 20;

    // console.log('얼굴 감지 디버그:', {
    //   yaw: yawAngle.toFixed(2),
    //   roll: rollAngle.toFixed(2),
    //   pitch: pitchAngle.toFixed(2),
    //   step,
    //   isFaceCentered,
    //   facesLength: faces.length,
    //   timestamp: new Date().toISOString(),
    // });

    if (step === 'face_in_frame' && faces.length > 0) {
      if (isFaceCentered) {
        // console.log('얼굴이 프레임 중앙에 감지됨 -> 정면 유지 단계로 전환');
        setStep('hold_still');
        setHoldStillStart(Date.now());
      } else {
        // console.log('얼굴이 감지되었지만 중앙에 위치하지 않음:', {
        //   yaw: yawAngle.toFixed(2),
        //   roll: rollAngle.toFixed(2),
        //   pitch: pitchAngle.toFixed(2),
        // });
      }
    }

    if (step === 'hold_still' && faces.length > 0 && isFaceCentered) {
      if (holdStillStart && Date.now() - holdStillStart > 2000) {
        // console.log('정면 유지 완료 -> 시계방향 회전 단계로 전환');
        setStep('rotate_clockwise');
        startRecording();
        previousFaceAngle.current = yawAngle;
        rotationProgress.current = 0;
      }
    }

    if (step === 'rotate_clockwise' || step === 'rotate_counterclockwise') {
      detectRotation(yawAngle);
    }
  });

  const frameProcessor = useFrameProcessor(
    (frame) => {
      'worklet';
      const faces = detectFaces(frame);
      // console.log('faces', faces);
      handleDetectedFaces(faces);
    },
    [handleDetectedFaces],
  );

  const handleScreenTouch = () => {
    const newCount = touchCount + 1;
    setTouchCount(newCount);
    storage.set('touchCount', newCount);

    if (newCount >= 10) {
      setShowDebug(true);
      storage.set('showDebug', true);
    }
  };

  return (
    <TouchableOpacity style={styles.container} onPress={handleScreenTouch} activeOpacity={1}>
      {isUploadingSuccess || isUploadingError ? (
        <View style={{height: 240, justifyContent: 'center', alignItems: 'center'}}>
          {isUploadingSuccess ? <CheckSuccess width={80} height={80} /> : <CatSad width={80} height={80} />}
        </View>
      ) : isUploading ? (
        <View style={{height: 240, justifyContent: 'center', alignItems: 'center'}}>
          <LoadingIndicator />
        </View>
      ) : (
        <>
          {device && (
            <View style={styles.cameraContainer}>
              <Camera ref={camera} style={styles.camera} device={device} isActive={true} onError={() => {}} frameProcessor={frameProcessor} video={true} />
            </View>
          )}
        </>
      )}
      <Text style={styles.text}>{isUploadingSuccess ? '등록완료!' : isUploadingError ? '등록실패' : isUploading ? '얼굴 등록중...' : stepMessages[step]}</Text>
      {(isUploadingSuccess || isUploadingError) && (
        <View style={{marginTop: 50}}>
          <Button
            label={isUploadingError ? '다시 시도하기' : '딥냥닝 이용하러가기'}
            onPress={() => {
              if (isUploadingError) {
                setIsUploadingError(false);
                setIsUploadingSuccess(false);
                setIsUploading(false);
                setStep('face_in_frame');
                setHoldStillStart(null);
                previousFaceAngle.current = null;
                rotationProgress.current = 0;
                counterClockwiseStartTime.current = null;
                startRecording();
              } else {
                navigation.reset({
                  index: 0,
                  routes: [{name: 'Main' as never}],
                });
              }
            }}
          />
        </View>
      )}
      {showDebug && (
        <View style={styles.debugContainer}>
          <Text style={styles.debugText}>얼굴 감지: {debugInfo.isFaceDetected ? '✅' : '❌'}</Text>
          <Text style={styles.debugText}>Yaw: {debugInfo.yaw.toFixed(1)}°</Text>
          <Text style={styles.debugText}>Roll: {debugInfo.roll.toFixed(1)}°</Text>
          <Text style={styles.debugText}>Pitch: {debugInfo.pitch.toFixed(1)}°</Text>
        </View>
      )}
      <FaceRegistration width={80} height={80} style={[styles.icon, {bottom: bottom + 16}]} />
    </TouchableOpacity>
  );
};

export default RecordingScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    padding: 48,
  },
  cameraContainer: {
    width: width / 1.5,
    height: width / 1.5,
    borderRadius: width / 3,
    overflow: 'hidden',
    alignSelf: 'center',
  },
  camera: {
    width: '100%',
    height: '100%',
  },
  text: {
    fontSize: 28,
    fontFamily: 'Pretendard-Bold',
    color: 'black',
    textAlign: 'center',
    marginTop: 76,
  },
  icon: {
    position: 'absolute',
    right: 16,
  },
  debugContainer: {
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    padding: 8,
    borderRadius: 8,
  },
  debugText: {
    color: 'white',
    fontSize: 14,
    fontFamily: 'Pretendard-Regular',
  },
});
