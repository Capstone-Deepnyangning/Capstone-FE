import {StyleSheet, Text, View, Alert} from 'react-native';
import React, {useEffect, useState} from 'react';
import {ReservationType} from '@/types/studyroom';
import {Clock, LocationBlue, User, UserBlue} from '@/assets/svgs';
import {H, W} from '@/component/theme';
import Divider from '@/component/theme/Divider';
import Button from '@/component/button/Button';
import {useModalStore} from '@/store/useModalStore';
import {getStudyRoomDetail, putReservationStatus} from '@/services/admin';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

const StudyRoomDetailScreen = ({navigation, route}: {navigation: any; route: any}) => {
  const {id, updateStatus} = route.params;
  const {bottom} = useSafeAreaInsets();
  const {openModal} = useModalStore();
  const [studyRoom, setStudyRoom] = useState<any>(null);
  const {date, startTime, endTime, purpose, participants, status, studyRoom: studyRoomInfo} = (studyRoom as ReservationType) || {};
  const {name, minCapacity, maxCapacity, location} = studyRoomInfo || {};
  const timeDiff = endTime && startTime ? endTime.split(':')[0] - startTime.split(':')[0] : 0;

  useEffect(() => {
    fetchStudyRoomDetail(id);
  }, [id]);

  const fetchStudyRoomDetail = async (id: string) => {
    const {result, success} = await getStudyRoomDetail(id);
    if (success) {
      setStudyRoom(result);
    }
  };

  const onPress = {
    cancel: () => {
      Alert.alert('예약 취소', '예약을 취소하시겠습니까?', [
        {text: '취소', onPress: () => {}},
        {
          text: '예약 취소',
          onPress: async () => {
            const {success} = await putReservationStatus(id, 'CANCELED');
            if (success) {
              updateStatus(id, 'CANCELLED');
              navigation.goBack();
            }
          },
        },
      ]);
    },
    confirm: () => {
      navigation.goBack();
    },
  };

  return (
    <View style={styles.container}>
      <View style={styles.subContainer}>
        {/* 정보 */}
        <View style={styles.row}>
          <Text style={styles.roomname}>{name}</Text>
          <W w={8} />
          <Clock />
          <W w={2} />
          <Text style={styles.text}>{date}</Text>
        </View>
        <H h={4} />
        <View style={styles.row}>
          <UserBlue />
          <W w={2} />
          <Text style={styles.text}>
            {minCapacity}-{maxCapacity}명
          </Text>
          <W w={8} />
          <LocationBlue />
          <W w={2} />
          <Text style={styles.text}>{location}</Text>
        </View>
        <H h={16} />
        <Text style={styles.time}>
          {startTime} - {endTime} ({timeDiff}시간)
        </Text>
        <H h={16} />
        <Divider height={1} />
        <H h={16} />

        {/* 이용자*/}
        <View>
          {participants?.map((participant, index) => {
            return (
              <>
                {index === 0 ? (
                  <Text style={{fontSize: 16, fontFamily: 'Pretendard-Medium', color: '#000614', marginBottom: 8}}>예약자</Text>
                ) : index === 1 ? (
                  <Text style={{fontSize: 16, fontFamily: 'Pretendard-Medium', color: '#000614', marginBottom: 8}}>동반이용자</Text>
                ) : null}
                <View style={styles.participant}>
                  <User />
                  <W w={8} />
                  <Text style={styles.text}>{participant.identifier}</Text>
                  <W w={8} />
                  <Text style={styles.text}>{participant.name}</Text>
                </View>
              </>
            );
          })}
        </View>
        <H h={16} />
        <Divider height={1} />
        <H h={16} />

        {/* 목적 */}
        <View>
          <Text style={styles.roomname}>예약 사유</Text>
          <H h={8} />
          <View style={styles.participant}>
            <Text style={styles.text}>{purpose}</Text>
          </View>
        </View>
      </View>
      {/* 버튼 */}
      <View style={[styles.buttonContainer, {bottom: bottom + 20}]}>
        <Button label="예약 취소하기" onPress={onPress.cancel} flex={1} />
        <W w={8} />
        <Button label="확인" onPress={onPress.confirm} type="white" flex={1} />
      </View>
    </View>
  );
};

export default StudyRoomDetailScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    padding: 20,
  },
  subContainer: {
    borderWidth: 1,
    borderColor: '#F0F0F3',
    borderRadius: 8,
    padding: 20,
  },
  roomname: {
    fontSize: 16,
    fontFamily: 'Pretendard-Medium',
    color: '#000614',
  },
  text: {
    fontSize: 14,
    fontFamily: 'Pretendard-Regular',
    color: '#111',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  participant: {
    backgroundColor: '#F0F0F0',
    borderRadius: 8,
    padding: 10,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
    alignSelf: 'flex-start',
  },
  time: {
    fontSize: 26,
    fontFamily: 'Pretendard-Bold',
    color: '#000614',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
    width: '100%',
    position: 'absolute',
    bottom: 0,
    alignSelf: 'center',
  },
});
