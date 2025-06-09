import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {colors} from '@/theme/color';

interface TimeProps {
  time: number;
  isAvailable: boolean;
}

const Time = ({time, isAvailable}: TimeProps) => {
  return (
    <View style={styles.roomContainer}>
      <Text
        style={[
          styles.roomNumber,
          {color: isAvailable ? colors.primary : '##9CA6AE'},
        ]}>
        {time}
      </Text>
      <View
        style={[
          styles.room,
          {backgroundColor: isAvailable ? colors.primary : colors.gray100},
        ]}
      />
    </View>
  );
};

export default Time;

const styles = StyleSheet.create({
  room: {
    width: 20,
    height: 28,
    borderRadius: 4,
  },
  roomContainer: {
    alignItems: 'center',
  },
  roomNumber: {
    fontFamily: 'Pretendard-Medium',
    fontSize: 11,
  },
});
