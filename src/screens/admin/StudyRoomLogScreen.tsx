import {Pressable, StyleSheet, View} from 'react-native';
import React, {useEffect, useLayoutEffect, useState} from 'react';
import {SearchInput} from '@/component/admin';
import StudyRoomTable from '@/component/admin/StudyRoomTable';
import {getStudyRoomLogs} from '@/services/admin';
import Pagination from '@/component/admin/Pagination';
import {Refresh} from '@/assets/svgs';

const StudyRoomLogScreen = ({navigation}: {navigation: any}) => {
  const [name, setName] = useState('');
  const [isFilterModalVisible, setIsFilterModalVisible] = useState(false);

  const [page, setPage] = useState(0);
  const [size, setSize] = useState(10);
  const [totalPages, setTotalPages] = useState(1);
  const [studyrooms, setStudyrooms] = useState([]);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <Pressable onPress={() => fetchStudyRoomLogs({page, size, name})} style={{marginRight: 16, padding: 8}}>
          <Refresh />
        </Pressable>
      ),
    });
  }, [navigation, page, size, name]);

  useEffect(() => {
    fetchStudyRoomLogs({page, size, name});
  }, [name, page, size]);

  const fetchStudyRoomLogs = async ({page, size, name}: {page: number; size: number; name: string}) => {
    const {result, success} = await getStudyRoomLogs({page, size, name});
    if (success) {
      setStudyrooms(result.content);
      setTotalPages(result.totalPages);
    }
  };

  const updateStatus = async (id: string, status: 'CONFIRMED' | 'CANCELLED' | 'COMPLETED') => {
    setStudyrooms((prev) => prev.map((studyroom) => (studyroom.id === id ? {...studyroom, status} : studyroom)));
  };

  return (
    <View style={styles.container}>
      <SearchInput value={name} onChangeText={setName} onPressFilter={() => setIsFilterModalVisible(true)} disabled={false} filter={false} />
      <StudyRoomTable data={studyrooms} label={['예약일', '시간', '스터디룸명', '학번']} updateStatus={updateStatus} />
      <Pagination currentPage={page} totalPages={totalPages} onPageChange={setPage} />
    </View>
  );
};

export default StudyRoomLogScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    padding: 20,
  },
});
