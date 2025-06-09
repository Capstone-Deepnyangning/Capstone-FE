import {StyleSheet, ScrollView} from 'react-native';
import {CurrentUsage, FaceReset, MyReservation} from '@/component/home';
import {H} from '@/component/theme';
import {useEffect, useState} from 'react';
import {getCongestion} from '@/services/congestion';
import {getMyReservations} from '@/services/studyroom';
import {useReservationStore} from '@/store/useReservationStore';
import {MyRecord} from '@/component/report';
import {postFaceAccess} from '@/services/access';
import {useStaticsStore} from '@/store/useStaticsStore';
import {getStatistics} from '@/services/statistics';
import useFCM from '@/hooks/useFCM';

const HomeScreen = () => {
  const {setStatics} = useStaticsStore();
  const {setReservations} = useReservationStore();
  const {requestUserPermission} = useFCM();
  const [congestion, setCongestion] = useState<number>(0);

  useEffect(() => {
    fetchMyReservations();
    getHomeData();
    fetchStatics();
    requestUserPermission();
  }, []);

  const fetchMyReservations = async () => {
    const {result, success, message} = await getMyReservations();
    if (success) {
      setReservations(result.content);
    }
  };

  const getHomeData = async () => {
    const {result} = await getCongestion();
    setCongestion(result.message);
  };

  const fetchStatics = async () => {
    const {result, success, message} = await getStatistics();
    if (success) {
      setStatics(result);
    }
  };

  const handleFaceAccess = async () => {
    try {
      const {result} = await postFaceAccess({identifier: '11111111', accessType: 'EXIT', similarity: 1});
      console.log(result);
    } catch (error) {
      console.log(error.response);
    }
  };

  return (
    <ScrollView style={styles.container}>
      <CurrentUsage congestion={congestion} />
      <H h={12} />
      <MyReservation />
      <H h={12} />
      <MyRecord />
      <H h={12} />
      <FaceReset />
      {/* <Button label="얼굴 인식 입장" onPress={handleFaceAccess} /> */}
    </ScrollView>
  );
};
export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F0F0F3',
    padding: 20,
  },
});
