import {useEffect} from 'react';
import {storage} from '@/utils/mmkv';
import {setAuthToken} from '@/services/axios';
import {getUser} from '@/services/user';
import {useUserStore} from '@/store/useUserStore';
import {useNavigation} from '@react-navigation/native';

const useAutoLogin = () => {
  const {login: loginUser} = useUserStore();
  const navigation = useNavigation();

  const accessToken = storage.getString('accessToken');
  const refreshToken = storage.getString('refreshToken');
  const isAdmin = storage.getBoolean('isAdmin');

  useEffect(() => {
    if (accessToken && refreshToken) {
      (async () => {
        try {
          setAuthToken(accessToken);

          // 최소 2초 대기와 사용자 정보 조회를 병렬로 실행
          const [userData] = await Promise.all([getUser(), new Promise<void>((resolve) => setTimeout(resolve, 800))]);

          const {result: user} = userData;

          loginUser({
            accessToken: accessToken,
            refreshToken: refreshToken,
            ...user,
          });

          console.log('af', user);
          navigation.reset({
            index: 0,
            routes: [{name: isAdmin ? ('Admin' as never) : user.faceRecognition ? ('Camera' as never) : ('Main' as never)}],
          });
        } catch (error) {
          navigation.reset({
            index: 0,
            routes: [{name: 'Login' as never}],
          });
        }
      })();
    } else {
      navigation.reset({
        index: 0,
        routes: [{name: 'Login' as never}],
      });
    }
  }, [accessToken, refreshToken, loginUser, navigation]);
};

export default useAutoLogin;
