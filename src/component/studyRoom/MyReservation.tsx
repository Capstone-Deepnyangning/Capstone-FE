import {ArrowRight} from '@/assets/svgs';
import {Pressable, StyleSheet, View, FlatList} from 'react-native';
import {H, Text} from '../theme';
import NoReservation from './NoReservation';
import {useNavigation} from '@react-navigation/native';
import Reservation from '../reservation/Reservation';
import {useReservationStore} from '@/store/useReservationStore';
import {useRef, useState} from 'react';
import {width} from '@/utils/dimensions';
import {colors} from '@/theme/color';

const MyReservation = () => {
  const navigation = useNavigation();
  const {reservations} = useReservationStore();
  const [activeIndex, setActiveIndex] = useState(0);
  const flatListRef = useRef(null);

  const renderItem = ({item}: {item: any}) => (
    <View style={styles.itemContainer}>
      <Reservation reservation={item} />
    </View>
  );

  const renderIndicator = () => {
    if (reservations.length === 0) return null;
    return (
      <View style={styles.indicatorContainer}>
        {reservations.map((_, index) => (
          <View key={index} style={[styles.indicator, index === activeIndex && styles.activeIndicator]} />
        ))}
      </View>
    );
  };

  const onViewableItemsChanged = useRef(({viewableItems}: any) => {
    if (viewableItems.length > 0) {
      setActiveIndex(viewableItems[0].index);
    }
  }).current;

  return (
    <View style={styles.container}>
      <Pressable style={styles.button} onPress={() => navigation.navigate('MyReservation' as never)}>
        <Text style={styles.text}>내 예약 현황</Text>
        <ArrowRight />
      </Pressable>
      <H h={16} />
      {reservations.length > 0 ? (
        <>
          <FlatList
            ref={flatListRef}
            data={reservations}
            renderItem={renderItem}
            keyExtractor={(item) => item.id.toString()}
            horizontal
            pagingEnabled
            showsHorizontalScrollIndicator={false}
            onViewableItemsChanged={onViewableItemsChanged}
            viewabilityConfig={{viewAreaCoveragePercentThreshold: 50}}
            contentContainerStyle={styles.listContainer}
          />
          {renderIndicator()}
        </>
      ) : (
        <NoReservation />
      )}
    </View>
  );
};

export default MyReservation;

const styles = StyleSheet.create({
  listContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    paddingVertical: 20,
    width: '100%',
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
  },
  text: {
    fontSize: 16,
    fontFamily: 'Pretendard-Medium',
    color: '#000614',
  },
  itemContainer: {
    width: width,
    paddingHorizontal: 20,
  },
  indicatorContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 16,
  },
  indicator: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#E5E5E5',
    marginHorizontal: 4,
  },
  activeIndicator: {
    backgroundColor: colors.primary,
    width: 10,
    height: 10,
    borderRadius: 6,
  },
});
