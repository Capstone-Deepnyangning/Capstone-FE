import {StyleSheet, View, Pressable, FlatList} from 'react-native';
import {Clock, UpDownArrow} from '@/assets/svgs';
import {H, Text, W} from '../theme';
import {useEffect, useState} from 'react';
import {getStudyRooms} from '@/services/studyroom';
import useStudyRoomStore from '@/store/useStudyRoomStore';
import BottomModal from '../modal/BottomModal';
import {StudyRoomType} from '@/types/studyroom';
import StudyRoom from './StudyRoom';

const AvailableRoom = () => {
  return (
    <View style={styles.container}>
      <FlatList
        data={studyRooms}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
        onEndReached={handleEndReached}
        onEndReachedThreshold={0.5}
        contentContainerStyle={styles.studyRoomContainer}
      />
    </View>
  );
};
export default AvailableRoom;
const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
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
  studyRoomContainer: {
    gap: 10,
  },
});
