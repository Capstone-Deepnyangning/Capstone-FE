import {StyleSheet, Text, View, TouchableOpacity, Pressable, Platform} from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {useNavigation, useTheme} from '@react-navigation/native';
import HomeScreen from '@/screens/HomeScreen';
import StudyRoomScreen from '@/screens/StudyRoomScreen';
import ReportScreen from '@/screens/ReportScreen';
import MyPageScreen from '@/screens/MyPageScreen';
import {HomeBlue, HomeGray, Qrcode, Report, ReportBlue, ReportGray, StudyRoomBlue, StudyRoomGray, MypageBlue, MypageGray} from '@/assets/svgs';

const Tab = createBottomTabNavigator();

const CustomTabBar = ({state, descriptors, navigation}) => {
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
        if (route.name === 'Home') {
          iconName = isFocused ? <HomeBlue /> : <HomeGray />;
        } else if (route.name === 'StudyRoom') {
          iconName = isFocused ? <StudyRoomBlue /> : <StudyRoomGray />;
        } else if (route.name === 'Report') {
          iconName = isFocused ? <ReportBlue /> : <ReportGray />;
        } else if (route.name === 'MyPage') {
          iconName = isFocused ? <MypageBlue /> : <MypageGray />;
        }

        return (
          <Pressable key={route.key} onPress={onPress} style={styles.tabItem} accessibilityRole="button" accessibilityState={isFocused ? {selected: true} : {}}>
            {iconName}
            <Text style={[styles.tabLabel, {color: isFocused ? colors.primary : '#CFD2D3'}]}>
              {route.name === 'Home' ? '홈' : route.name === 'StudyRoom' ? '스터디룸' : route.name === 'Report' ? '리포트' : '마이페이지'}
            </Text>
          </Pressable>
        );
      })}
    </View>
  );
};

const BottomTab = () => {
  const navigation = useNavigation();

  const onPress = {
    report: () => {
      navigation.navigate('ReportError');
    },
    qrcode: () => {
      navigation.navigate('QRCode');
    },
  };

  return (
    <Tab.Navigator
      tabBar={(props) => <CustomTabBar {...props} />}
      screenOptions={{
        headerTitleAlign: 'center',
        headerLeft: () => (
          <Pressable
            style={styles.headerLeft}
            hitSlop={{
              top: 10,
              bottom: 10,
              left: 10,
              right: 10,
            }}
            onPress={onPress.report}>
            >
            <Report />
          </Pressable>
        ),
        headerRight: () => (
          <Pressable
            style={styles.headerRight}
            hitSlop={{
              top: 10,
              bottom: 10,
              left: 10,
              right: 10,
            }}
            onPress={onPress.qrcode}>
            >
            <Qrcode />
          </Pressable>
        ),
      }}>
      <Tab.Screen name="Home" component={HomeScreen} options={{title: ' '}} />
      <Tab.Screen name="StudyRoom" component={StudyRoomScreen} options={{title: '스터디룸'}} />
      <Tab.Screen name="Report" component={ReportScreen} options={{title: '학술정보원 이용리포트'}} />
      <Tab.Screen name="MyPage" component={MyPageScreen} options={{title: '마이페이지'}} />
    </Tab.Navigator>
  );
};

export default BottomTab;

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
