import {StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import {MonthlyCalendar, MonthlyCanlendarHeader} from '@/component/report';
import {colors} from '@/theme/color';
import {H} from '@/component/theme';
import {getMonthlyStatistics} from '@/services/statistics';
import {MonthlyStatistics} from '@/types/statics';
import {formatTime} from '@/utils/\bformatTime';

const MonthlyVisitTimeScreen = () => {
  const [currentMonth, setCurrentMonth] = useState('2025-05');
  const [monthlyStatistics, setMonthlyStatistics] = useState<MonthlyStatistics | null>(null);

  useEffect(() => {
    getStatistics(currentMonth);
  }, [currentMonth]);

  const getStatistics = async (month: string) => {
    try {
      const {result, success, message} = await getMonthlyStatistics({
        year: month.split('-')[0],
        month: month.split('-')[1],
      });

      if (success) {
        setMonthlyStatistics(result);
      }
    } catch (error) {
      console.log(error.response);
    }
  };

  const onPrev = () => {
    const newDate = new Date(currentMonth);
    newDate.setMonth(newDate.getMonth() - 1);
    setCurrentMonth(newDate.toISOString().split('T')[0]);
  };

  const onNext = () => {
    const newDate = new Date(currentMonth);
    newDate.setMonth(newDate.getMonth() + 1);
    setCurrentMonth(newDate.toISOString().split('T')[0]);
  };

  return (
    <View style={styles.container}>
      <MonthlyCanlendarHeader currentMonth={currentMonth} onPrev={onPrev} onNext={onNext} />
      <View style={styles.calendarContainer}>
        <Text style={styles.title}>5월 방문 리포트</Text>
        <H h={20} />
        <Text style={styles.subTitle}>이번달 총 학습시간은 </Text>
        <Text style={styles.subTitle}>
          <Text style={styles.subTitleTime}>{formatTime(monthlyStatistics?.totalStay || 0)}</Text>입니다
        </Text>
        <H h={30} />
        <MonthlyCalendar currentMonth={currentMonth} monthlyStay={monthlyStatistics?.monthlyStay || []} />
      </View>
    </View>
  );
};

export default MonthlyVisitTimeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F0F0F3',
    padding: 20,
  },
  calendarContainer: {backgroundColor: 'white', borderRadius: 16, paddingHorizontal: 24, paddingVertical: 16},
  title: {
    fontSize: 16,
    fontFamily: 'Pretendard-SemiBold',
    color: '#000614',
  },
  subTitle: {
    fontSize: 22,
    fontFamily: 'Pretendard-Bold',
    color: '#000614',
  },
  subTitleTime: {
    fontSize: 28,
    fontFamily: 'Pretendard-Bold',
    color: colors.primary,
  },
});
