import {Pressable, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {Clock, LocationBlue} from '@/assets/svgs';
import {H, W} from '../theme';
import moment from 'moment';
import {ReservationType} from '@/types/studyroom';
import {useNavigation} from '@react-navigation/native';
interface ReservationProps {
  reservation: ReservationType;
}

const Reservation = ({reservation}: ReservationProps) => {
  const navigation: any = useNavigation();
  const {studyRoom, date, startTime, endTime, purpose, participants, status} = reservation;
  const timeDiff = endTime.split(':')[0] - startTime.split(':')[0];
  const statusText = status === 'CONFIRMED' ? '예약확정' : status === 'CANCELLED' ? '예약취소' : '예약대기';

  // Check if reservation is in the past
  const isPast = moment(date).isBefore(moment(), 'day');

  const onPress = () => {
    navigation.navigate('ReservationDetail', {reservation});
  };

  return (
    <Pressable style={[styles.container, isPast && styles.pastContainer]} onPress={onPress}>
      <View style={styles.header}>
        <Text style={[styles.text, isPast && styles.pastText]}>{studyRoom.name}</Text>
        <W w={8} />
        <Clock />
        <W w={2} />
        <Text style={[styles.text, isPast && styles.pastText]}>{moment(date).format('M월 D일')}</Text>
        <W w={8} />
        <LocationBlue />
        <W w={2} />
        <Text style={[styles.text, isPast && styles.pastText]}>{studyRoom.location}</Text>
      </View>
      <H h={8} />
      <View style={styles.header}>
        <Text style={[styles.timeText, isPast && styles.pastText]}>
          {startTime} - {endTime} ({timeDiff}시간)
        </Text>
        <W flex />
        <View style={[styles.status, isPast && styles.pastStatus]}>
          <Text style={[styles.statusText, isPast && styles.pastText]}>{statusText}</Text>
        </View>
      </View>
    </Pressable>
  );
};

export default Reservation;

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    borderRadius: 8,
    borderColor: '#F0F0F3',
    paddingHorizontal: 16,
    paddingVertical: 20,
    borderWidth: 1,
  },
  pastContainer: {
    backgroundColor: '#F8F8F8',
    borderColor: '#E5E5E5',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  text: {
    fontSize: 14,
    fontFamily: 'Pretendard-Medium',
    color: '#000614',
  },
  pastText: {
    color: '#9CA6AE',
  },
  status: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: '#CFD2D3',
  },
  pastStatus: {
    borderColor: '#E5E5E5',
  },
  time: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  timeText: {
    fontSize: 20,
    fontFamily: 'Pretendard-Bold',
    color: '#000614',
  },
  statusText: {
    fontSize: 12,
    fontFamily: 'Pretendard-Medium',
    color: '#000614',
  },
});
