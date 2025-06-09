import React from 'react';
import {UpDownArrow} from '@/assets/svgs';
import {Clock} from '@/assets/svgs';
import {MyReservation} from '@/component/studyRoom';
import StudyRoom from '@/component/studyRoom/StudyRoom';
import {Text, W} from '@/component/theme';
import Divider from '@/component/theme/Divider';
import {StudyRoomType} from '@/types/studyroom';
import {FlatList, Pressable, StyleSheet, View, LayoutChangeEvent, ActivityIndicator} from 'react-native';
import {useState, useEffect, useCallback} from 'react';
import BottomModal from '@/component/modal/BottomModal';
import moment from 'moment';
import {height} from '@/utils/dimensions';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {colors} from '@/theme/color';
import useStudyRoomStore from '@/store/useStudyRoomStore';

const StudyRoomScreen = ({navigation}: {navigation: any}) => {
  const {top, bottom} = useSafeAreaInsets();
  const {studyRooms, isLoading, message, fetchedDate, fetchStudyRooms, dateRange, timeRange, setDateRange, setTimeRange} = useStudyRoomStore();

  const [isModalVisible, setModalVisible] = useState(false);
  const [selectedRoom, setSelectedRoom] = useState<StudyRoomType | null>(null);
  const [emptyHeight, setEmptyHeight] = useState(0);

  useEffect(() => {
    fetchStudyRooms();
  }, [fetchStudyRooms]);

  const handleLayout = (event: LayoutChangeEvent) => {
    const {height} = event.nativeEvent.layout;
    setEmptyHeight(height);
  };

  const onPressReservation = useCallback(
    (room: StudyRoomType) => {
      navigation.navigate('Reservation', {room, date: dateRange.startDate, fetchStudyRooms});
    },
    [dateRange.startDate, fetchStudyRooms, navigation],
  );

  const renderItem = ({item}: {item: StudyRoomType}) => (
    <StudyRoom room={item} isSelected={selectedRoom?.id === item.id} onSelect={() => setSelectedRoom(item)} onPressReservation={onPressReservation} />
  );

  return (
    <>
      <FlatList
        data={studyRooms}
        renderItem={renderItem}
        ListHeaderComponent={() => (
          <View onLayout={handleLayout}>
            <MyReservation />
            <Divider height={4} />
            <Pressable style={styles.button} onPress={() => setModalVisible(true)}>
              <View style={styles.textContainer}>
                <Text style={styles.text}>예약 가능한 스터디룸</Text>
                <W w={12} />
                <Clock />
                <W w={4} />
                <Text style={styles.dateText}>{fetchedDate && moment(fetchedDate).format('M월 D일')}</Text>
              </View>
              <UpDownArrow />
            </Pressable>
          </View>
        )}
        style={{flex: 1, backgroundColor: 'white'}}
        ListEmptyComponent={() => (
          <View style={{height: height - emptyHeight - top - bottom - 100, justifyContent: 'center'}}>
            {isLoading ? (
              <ActivityIndicator size="small" color={colors.primary} />
            ) : (
              <Text style={styles.emptyText}>{!!message ? message : '예약 가능한 스터디룸이 없습니다.'}</Text>
            )}
          </View>
        )}
      />
      <BottomModal
        isVisible={isModalVisible}
        onClose={() => setModalVisible(false)}
        date={dateRange.startDate}
        setDate={(date) => setDateRange({startDate: date})}
        timeRange={timeRange}
        setTimeRange={setTimeRange}
        onFetch={fetchStudyRooms}
      />
    </>
  );
};

export default StudyRoomScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 20,
  },
  textContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  text: {
    fontSize: 16,
    fontFamily: 'Pretendard-Medium',
    color: '#000614',
  },
  dateText: {
    fontSize: 14,
    fontFamily: 'Pretendard-Regular',
    color: '#434648',
  },
  emptyText: {
    fontSize: 16,
    fontFamily: 'Pretendard-Medium',
    color: '#000614',
    alignSelf: 'center',
  },
});
