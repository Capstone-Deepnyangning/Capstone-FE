import BackButton from '@/component/button/BackButton';
import {NativeStackNavigationOptions} from '@react-navigation/native-stack';

export const defaultOptions = (color: any): NativeStackNavigationOptions => ({
  headerTitleAlign: 'center',
  headerShadowVisible: false,
  headerTitleStyle: {
    color: color.white,
    fontSize: 18,
    fontWeight: '600',
  },
});
