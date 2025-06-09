import {ArrowRight} from '@/assets/svgs';
import moment from 'moment';
import React from 'react';
import {View, Text, StyleSheet, Pressable} from 'react-native';

interface MonthlyCalendarHeaderProps {
  currentMonth: string;
  onPrev: () => void;
  onNext: () => void;
}

const MonthlyCalendarHeader = ({currentMonth, onPrev, onNext}: MonthlyCalendarHeaderProps) => (
  <View style={styles.header}>
    <Pressable onPress={onPrev} style={[styles.arrowBtn, {transform: [{rotate: '180deg'}]}]}>
      <ArrowRight />
    </Pressable>
    <Text style={styles.monthText}>{moment(currentMonth).format('M')}월</Text>
    <Pressable onPress={onNext} style={styles.arrowBtn}>
      <ArrowRight />
    </Pressable>
  </View>
);

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
  },
  arrowBtn: {
    padding: 8,
  },
  arrow: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  monthText: {
    fontSize: 16,
    fontWeight: 'bold',
    marginHorizontal: 16,
  },
});

export default MonthlyCalendarHeader;
