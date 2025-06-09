import {StyleSheet, Text, View, Alert} from 'react-native';
import React from 'react';
import {ReservationType} from '@/types/studyroom';
import {Clock, LocationBlue, User, UserBlue} from '@/assets/svgs';
import {H, W} from '@/component/theme';
import Divider from '@/component/theme/Divider';
import Button from '@/component/button/Button';
import {deleteReservation} from '@/services/studyroom';
import {useModalStore} from '@/store/useModalStore';
import {useReservationStore} from '@/store/useReservationStore';
import useStudyRoomStore from '@/store/useStudyRoomStore';

const ReservationDetailScreen = ({navigation, route}: {navigation: any; route: any}) => {
  const {reservation} = route.params;
  const {openModal} = useModalStore();
  const {cancelReservation} = useReservationStore();
  const {fetchStudyRooms} = useStudyRoomStore();
  const {studyRoom, date, startTime, endTime, purpose, participants, status} = reservation as ReservationType;
  const timeDiff = endTime.split(':')[0] - startTime.split(':')[0];

  const onPress = {
    edit: async () => {
      navigation.navigate('Reservation', {
        room: studyRoom,
        date,
        startTime,
        endTime,
        purpose,
        participants,
        status,
        isEdit: true,
        reservationId: reservation.id,
      });
    },
    cancel: () => {
      Alert.alert('예약 취소', '예약을 취소하시겠습니까?', [
        {text: '취소', onPress: () => {}},
        {
          text: '예약 취소',
          onPress: async () => {
            const {result, message, success} = await deleteReservation(reservation.id);
            if (success) {
              openModal({
                title: '예약 취소 성공',
                message: '예약이 취소되었습니다.',
                onConfirm: () => {
                  navigation.goBack();
                },
              });
              cancelReservation(reservation.id);
              fetchStudyRooms();
            }
          },
        },
      ]);
    },
  };

  return (
    <View style={styles.container}>
      <View style={styles.subContainer}>
        {/* 정보 */}
        <View style={styles.row}>
          <Text style={styles.roomname}>{studyRoom.name}</Text>
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
            {studyRoom.minCapacity}-{studyRoom.maxCapacity}명
          </Text>
          <W w={8} />
          <LocationBlue />
          <W w={2} />
          <Text style={styles.text}>{studyRoom.location}</Text>
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
          {participants.map((participant) => {
            return (
              <View style={styles.participant}>
                <User />
                <W w={8} />
                <Text style={styles.text}>{participant.identifier}</Text>
                <W w={8} />
                <Text style={styles.text}>{participant.name}</Text>
              </View>
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
      <View style={styles.buttonContainer}>
        <Button label="수정하기" onPress={onPress.edit} flex={1} />
        <W w={8} />
        <Button label="취소하기" onPress={onPress.cancel} type="white" flex={1} />
      </View>
    </View>
  );
};

export default ReservationDetailScreen;

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
  },
});
