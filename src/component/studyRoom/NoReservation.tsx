import {StyleSheet, View} from 'react-native';
import {Text} from '../theme';
import {Warning} from '@/assets/svgs';

const NoReservation = () => {
  return (
    <View style={styles.container}>
      <Warning />
      <Text style={styles.text}>진행된 예약이 없어요!</Text>
    </View>
  );
};
export default NoReservation;

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 32,
    backgroundColor: '#F0F0F3',
    alignSelf: 'center',
    flexDirection: 'row',
    height: 44,
    paddingHorizontal: 16,
  },
  text: {
    fontSize: 14,
    fontFamily: 'Pretendard-Regular',
    color: '#8A8A8A',
    textAlign: 'center',
  },
});
