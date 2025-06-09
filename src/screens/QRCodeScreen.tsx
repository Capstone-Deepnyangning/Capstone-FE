import {StyleSheet, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import {Cat, CatSad} from '@/assets/svgs';
import Button from '@/component/button/Button';
import {H, Text} from '@/component/theme';
import QRCode from 'react-native-qrcode-svg';
import {generateQRCode} from '@/services/qr';

const QRCodeScreen = () => {
  const [step, setStep] = useState<0 | 1 | 2>(0);
  const [qrCode, setQrCode] = useState<string>('');
  const [disabled, setDisabled] = useState<boolean>(false);
  const [time, setTime] = useState<number>(180);

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  useEffect(() => {
    if (step !== 1) return;

    const interval = setInterval(() => {
      if (time <= 0) {
        setStep(2);
        clearInterval(interval);
        return;
      }
      setTime(time - 1);
    }, 1000);
    return () => clearInterval(interval);
  }, [time, step]);

  const onPress = {
    generate: async () => {
      setDisabled(true);
      setStep(1);
      setTime(180);
      try {
        const {result, success} = await generateQRCode();
        if (success) {
          setQrCode(result);
        }
      } catch (error) {
        console.log(error);
      } finally {
        setDisabled(false);
      }
    },
  };

  return (
    <View style={styles.container}>
      <H h={50} />

      {step !== 1 ? (
        <>
          <Text style={styles.title} center>
            {step === 0 ? '출입을 위해\nQR 코드를 생성합니다.' : 'QR 코드가\n만료되었습니다.'}
          </Text>
          <H h={20} />
          {step === 0 ? <Cat /> : <CatSad />}
          <H h={20} />
          {step === 0 && (
            <Text style={styles.desc}>
              QR은 <Text style={[styles.desc, {color: '#F00'}]}>3분</Text> 동안만 유효합니다.
            </Text>
          )}
          <H h={80} />
        </>
      ) : qrCode ? (
        <View>
          <View style={styles.qrcodeContainer}>
            <QRCode value={qrCode} size={160} />
          </View>
          <H h={20} />
          <Text style={styles.desc} center>
            남은시간: <Text style={[styles.desc, {color: '#F00'}]}>{formatTime(time)}</Text>
          </Text>
        </View>
      ) : null}

      {step !== 1 && <Button label="QR 생성하기" onPress={onPress.generate} disabled={disabled} />}
    </View>
  );
};

export default QRCodeScreen;

const styles = StyleSheet.create({
  container: {
    padding: 35,

    alignItems: 'center',
    backgroundColor: 'white',
    flex: 1,
  },
  title: {fontFamily: 'Pretendard-Bold', color: '#111', fontSize: 28},
  desc: {fontFamily: 'Pretendard-Medium', color: '#111', fontSize: 16},
  qrcodeContainer: {borderWidth: 2, borderRadius: 16, borderColor: 'black', padding: 20},
});
