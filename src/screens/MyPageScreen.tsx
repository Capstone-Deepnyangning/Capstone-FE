import {List} from '@/component/list';
import {Alert, Pressable, StyleSheet} from 'react-native';
import {logout} from '@/services/auth';
import {useUserStore} from '@/store/useUserStore';
import {useNavigation} from '@react-navigation/native';
import {deleteUser} from '@/services/user';
import {H} from '@/component/theme';
import {useEffect, useState} from 'react';
import {storage} from '@/utils/mmkv';

const MyPageScreen = () => {
  const {logout: logoutUser} = useUserStore();
  const navigation: any = useNavigation();

  const [pressCount, setPressCount] = useState(0);
  const [isAdmin, setIsAdmin] = useState(false);
  const [isAdminEnabled, setIsAdminEnabled] = useState(storage.getBoolean('isAdmin'));

  useEffect(() => {
    const storageAdmin = storage.getBoolean('isAdmin');
    if (storageAdmin) {
      setIsAdmin(true);
    }
  }, []);

  useEffect(() => {
    if (pressCount === 10) {
      setIsAdmin(true);
    }
  }, [pressCount]);

  const onPress = {
    changePassword: () => {
      navigation.navigate('PasswordReset');
    },
    reportError: () => {
      navigation.navigate('ReportError');
    },
    logout: () => {
      Alert.alert('로그아웃', '로그아웃 하시겠습니까?', [
        {text: '취소', style: 'cancel'},
        {
          text: '로그아웃',
          onPress: async () => {
            logout();
            logoutUser();
            navigation.reset({
              index: 0,
              routes: [{name: 'Login' as never}],
            });
          },
        },
      ]);
    },
    withdraw: () => {
      Alert.alert('회원탈퇴', '탈퇴 하시겠습니까?', [
        {text: '취소', style: 'cancel'},
        {
          text: '회원탈퇴',
          onPress: async () => {
            const {code} = await deleteUser();
            if (code === 200) {
              logoutUser();
              navigation.reset({
                index: 0,
                routes: [{name: 'Login' as never}],
              });
            }
          },
        },
      ]);
    },
  };

  const onPressSwitch = () => {
    if (isAdminEnabled) {
      setIsAdminEnabled(false);
      storage.delete('isAdmin');
    } else {
      setIsAdminEnabled(true);
      storage.set('isAdmin', true);
    }
  };

  const list = [
    {label: '비밀번호 변경', onPress: onPress.changePassword},
    {label: '안면인식 오류 신고', onPress: onPress.reportError},
    {label: '로그아웃', onPress: onPress.logout, color: 'red'},
  ];

  const list2 = [{label: '회원탈퇴', onPress: onPress.withdraw, color: 'red'}];
  const list3 = isAdmin
    ? [
        {label: '관리자 활성화 하기 (메뉴고정)', onPress: () => {}, switch: true, onPressSwitch, switchValue: isAdminEnabled},
        {label: '관리자 페이지', onPress: () => navigation.reset({index: 0, routes: [{name: 'Admin' as never}]})},
      ]
    : [];

  const onPressPressable = () => {
    setPressCount(pressCount + 1);
  };

  return (
    <>
      <List list={list} />
      <H h={40} />
      <List list={list2} />
      <H h={40} />
      <List list={list3} />
      <Pressable onPress={onPressPressable} style={styles.pressable} />
    </>
  );
};
export default MyPageScreen;

const styles = StyleSheet.create({
  pressable: {
    height: 200,
  },
});
