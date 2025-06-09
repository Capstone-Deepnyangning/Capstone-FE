import {StyleSheet, Text, View, Pressable, Platform} from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {useNavigation, useTheme} from '@react-navigation/native';
import MyPageScreen from '@/screens/MyPageScreen';
import {
  HomeBlue,
  HomeGray,
  ReportBlue,
  ReportGray,
  StudyRoomBlue,
  StudyRoomGray,
  MypageBlue,
  MypageGray,
  LogoutCircle,
  Refresh,
  EntryLogBlue,
  EntryLogGray,
  ErrorBlue,
  ErrorGray,
} from '@/assets/svgs';
import EntryLogScreen from '@/screens/admin/EntryLogScreen';
import FailLogScreen from '@/screens/admin/FailLogScreen';
import ReportedErrorScreen from '@/screens/admin/ReportedErrorScreen';
import AdminHeader from '@/component/header/AdminHeader';
import StudyRoomLogScreen from '@/screens/admin/StudyRoomLogScreen';

const Tab = createBottomTabNavigator();

const CustomTabBar: React.FC<{state: any; descriptors: any; navigation: any}> = ({state, descriptors, navigation}) => {
  const {colors} = useTheme();

  return (
    <View style={styles.tabBarContainer}>
      {state.routes.map((route, index) => {
        const {options} = descriptors[route.key];
        const isFocused = state.index === index;

        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name);
          }
        };

        let iconName;
        if (route.name === 'EntryLog') {
          iconName = isFocused ? <EntryLogBlue /> : <EntryLogGray />;
        } else if (route.name === 'StudyRoomLog') {
          iconName = isFocused ? <StudyRoomBlue /> : <StudyRoomGray />;
        } else if (route.name === 'ReportedError') {
          iconName = isFocused ? <ErrorBlue /> : <ErrorGray />;
        } else if (route.name === 'MyPage') {
          iconName = isFocused ? <MypageBlue /> : <MypageGray />;
        }

        return (
          <Pressable key={route.key} onPress={onPress} style={styles.tabItem} accessibilityRole="button" accessibilityState={isFocused ? {selected: true} : {}}>
            {iconName}
            <Text style={[styles.tabLabel, {color: isFocused ? colors.primary : '#CFD2D3'}]}>
              {route.name === 'EntryLog' ? '출입 로그' : route.name === 'StudyRoomLog' ? '스터디룸' : route.name === 'ReportedError' ? '문제 신고' : '마이페이지'}
            </Text>
          </Pressable>
        );
      })}
    </View>
  );
};

const AdminBottomTab = () => {
  const navigation = useNavigation();

  const onPress = {
    back: () => {
      navigation.reset({
        index: 0,
        routes: [{name: 'Main' as never}],
      });
    },
  };

  return (
    <Tab.Navigator
      tabBar={(props) => <CustomTabBar {...props} />}
      screenOptions={{
        headerTitleAlign: 'center',
      }}>
      <Tab.Screen name="EntryLog" component={EntryLogScreen} options={{title: '관리자 페이지'}} />
      <Tab.Screen name="StudyRoomLog" component={StudyRoomLogScreen} options={{title: '스터디룸 예약현황'}} />
      <Tab.Screen name="ReportedError" component={ReportedErrorScreen} options={{title: '문제 신고'}} />
      <Tab.Screen name="MyPage" component={MyPageScreen} options={{title: '마이페이지'}} />
    </Tab.Navigator>
  );
};

export default AdminBottomTab;

const styles = StyleSheet.create({
  headerLeft: {
    marginLeft: 16,
  },
  headerRight: {
    marginRight: 16,
  },
  tabBarContainer: {
    flexDirection: 'row',
    backgroundColor: 'white',
    borderTopWidth: 1,
    borderTopColor: '#E5E5E5',
    paddingBottom: Platform.OS === 'ios' ? 20 : 0,
  },
  tabItem: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 8,
  },
  tabLabel: {
    fontSize: 12,
    marginTop: 4,
  },
});
