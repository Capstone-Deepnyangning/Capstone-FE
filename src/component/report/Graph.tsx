import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {H} from '../theme';
import {useStaticsStore} from '@/store/useStaticsStore';
import moment from 'moment';

const BAR_COLOR = '#3366FF';
const BAR_WIDTH = 20;
const CHART_HEIGHT = 100; // 막대 최대 높이(px)

const DAYS = ['월', '화', '수', '목', '금', '토', '일'];

const Graph = () => {
  const {statics} = useStaticsStore();

  if (!statics?.weeklyStay) {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>요일별 체류시간 그래프</Text>
        <H flex />
        <Text style={styles.noData}>데이터가 없습니다</Text>
      </View>
    );
  }

  // weeklyStay 데이터를 요일별로 매핑
  const data = DAYS.map((day, index) => {
    // 해당 요일의 데이터 찾기
    const stayData = statics.weeklyStay.find((item) => {
      const date = moment(item.date);
      // moment에서 월요일은 1, 일요일은 0이므로 index + 1과 비교
      return date.day() === (index + 1) % 7;
    });

    const value = stayData ? stayData.stayMinutes / 60 : 0; // 분을 시간으로 변환
    return {
      label: day,
      value: Number(value.toFixed(1)),
    };
  });

  const maxValue = Math.max(...data.map((d) => d.value));

  return (
    <View style={styles.container}>
      <Text style={styles.title}>요일별 체류시간 그래프</Text>
      <H flex />
      <View style={styles.chartArea}>
        {data.map((item) => {
          // 막대 높이 비율 계산
          const barHeight = item.value === 0 ? 4 : (item.value / maxValue) * CHART_HEIGHT;
          return (
            <View key={item.label} style={styles.barItem}>
              {/* 막대 */}
              <View
                style={[
                  styles.bar,
                  {
                    height: barHeight,
                    backgroundColor: item.value === 0 ? '#E3E6ED' : BAR_COLOR,
                  },
                ]}
              />
              <Text style={[styles.value, item.value === 0 && {color: '#bbb'}]}>{item.value.toFixed(1)}h</Text>
              {/* 라벨 */}
              <Text style={styles.label}>{item.label}</Text>
            </View>
          );
        })}
      </View>
    </View>
  );
};

export default Graph;

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    paddingHorizontal: 24,
    paddingVertical: 16,
    borderRadius: 16,
    height: 234,
  },
  title: {
    fontSize: 16,
    fontFamily: 'Pretendard-Bold',
    color: '#000614',
  },
  chartArea: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
  },
  barItem: {
    alignItems: 'center',
    width: 28,
  },
  value: {
    fontSize: 12,
    fontFamily: 'Pretendard-Bold',
    color: '#3366FF',
    marginBottom: 4,
  },
  bar: {
    width: BAR_WIDTH,
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
    marginBottom: 6,
  },
  label: {
    fontSize: 13,
    fontFamily: 'Pretendard-Bold',
    color: '#000614',
    marginTop: 2,
  },
  noData: {
    fontSize: 14,
    fontFamily: 'Pretendard-Regular',
    color: '#666',
    textAlign: 'center',
  },
});
