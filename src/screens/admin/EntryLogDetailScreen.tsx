import {StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import {getDetilEntryLog} from '@/services/admin';
import Divider from '@/component/theme/Divider';
import {TextSkeleton} from '@/component/skeleton';

const EntryLogDetailScreen = ({navigation, route}: {navigation: any; route: any}) => {
  const {id} = route.params;
  const [log, setLog] = useState<any>(null);
  const {userInfo, accessType, authMethod, similarity, accessTime} = log || {};
  const {identifier, name} = userInfo || {};

  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    fetchLog();
  }, []);

  const fetchLog = async () => {
    try {
      setIsLoading(true);
      const {result, success} = await getDetilEntryLog(id);
      if (success) {
        setLog(result);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  const list = [
    {label: '학번', value: identifier},
    {label: '이름', value: name},
    {label: '출입시간', value: accessTime},
    {label: '인증방법', value: authMethod === 'FACE' ? '얼굴' : 'QR'},
    {label: '출입방향', value: accessType === 'ENTRY' ? '입장' : '퇴장'},
    {label: '유사도', value: similarity},
  ];

  return (
    <View style={styles.container}>
      <View style={styles.listContainer}>
        {list.map((item, index) => (
          <>
            <View style={styles.item} key={item.label}>
              <Text style={{fontFamily: 'Pretendard-Medium'}}>{item.label}</Text>
              {isLoading ? (
                <TextSkeleton />
              ) : (
                <Text style={{fontFamily: 'Pretendard-Medium', color: item.label === '출입방향' ? (accessType === 'ENTRY' ? 'green' : 'red') : 'black'}}>
                  {item.value}
                </Text>
              )}
            </View>
            {list.length - 1 !== index && (
              <View style={styles.divider}>
                <Divider height={1} />
              </View>
            )}
          </>
        ))}
      </View>
    </View>
  );
};

export default EntryLogDetailScreen;

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: 'white',
    flex: 1,
  },
  listContainer: {
    borderWidth: 1,
    borderColor: '#F0F0F3',
    borderRadius: 16,
  },
  item: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
  },
  divider: {paddingHorizontal: 16},
});
