import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {Calendar, DateData} from 'react-native-calendars';
import {formatStayTime} from '@/utils/time';
import moment from 'moment';
import {colors} from '@/theme/color';

interface MonthlyCalendarProps {
  currentMonth: string;
  monthlyStay: Array<{
    date: string;
    stayMinutes: number;
  }>;
  monthlyStatistics?: {
    totalStay: number;
  };
}

const MonthlyCalendar = ({currentMonth, monthlyStay, monthlyStatistics}: MonthlyCalendarProps) => {
  const renderDay = (day: DateData) => {
    const dateString = day.dateString;
    const stayData = monthlyStay.find((item) => item.date === dateString);
    const hours = stayData ? `${(stayData.stayMinutes / 60).toFixed(1)}h` : '';
    const isSameMonth = moment(dateString).isSame(moment(currentMonth), 'month');

    return (
      <View style={{alignItems: 'center'}}>
        <Text style={{color: isSameMonth ? '#000' : '#B1B1B2'}}>{day.day}</Text>
        <Text style={{fontSize: 10, color: '#3B82F6', marginTop: 2}}>{hours}</Text>
      </View>
    );
  };

  return (
    <View>
      <Calendar
        key={currentMonth}
        current={currentMonth}
        style={styles.calendar}
        theme={{
          backgroundColor: '#FFFFFF',
          textSectionTitleColor: '#000000',
          calendarBackground: '#FFFFFF',
          todayTextColor: '#3B82F6',
          dayTextColor: '#000000',
          textDayFontWeight: '400',
          textDayFontSize: 16,
          textMonthFontWeight: '700',
          textMonthFontSize: 18,
        }}
        dayComponent={({date}) => date && renderDay(date)}
        customHeader={() => null}
        firstDay={1} // 월요일 시작
      />
    </View>
  );
};

export default MonthlyCalendar;

const styles = StyleSheet.create({
  calendar: {
    borderRadius: 16,
    backgroundColor: 'white',
  },
  subTitleTime: {
    fontSize: 16,
    fontWeight: '600',
    color: '#000000',
    marginBottom: 8,
  },
});
