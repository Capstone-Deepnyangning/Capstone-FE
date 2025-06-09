import {useNavigation} from '@react-navigation/native';
import {useEffect, useRef, useState} from 'react';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {useUserStore} from '@/store/useUserStore';
import {AppState, AppStateStatus} from 'react-native';
import messaging from '@react-native-firebase/messaging';

type RootStackParamList = {
  Main: undefined;
  StudyRoom: undefined;
  ReportedErrorScreen: undefined;
};

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

const useHandleMessage = () => {
  const navigation = useNavigation<NavigationProp>();
  const {isLoggedIn} = useUserStore();
  const appState = useRef(AppState.currentState);
  const [message, setMessage] = useState<any>(null);

  useEffect(() => {
    const subscription = AppState.addEventListener('change', (nextAppState: AppStateStatus) => {
      appState.current = nextAppState;
    });

    return () => {
      subscription.remove();
    };
  }, []);

  useEffect(() => {
    // Foreground message handler
    const unsubscribe = messaging().onMessage(async (remoteMessage) => {
      setMessage(remoteMessage);
    });

    // Background/Quit state message handler
    messaging().setBackgroundMessageHandler(async (remoteMessage) => {
      setMessage(remoteMessage);
    });

    return unsubscribe;
  }, []);

  useEffect(() => {
    if (!message?.data) return;
    if (!isLoggedIn) return;

    const {targetScreen} = message.data;
    const isAppActive = appState.current === 'active';

    // 메시지 타입에 따른 처리
    switch (targetScreen) {
      case 'home':
        navigation.navigate('Main');
        break;
      case 'studyroom/reservations':
        navigation.navigate('StudyRoom');
        break;
      case 'admin/reports':
        navigation.navigate('ReportedErrorScreen');
        break;
      default:
        console.log('Unknown target screen:', targetScreen);
    }
  }, [message, navigation, isLoggedIn]);
};

export default useHandleMessage;
