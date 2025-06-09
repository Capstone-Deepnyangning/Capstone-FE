import {StyleSheet, Text, View, Dimensions, ViewToken, Pressable} from 'react-native';
import React, {useState, useRef} from 'react';
import {H} from '../theme';
import Reservation from '../reservation/Reservation';
import {NoReservation} from '../studyRoom';
import {useReservationStore} from '@/store/useReservationStore';
import {FlatList} from 'react-native';
import {ReservationType} from '@/types/studyroom';
import {width} from '@/utils/dimensions';
import {colors} from '@/theme/color';
import {ArrowRight} from '@/assets/svgs';
import {useNavigation} from '@react-navigation/native';
import moment from 'moment';

const {width: screenWidth} = Dimensions.get('window');

const MyReservation = ({}) => {
  const navigation: any = useNavigation();
  const {reservations} = useReservationStore();
  const [activeIndex, setActiveIndex] = useState(0);
  const flatListRef = useRef(null);

  const renderItem = ({item}: {item: ReservationType}) => (
    <View style={[styles.itemContainer, {opacity: moment(item.date).isSame() ? 1 : 0.7}]}>
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

  const onViewableItemsChanged = useRef(({viewableItems}: {viewableItems: ViewToken[]}) => {
    if (viewableItems.length > 0) {
      setActiveIndex(viewableItems[0].index ?? 0);
    }
  }).current;

  return (
    <View style={styles.container}>
      <Pressable onPress={() => navigation.navigate('MyReservation')} style={styles.row}>
        <Text style={styles.title}>내 예약 현황</Text>
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
  container: {
    backgroundColor: 'white',

    paddingVertical: 18,
    borderRadius: 16,
  },
  title: {
    marginLeft: 16,
    fontSize: 16,
    fontFamily: 'Pretendard-Bold',
    color: '#000614',
  },
  listContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  itemContainer: {
    width: width - 40,
    paddingHorizontal: 16,
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
  row: {flexDirection: 'row', alignItems: 'center'},
});
