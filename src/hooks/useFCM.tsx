import {postFCMToken} from '@/services/notification';
import {useUserStore} from '@/store/useUserStore';
import messaging from '@react-native-firebase/messaging';
import {useEffect, useCallback} from 'react';
import {Platform, PermissionsAndroid} from 'react-native';

const useFCM = () => {
  const {fcmTokens} = useUserStore();

  const getFCMToken = useCallback(async () => {
    try {
      await messaging().registerDeviceForRemoteMessages();
      return messaging()
        .getToken()
        .then((token) => {
          if (fcmTokens.length === 0 || !fcmTokens.includes(token)) {
            postFCMToken(token);
          }
        });
    } catch (error) {
      console.error('Failed to get FCM token:', error);
    }
  }, [fcmTokens]);

  const requestUserPermission = useCallback(async () => {
    try {
      if (Platform.OS === 'android') {
        if (Platform.Version >= 33) {
          const granted = await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS, {
            title: '알림 권한',
            message: '푸시 알림을 받기 위해 알림 권한이 필요합니다.',
            buttonNeutral: '나중에',
            buttonNegative: '거부',
            buttonPositive: '허용',
          });
          if (granted !== PermissionsAndroid.RESULTS.GRANTED) {
            console.log('Notification permission denied');
            return;
          }
        }
        await getFCMToken();
      } else {
        const authStatus = await messaging().requestPermission();
        console.log('Authorization status:', authStatus);

        const enabled = authStatus === messaging.AuthorizationStatus.AUTHORIZED || authStatus === messaging.AuthorizationStatus.PROVISIONAL;

        if (enabled) {
          await getFCMToken();
        }
      }
    } catch (error) {
      console.error('Failed to request permission:', error);
    }
  }, [getFCMToken]);

  useEffect(() => {
    requestUserPermission();
  }, [requestUserPermission]);

  return {requestUserPermission, getFCMToken};
};

export default useFCM;
