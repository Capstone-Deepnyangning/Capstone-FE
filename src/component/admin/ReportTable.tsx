import {FlatList, Pressable, StyleSheet, View} from 'react-native';
import React from 'react';
import {H, Text} from '../theme';
import {useNavigation} from '@react-navigation/native';
import moment from 'moment';
import {CheckBlue, CheckEmpty} from '@/assets/svgs';

interface TableProps {
  data: any[];
  label: string[];
}

const ReportTable = ({data, label}: TableProps) => {
  const navigation = useNavigation();
  const flexArr = [3, 1, 1];
  const renderItem = ({item}: {item: any}) => {
    const {id, userId, read, createdAt, identifier} = item;
    console.log(item);
    return (
      <Pressable style={styles.tableRow} onPress={() => navigation.navigate('ReportedErrorDetail', {id})}>
        <View style={{flex: flexArr[1]}}>
          <Text style={{textAlign: 'center', fontFamily: 'Pretendard-Medium', fontSize: 12}}>{moment(createdAt).format('YYYY-MM-DD HH:mm:ss')}</Text>
        </View>
        <View style={{flex: flexArr[2]}}>
          <Text style={{textAlign: 'center', fontFamily: 'Pretendard-Medium', fontSize: 12}}>{identifier}</Text>
        </View>
        <View style={{flex: flexArr[3], fontSize: 12}}>{read ? <CheckBlue /> : <CheckEmpty />}</View>
      </Pressable>
    );
  };
  return (
    <View style={styles.container}>
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
        style={{flex: 1}}
        contentContainerStyle={{paddingBottom: 40}}
      />
    </View>
  );
};

export default ReportTable;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },

  tableRow: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderWidth: 1,
    borderRadius: 8,
    borderColor: '#F0F0F3',
    alignItems: 'center',
  },
});
