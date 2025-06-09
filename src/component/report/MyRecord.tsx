import {Pressable, StyleSheet, View} from 'react-native';
import React from 'react';
import {ShadowCard} from '../home';
import {H, Text} from '../theme';
import {colors} from '@/theme/color';
import {useNavigation} from '@react-navigation/native';
import {useStaticsStore} from '@/store/useStaticsStore';
import {formatTime} from '@/utils/\bformatTime';

const MyRecord = () => {
  const {statics} = useStaticsStore();
  const navigation = useNavigation();

  const getTimeDifference = (weekly: number, global: number) => {
    const diff = weekly - global;
    const hours = Math.floor(Math.abs(diff) / 60);
    const mins = Math.round(Math.abs(diff) % 60);
    if (hours === 0) {
      return `${mins}분`;
    }
    return `${hours}시간 ${mins}분`;
  };

  const getCurrentDayAverage = (weeklyAvg: number) => {
    const today = new Date();
    const dayOfWeek = today.getDay(); // 0: 일요일, 1: 월요일, ..., 6: 토요일
    const daysPassed = dayOfWeek === 0 ? 1 : dayOfWeek; // 일요일인 경우 1일로 처리
    return Math.round((weeklyAvg * 7) / daysPassed);
  };

  const currentWeekAvg = getCurrentDayAverage(statics?.weeklyAvg);
  const timeDiff = getTimeDifference(currentWeekAvg, statics?.globalAvg);
  const isMore = currentWeekAvg > statics?.globalAvg;

  return (
    <ShadowCard>
      {!statics ? (
        <Empty />
      ) : (
        <View style={styles.container}>
          <Text style={styles.title}>이번주 방문 리포트</Text>
          <H h={20} />
          <Text style={styles.subTitle}>이번주 평균 학습 시간은</Text>
          <Text style={styles.subTitle}>
            <Text style={styles.subTitleTime}>{formatTime(currentWeekAvg)}</Text>입니다
          </Text>
          <H h={6} />
          <Text style={styles.desc}>
            전체 사용자 평균보다 {timeDiff} {isMore ? '더' : '덜'} 이용했어요! {isMore ? '🎉🥳' : ''}
          </Text>
          <H flex />
          <Pressable style={styles.button} onPress={() => navigation.navigate('MonthlyVisitTime' as never)}>
            <Text style={styles.buttonText}>월별 총 체류 시간 보러가기</Text>
          </Pressable>
        </View>
      )}
    </ShadowCard>
  );
};

const Empty = () => {
  return (
    <View style={styles.emptyContainer}>
      <Text style={styles.text}>{'아직 학술정보원\n방문기록이 없어요 :('}</Text>
      <Text style={styles.subText}>안면 인식으로 출입을 간편하게</Text>
    </View>
  );
};

export default MyRecord;

const styles = StyleSheet.create({
  text: {
    fontSize: 22,
    fontFamily: 'Pretendard-Bold',
    color: '#000614',
  },
  subText: {
    fontSize: 14,
    fontFamily: 'Pretendard-Medium',
    color: '#CFD2D3',
  },
  emptyContainer: {
    marginTop: 40,
  },
  button: {
    alignSelf: 'flex-end',
  },
  container: {
    flex: 1,
  },
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
  desc: {
    fontSize: 14,
    fontFamily: 'Pretendard-Medium',
    color: '#555',
  },
  buttonText: {
    fontSize: 16,
    fontFamily: 'Pretendard-Medium',
    color: '#000614',
    textDecorationLine: 'underline',
  },
});
