import {Pressable, StyleSheet, View} from 'react-native';
import React from 'react';
import {colors} from '@/theme/color';
import {LocationBlue, UserBlue} from '@/assets/svgs';
import {H, Text, W} from '../theme';
import Button from '../button/Button';
import {StudyRoomType} from '@/types/studyroom';
import Time from './Time';
interface StudyRoomProps {
  room: StudyRoomType;
  isSelected: boolean;
  onSelect: () => void;
  onPressReservation: (room: StudyRoomType) => void;
}

const StudyRoom = ({room, isSelected, onSelect, onPressReservation}: StudyRoomProps) => {
  const {name, location, maxCapacity, minCapacity, reservedTimes} = room || {};

  return (
    <Pressable style={[styles.container, {borderColor: isSelected ? colors.primary : colors.gray100}]} onPress={onSelect}>
      <View style={styles.header}>
        <Text style={styles.text}>{name}</Text>
        <W w={8} />
        <UserBlue />
        <W w={4} />
        <Text style={styles.text}>
          {minCapacity}~{maxCapacity}명
        </Text>
        <W w={8} />
        <LocationBlue />
        <W w={4} />
        <Text style={styles.text}>{location}</Text>
      </View>
      <H h={2} />
      <View style={styles.timeContainer}>
        {Object.entries(reservedTimes).map(([time, reserved]) => (
          <Time key={time} time={parseInt(time)} isAvailable={!reserved} />
        ))}
      </View>
      {isSelected && (
        <View style={styles.buttonContainer}>
          <Button label="예약하기" onPress={() => onPressReservation(room)} />
        </View>
      )}
    </Pressable>
  );
};

export default StudyRoom;

const styles = StyleSheet.create({
  container: {padding: 12, borderRadius: 8, borderWidth: 2, marginHorizontal: 20, marginBottom: 12},
  header: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  timeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  text: {fontFamily: 'Pretendard-Medium'},
  buttonContainer: {
    marginTop: 12,
  },
});
