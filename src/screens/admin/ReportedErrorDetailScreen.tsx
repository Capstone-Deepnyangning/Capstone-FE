import {StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import {getReportedErrorDetail} from '@/services/admin';
import {UserBlue} from '@/assets/svgs';
import {H} from '@/component/theme';
import moment from 'moment';

const ReportedErrorDetailScreen = ({route}: {route: {params: {id: string}}}) => {
  const {id} = route.params;

  const [reportedError, setReportedError] = useState<any>(null);
  const {createdAt, read, identifier, name} = reportedError || {};

  console.log(reportedError);
  useEffect(() => {
    fetchReportedError();
  }, []);

  const fetchReportedError = async () => {
    try {
      const {result} = await getReportedErrorDetail(id);

      setReportedError(result);
    } catch (error) {
      console.log(error.response);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <View style={styles.header}>
          <Text style={styles.title}>신고자</Text>
          <Text style={styles.content}>신고시간 : {moment(createdAt).format('YYYY-MM-DD HH:mm')}</Text>
        </View>
        <H h={10} />
        <View style={styles.userInfo}>
          <UserBlue />
          <Text style={styles.text}>{name}</Text>
          <Text style={styles.text}>{identifier}</Text>
        </View>
      </View>
    </View>
  );
};

export default ReportedErrorDetailScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    padding: 20,
  },
  headerContainer: {
    padding: 20,
    borderWidth: 1,
    borderColor: '#F0F0F3',
    borderRadius: 8,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  content: {
    fontSize: 16,
  },
  userInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#F0F0F0',
    borderRadius: 8,
    padding: 10,
    alignSelf: 'flex-start',
    gap: 8,
  },
  userInfoItem: {
    flexDirection: 'row',
  },
  text: {
    fontSize: 14,
    fontFamily: 'Pretendard-Regular',
  },
});
