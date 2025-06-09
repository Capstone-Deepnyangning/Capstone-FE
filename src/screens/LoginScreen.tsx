import Button from '@/component/button/Button';
import {H, Input} from '@/component/theme';
import Logo from '@/component/theme/Logo';
import {Keyboard, Pressable, View} from 'react-native';
import {height, width} from '@/utils/dimensions';
import SIgnupButton from '@/component/button/SIgnupButton';
import {useState} from 'react';
import {login} from '@/services/auth';
import {useUserStore} from '@/store/useUserStore';
import {useModalStore} from '@/store/useModalStore';
import {useNavigation} from '@react-navigation/native';
import {storage} from '@/utils/mmkv';
import {getUser} from '@/services/user';
import {setAuthToken} from '@/services/axios';

const LoginScreen = () => {
  const [identifier, setIdentifier] = useState('');
  const [password, setPassword] = useState('');
  const {openModal, closeModal} = useModalStore();
  const {login: loginUser} = useUserStore();
  const navigation = useNavigation();

  const onPressLogin = async () => {
    try {
      const {result, success} = await login({identifier, password});

      if (success) {
        storage.set('accessToken', result.accessToken);
        storage.set('refreshToken', result.refreshToken);
        setAuthToken(result.accessToken);
        const {result: user} = await getUser();

        loginUser({
          accessToken: result.accessToken,
          refreshToken: result.refreshToken,
          ...user,
        });
        navigation.reset({
          index: 0,
          routes: [{name: user.faceRecognition ? ('Camera' as never) : ('Main' as never)}],
        });
      }
    } catch (error: any) {
      console.log('error', error);
      openModal({
        title: '로그인 실패',
        message: error.response.data.message,
        onConfirm: () => closeModal(),
        type: 'alert',
      });
    }
  };
  return (
    <Pressable
      style={{
        flex: 1,
        alignItems: 'center',
        backgroundColor: 'white',
        paddingHorizontal: 35,
        width: width,
        paddingTop: height / 6,
      }}
      onPress={() => Keyboard.dismiss()}>
      <Logo />
      <H h={40} />
      <Input placeholder="학번 입력" value={identifier} onChangeText={setIdentifier} />
      <H h={8} />
      <Input placeholder="비밀번호 입력" value={password} onChangeText={setPassword} secureTextEntry />
      <H h={16} />
      <Button label="로그인" onPress={onPressLogin} />
      <H h={32} />
      <SIgnupButton />
    </Pressable>
  );
};
export default LoginScreen;
