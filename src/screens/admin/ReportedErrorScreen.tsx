import {Pressable, StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useLayoutEffect, useState} from 'react';
import ReportTable from '@/component/admin/ReportTable';
import {getReportedError} from '@/services/admin';
import Pagination from '@/component/admin/Pagination';
import {Refresh} from '@/assets/svgs';
import {useIsFocused} from '@react-navigation/native';

const ReportedErrorScreen = ({navigation}: {navigation: any}) => {
  const [reportedError, setReportedError] = useState([]);
  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(1);

  const isFocused = useIsFocused();

  useEffect(() => {
    fetchReportedError(page);
  }, [page, isFocused]);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <Pressable onPress={() => fetchReportedError({page})} style={{marginRight: 16, padding: 8}}>
          <Refresh />
        </Pressable>
      ),
    });
  }, [navigation, page]);

  const fetchReportedError = async (page: number) => {
    try {
      const {result} = await getReportedError({page, size: 10});

      setReportedError(result.content);
      setTotalPages(result.totalPages);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <View style={styles.container}>
      <ReportTable data={reportedError} label={['신고 시간', '학번', '확인 여부']} />

      <Pagination currentPage={page} totalPages={totalPages} onPageChange={setPage} />
    </View>
  );
};

export default ReportedErrorScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    padding: 20,
  },
});
