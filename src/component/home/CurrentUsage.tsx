import {StyleSheet, View} from 'react-native';
import React from 'react';
import {H, Text} from '../theme';
import {colors} from '@/theme/color';
import {Status1, Status2, Status3, Status4} from '@/assets/svgs';

interface CurrentUsageProps {
  congestion: string;
}

const CurrentUsage = ({congestion = ''}: CurrentUsageProps) => {
  const splitedCongestion = congestion ? congestion.split(' ') : ['', '', '', ''];
  const status = splitedCongestion[3]?.replace(/[()]/g, '') || '';

  const StatusSVG = status === '여유' ? <Status1 /> : status === '보통' ? <Status2 /> : status === '약간 혼잡' ? <Status3 /> : <Status4 />;

  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.title}>현재 도서관 이용 인원</Text>
        <H h={6} />
        <Text style={styles.usage}>
          {splitedCongestion[0] + ' '}
          <Text style={[styles.usage, {color: colors.primary}]}>{splitedCongestion[1]} </Text>
          {splitedCongestion[2]}
          <Text style={styles.status}> ({status})</Text>
        </Text>
      </View>

      {StatusSVG}
    </View>
  );
};

export default CurrentUsage;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 24,
    paddingVertical: 18,
    backgroundColor: 'white',
    borderRadius: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  title: {
    fontSize: 16,
    fontFamily: 'Pretendard-Bold',
    color: '#000614',
  },
  usage: {
    fontSize: 18,
    fontFamily: 'Pretendard-Bold',
    color: '#000614',
  },
  status: {fontSize: 14, fontFamily: 'Pretendard-Medium', color: '#000614'},
});
