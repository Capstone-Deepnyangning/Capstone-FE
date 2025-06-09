import {colors} from '@/theme/color';
import {StyleSheet, Text, View} from 'react-native';
import {Logo as LogoSVG} from '@assets/svgs';

const Logo = () => {
  return (
    <View>
      <View style={{flexDirection: 'row', alignItems: 'flex-end'}}>
        <Text style={styles.logo}>{'DEEP'}</Text>
        <LogoSVG style={styles.logo} />
      </View>
      <Text style={styles.logo}>{'NyangNing'}</Text>
    </View>
  );
};
export default Logo;

const styles = StyleSheet.create({
  logo: {
    color: colors.primary,
    fontFamily: 'Pretendard-ExtraBold',
    fontSize: 52,
  },
});
