import LoginScreen from '@/screens/LoginScreen';
import SignUpScreen from '@/screens/SignUpScreen';

import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {defaultOptions} from './options';
import CommonModal from '@/component/modal/CommonModal';
import BottomTab from './BottomTab';
import CameraScreen from '@/screens/CameraScreen';
import RecordingScreen from '@/screens/RecordingScreen';
import ReservationScreen from '@/screens/ReservationScreen';
import MyReservationScreen from '@/screens/MyReservationScreen';
import BackButton from '@/component/button/BackButton';
import MonthlyVisitTimeScreen from '@/screens/MonthlyVisitTimeScreen';
import PasswordResetScreen from '@/screens/PasswordResetScreen';
import ReservationDetailScreen from '@/screens/ReservationDetailScreen';
import QRCodeScreen from '@/screens/QRCodeScreen';
import ReportErrorScreen from '@/screens/ReportErrorScreen';
import SplashScreen from '@/screens/SplashScreen';
import AdminBottomTab from './AdminBottomTab';
import EntryLogDetailScreen from '@/screens/admin/EntryLogDetailScreen';
import useHandleMessage from '@/hooks/useHandleMessage';
import ReportedErrorDetailScreen from '@/screens/admin/ReportedErrorDetailScreen';
import SturyRoomDetailScreen from '@/screens/admin/SturyRoomDetailScreen';

const Stack = createNativeStackNavigator();

const Navigation = () => {
  useHandleMessage();

  return (
    <>
      <Stack.Navigator screenOptions={{...defaultOptions}}>
        <Stack.Screen name="Splash" component={SplashScreen} options={{headerShown: false, animation: 'fade'}} />
        <Stack.Screen name="Login" component={LoginScreen} options={{headerShown: false}} />
        <Stack.Screen
          name="SignUp"
          component={SignUpScreen}
          options={{
            title: '회원가입',
            headerLeft: BackButton,
          }}
        />
        <Stack.Screen name="Main" component={BottomTab} options={{headerShown: false}} />
        <Stack.Screen name="Admin" component={AdminBottomTab} options={{headerShown: false}} />
        <Stack.Screen name="Camera" component={CameraScreen} options={{title: '얼굴 등록 안내', headerLeft: BackButton}} />
        <Stack.Screen name="Record" component={RecordingScreen} options={{title: '얼굴 등록 안내', headerLeft: BackButton}} />
        <Stack.Screen name="Reservation" component={ReservationScreen} options={{title: '스터디룸 예약하기', headerLeft: BackButton}} />
        <Stack.Screen name="MyReservation" component={MyReservationScreen} options={{title: '내 예약 현황', headerLeft: BackButton}} />
        <Stack.Screen name="MonthlyVisitTime" component={MonthlyVisitTimeScreen} options={{title: '월별 총 체류 시간', headerLeft: BackButton}} />
        <Stack.Screen name="PasswordReset" component={PasswordResetScreen} options={{title: '비밀번호 변경', headerLeft: BackButton}} />
        <Stack.Screen name="ReservationDetail" component={ReservationDetailScreen} options={{title: '예약 상세', headerLeft: BackButton}} />
        <Stack.Screen name="QRCode" component={QRCodeScreen} options={{title: 'QR 인증', headerLeft: BackButton}} />
        <Stack.Screen name="ReportError" component={ReportErrorScreen} options={{title: '오류 신고', headerLeft: BackButton}} />
        <Stack.Screen name="EntryLogDetail" component={EntryLogDetailScreen} options={{title: '출입 로그 상세', headerLeft: BackButton}} />
        <Stack.Screen name="ReportedErrorDetail" component={ReportedErrorDetailScreen} options={{title: '문제 신고 상세', headerLeft: BackButton}} />
        <Stack.Screen name="StudyRoomLogDetail" component={SturyRoomDetailScreen} options={{title: '스터디룸 로그 상세', headerLeft: BackButton}} />
      </Stack.Navigator>

      <CommonModal />
    </>
  );
};
export default Navigation;
