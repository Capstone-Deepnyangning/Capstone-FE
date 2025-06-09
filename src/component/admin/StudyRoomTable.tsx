import {FlatList, Pressable, StyleSheet, View} from 'react-native';
import React from 'react';
import {H, Text} from '../theme';
import {useNavigation} from '@react-navigation/native';
import moment from 'moment';

interface TableProps {
  data: any[];
  label: string[];
  updateStatus: (id: string, status: 'CONFIRMED' | 'CANCELLED' | 'COMPLETED') => void;
}

const StudyRoomTable = ({data, label, updateStatus}: TableProps) => {
  const navigation = useNavigation();
  const flexArr = [1, 1, 1, 1];
  const renderItem = ({item}: {item: any}) => {
    const {date, endTime, id, participants, purpose, startTime, status, studyRoom, userInfo} = item;
    console.log(item);
    return (
      <Pressable style={styles.tableRow} onPress={() => navigation.navigate('StudyRoomLogDetail', {id, updateStatus})}>
        <View style={{flex: flexArr[0]}}>
          <Text style={{fontFamily: 'Pretendard-Medium', fontSize: 12}} numberOfLines={1} ellipsizeMode="tail">
            {moment(date).format('YYYY-MM-DD')}
          </Text>
        </View>
        <View style={{flex: flexArr[1]}}>
          <Text style={{textAlign: 'center', fontFamily: 'Pretendard-Medium', fontSize: 12}} numberOfLines={1} ellipsizeMode="tail">
            {startTime}
          </Text>
        </View>
        <View style={{flex: flexArr[2]}}>
          <Text style={{textAlign: 'center', fontFamily: 'Pretendard-Medium', fontSize: 12}} numberOfLines={1} ellipsizeMode="tail">
            {studyRoom.name}
          </Text>
        </View>
        <View style={{flex: flexArr[3]}}>
          <Text style={{textAlign: 'center', fontFamily: 'Pretendard-Medium', fontSize: 12}} numberOfLines={1} ellipsizeMode="tail">
            {userInfo.identifier}
          </Text>
        </View>
      </Pressable>
    );
  };
  return (
    <View>
      <View style={{flexDirection: 'row', paddingVertical: 16}}>
        {label.map((item, idx) => (
          <Text
            key={idx}
            style={{
              flex: flexArr[idx],
              fontFamily: 'Pretendard-Bold',
              textAlign: 'center',
            }}>
            {item}
          </Text>
        ))}
      </View>
      <FlatList data={data} renderItem={renderItem} keyExtractor={(item) => item.id.toString()} ItemSeparatorComponent={() => <H h={8} />} style={{flexGrow: 1}} />
    </View>
  );
};

export default StudyRoomTable;

const styles = StyleSheet.create({
  tableRow: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderWidth: 1,
    borderRadius: 8,
    borderColor: '#F0F0F3',
  },
});
