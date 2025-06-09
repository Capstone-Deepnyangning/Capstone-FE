import {Pressable, StyleSheet, View} from 'react-native';
import {Text, W} from '../theme';
import {useNavigation} from '@react-navigation/native';

const SIgnupButton = () => {
  const navigation = useNavigation<any>();

  const onPress = () => {
    navigation.navigate('SignUp');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.text}>아직 회원이 아니신가요?</Text>
      <W w={8} />
      <Pressable onPress={onPress}>
        <Text style={styles.signupText}>회원가입하기</Text>
      </Pressable>
    </View>
  );
};
export default SIgnupButton;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontSize: 12,
    color: 'black',
    fontFamily: 'Pretendard-Medium',
  },
  signupText: {
    fontSize: 12,
    color: 'black',
    fontFamily: 'Pretendard-Medium',
    textDecorationLine: 'underline',
  },
});
