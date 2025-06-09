import {ScrollView, StyleSheet} from 'react-native';
import React from 'react';
import Reservation from '@/component/reservation/Reservation';
import {useReservationStore} from '@/store/useReservationStore';
import {H} from '@/component/theme';

const MyReservationScreen = () => {
  const {reservations} = useReservationStore();

  return (
    <ScrollView style={styles.container}>
      {reservations.map((reservation) => (
        <>
          <Reservation reservation={reservation} />
          <H h={16} />
        </>
      ))}
    </ScrollView>
  );
};

export default MyReservationScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    padding: 20,
  },
});
