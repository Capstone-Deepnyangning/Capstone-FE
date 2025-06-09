import {FlatList, Pressable, StyleSheet, View} from 'react-native';
import React from 'react';
import {H, Text} from '../theme';
import {useNavigation} from '@react-navigation/native';
import moment from 'moment';

interface TableProps {
  data: any[];
  label: string[];
  type: 'success' | 'fail';
}

const Table = ({data, label, type}: TableProps) => {
  const navigation = useNavigation();
  const flexArr = type === 'fail' ? [6, 2, 2] : [3, 6, 1.5, 1.5];
  const renderItem = ({item}: {item: any}) => {
    const {accessTime, accessType, authMethod, id, identifier} = item;
    return (
      <Pressable style={styles.tableRow} onPress={() => navigation.navigate('EntryLogDetail', {id})}>
        {type !== 'fail' && (
          <View style={{flex: flexArr[0]}}>
            <Text style={{fontFamily: 'Pretendard-Medium'}}>{identifier}</Text>
          </View>
        )}
        <View style={{flex: flexArr[type === 'fail' ? 0 : 1]}}>
          <Text style={{textAlign: 'center', fontFamily: 'Pretendard-Medium', fontSize: 12}} numberOfLines={1}>
            {moment(accessTime).format('YYYY-MM-DD HH:mm:ss')}
          </Text>
        </View>
        <View style={{flex: flexArr[type === 'fail' ? 1 : 2]}}>
          <Text style={{textAlign: 'center', fontFamily: 'Pretendard-Medium'}}>{authMethod === 'FACE' ? '얼굴' : 'QR'}</Text>
        </View>
        <View style={{flex: flexArr[type === 'fail' ? 2 : 3]}}>
          <Text style={{textAlign: 'center', color: accessType === 'ENTRY' ? 'green' : 'red', fontFamily: 'Pretendard-Medium'}}>
            {accessType === 'ENTRY' ? '입장' : '퇴장'}
          </Text>
        </View>
      </Pressable>
    );
  };
  return (
    <View style={{flex: 1}}>
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
      <FlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
        ItemSeparatorComponent={() => <H h={8} />}
        contentContainerStyle={{paddingBottom: 40}}
      />
    </View>
  );
};

export default Table;

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
