import React, {useState, useEffect, useRef} from 'react';
import {View, StyleSheet, Pressable, Text, Modal, Animated} from 'react-native';
import {Dimensions} from 'react-native';
import {colors} from '@/theme/color';
import TimeSelectModal from './TimeSelectModal';
import Selection from '../theme/Selection';
import {DateSelectModal} from '.';
import Button from '../button/Button';
import {H} from '../theme';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {height, width} from '@/utils/dimensions';

interface TimeRange {
  startTime: string;
  endTime: string;
}

interface BottomModalProps {
  isVisible: boolean;
  onClose: () => void;
  date: string;
  setDate: (date: string) => void;
  timeRange: TimeRange;
  setTimeRange: (range: TimeRange) => void;
  onFetch: () => void;
}

const BottomModal: React.FC<BottomModalProps> = ({isVisible, onClose, date, setDate, timeRange, setTimeRange, onFetch}) => {
  const {bottom} = useSafeAreaInsets();
  const {startTime, endTime} = timeRange || {};

  const [dateModalVisible, setDateModalVisible] = useState(false);
  const [timeModalVisible, setTimeModalVisible] = useState(false);

  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(100)).current;

  const times = Array.from({length: 24}, (_, i) => `${i}`);

  const getEndTimes = () => {
    if (!startTime) return times;
    const startHour = parseInt(startTime);
    return times.filter((time) => parseInt(time) > startHour);
  };

  useEffect(() => {
    if (isVisible) {
      Animated.parallel([
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 300,
          useNativeDriver: true,
        }),
        Animated.timing(slideAnim, {
          toValue: 0,
          duration: 300,
          useNativeDriver: true,
        }),
      ]).start();
    } else {
      Animated.parallel([
        Animated.timing(fadeAnim, {
          toValue: 0,
          duration: 300,
          useNativeDriver: true,
        }),
        Animated.timing(slideAnim, {
          toValue: 100,
          duration: 300,
          useNativeDriver: true,
        }),
      ]).start();
    }
  }, [isVisible, fadeAnim, slideAnim]);

  console.log('timeRange', timeRange);
  return (
    <Modal visible={isVisible} onRequestClose={onClose} transparent animationType="fade">
      <Animated.View
        style={[
          styles.modalOverlay,
          {
            opacity: fadeAnim,
          },
        ]}>
        <Pressable style={styles.modalOverlay} onPress={onClose} />
        <Animated.View
          style={[
            styles.container,
            {
              transform: [{translateY: slideAnim}],
            },
          ]}>
          <View style={styles.header}>
            <Text style={styles.title}>예약가능한 날짜</Text>
          </View>

          <View style={styles.dateContainer}>
            <View style={styles.dateInputContainer}>
              <Selection label={date} onPress={() => setDateModalVisible(true)} placeholder="날짜" />
            </View>
          </View>

          <View style={styles.header}>
            <Text style={styles.title}>예약가능한 시간</Text>
          </View>

          <View style={styles.timeContainer}>
            <View style={styles.timeInputContainer}>
              <Selection label={startTime + (startTime && '시')} onPress={() => setTimeModalVisible(true)} placeholder="시작시간" />
              <Text style={styles.separator}>~</Text>
              <Selection label={endTime + (endTime && '시')} onPress={() => setTimeModalVisible(true)} placeholder="종료시간" />
            </View>
          </View>
          <Button
            label="확인"
            onPress={() => {
              onFetch();
              onClose();
            }}
          />
          <H h={bottom || 20} />
        </Animated.View>
      </Animated.View>

      <DateSelectModal visible={dateModalVisible} onClose={() => setDateModalVisible(false)} onSelectDates={setDate} selectedDate={date} />
      <TimeSelectModal
        visible={timeModalVisible}
        onClose={() => setTimeModalVisible(false)}
        onSelect={setTimeRange}
        selectedTimes={timeRange}
        times={times}
        endTimes={getEndTimes()}
      />
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalOverlay: {
    height: height,
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    justifyContent: 'flex-end',
    position: 'absolute',
    top: 0,
    width: width,
    zIndex: -1,
  },
  container: {
    backgroundColor: 'white',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
    paddingBottom: 0,
    maxHeight: Dimensions.get('window').height * 0.7,
  },
  header: {
    marginBottom: 15,
  },
  title: {
    fontSize: 20,
    fontFamily: 'Pretendard-Medium',
  },
  dateContainer: {
    marginBottom: 12,
  },
  timeContainer: {
    marginBottom: 20,
  },
  dateInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  timeInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  dateInput: {
    borderWidth: 1,
    borderColor: colors.primary,
    borderRadius: 8,
    padding: 10,
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  timeInput: {
    borderWidth: 1,
    borderColor: colors.primary,
    borderRadius: 8,
    padding: 10,
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  separator: {
    marginHorizontal: 10,
  },
});

export default BottomModal;
