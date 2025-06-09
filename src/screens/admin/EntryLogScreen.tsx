import {StyleSheet, View} from 'react-native';
import React, {useEffect, useState, useCallback, useLayoutEffect} from 'react';
import {SearchInput} from '@/component/admin';
import {getEntryFailLogs, getEntryLogs} from '@/services/admin';
import Table from '@/component/admin/Table';
import debounce from 'lodash/debounce';
import AdminHeader from '@/component/header/AdminHeader';
import EntryFilterModal from '@/component/admin/EntryfilterModal';
import Pagination from '@/component/admin/Pagination';
import moment from 'moment';

const size = 10;

const EntryLogScreen = ({navigation}: {navigation: any}) => {
  const [logs, setLogs] = useState<any[]>([]);
  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const [totalElement, setTotalElement] = useState(0);
  const [identifier, setIdentifier] = useState('');
  const [debouncedIdentifier, setDebouncedIdentifier] = useState('');
  const [isFilterModalVisible, setIsFilterModalVisible] = useState(false);
  const [type, setType] = useState<'success' | 'fail'>('success');

  const [label, setLabel] = useState(['학번', '시간', '인증', '출입']);

  const [filter, setFilter] = useState({
    identifier: '',
    startDate: '',
    endDate: '',
    startTime: '',
    endTime: '',
    authMethod: '',
  });

  useLayoutEffect(() => {
    navigation.setOptions({
      header: () => (
        <AdminHeader
          title={type === 'success' ? '출입 성공 로그' : '출입 실패 로그'}
          onPressRefresh={() => fetchEntryLogs(page, size, debouncedIdentifier, filter.startDate, filter.endDate, filter.startTime, filter.endTime, filter.authMethod)}
          pressable
          onPressTitle={() => {
            console.log('ASFD');
            setType((prev) => (prev === 'success' ? 'fail' : 'success'));
          }}
        />
      ),
    });

    setLabel(type === 'success' ? ['학번', '시간', '인증', '출입'] : ['시간', '인증', '출입']);
  }, [navigation, type, fetchEntryLogs]);

  // Create debounced function
  const debouncedSetIdentifier = useCallback(
    debounce((value: string) => {
      setDebouncedIdentifier(value);
    }, 1000),
    [],
  );

  // Update debounced value when identifier changes
  useEffect(() => {
    debouncedSetIdentifier(identifier);
  }, [identifier, debouncedSetIdentifier]);

  useEffect(() => {
    fetchEntryLogs(page, size, debouncedIdentifier, filter.startDate, filter.endDate, filter.startTime, filter.endTime, filter.authMethod);
  }, [debouncedIdentifier, type, filter]);

  console.log('filter', filter);
  const fetchEntryLogs = async (
    page: number,
    size: number,
    identifier: string,
    startDate: string,
    endDate: string,
    startTime: string,
    endTime: string,
    authMethod: string,
  ) => {
    let body: any = {page, size};

    if (identifier) {
      body.identifier = identifier;
    }

    if (startDate && startTime) {
      const formattedTime = `${startTime.toString().padStart(2, '0')}:00`;
      body.startTime = moment(startDate).format('YYYY-MM-DD') + 'T' + formattedTime;
    }

    if (endDate && endTime) {
      const formattedTime = `${endTime.toString().padStart(2, '0')}:00`;
      body.endTime = moment(endDate).format('YYYY-MM-DD') + 'T' + formattedTime;
    }

    if (authMethod) {
      body.authMethod = authMethod;
    }

    const {result, success} = type === 'success' ? await getEntryLogs(body) : await getEntryFailLogs(body);

    if (success) {
      setLogs(result.content);
      setTotalPages(result.totalPages);
      setTotalElement(result.totalElements);
    }
  };

  return (
    <View style={styles.container}>
      <SearchInput value={identifier} onChangeText={setIdentifier} onPressFilter={() => setIsFilterModalVisible(true)} disabled={type === 'fail'} />
      <Table data={logs} label={label} type={type} />
      <Pagination currentPage={page} totalPages={totalPages} onPageChange={setPage} />
      <EntryFilterModal
        isVisible={isFilterModalVisible}
        onClose={() => setIsFilterModalVisible(false)}
        filter={filter}
        setFilter={setFilter}
        onFetch={() => fetchEntryLogs(page, size, debouncedIdentifier, filter.startDate, filter.endDate, filter.startTime, filter.endTime, filter.authMethod)}
      />
    </View>
  );
};

export default EntryLogScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    padding: 20,
  },
});
