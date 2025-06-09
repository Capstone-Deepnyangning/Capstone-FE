import React, {useState, useEffect, useRef} from 'react';
import {View, StyleSheet, Pressable, Text, Modal, Animated} from 'react-native';
import {Dimensions} from 'react-native';
import {colors} from '@/theme/color';

import Selection from '../theme/Selection';

import Button from '../button/Button';
import {H} from '../theme';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {height, width} from '@/utils/dimensions';
import {DateSelectModal, TimeSelectModal} from '../modal';
import AuthMethodModal from '../modal/AuthMethodModal';
import moment from 'moment';

interface BottomModalProps {
  isVisible: boolean;
  onClose: () => void;
  filter: {
    startDate: string;
    endDate: string;
    startTime: string;
    endTime: string;
    authMethod: 'FACE' | 'QR';
  };
  setFilter: (filter: {startDate: string; endDate: string; startTime: string; endTime: string; authMethod: string}) => void;
  onFetch: () => void;
}

const EntryFilterModal: React.FC<BottomModalProps> = ({isVisible, onClose, filter, setFilter, onFetch}) => {
  const {bottom} = useSafeAreaInsets();
  const {startDate, endDate, startTime, endTime, authMethod} = filter || {};

  const [dateModalVisible, setDateModalVisible] = useState(false);
  const [timeModalVisible, setTimeModalVisible] = useState(false);
  const [authMethodModalVisible, setAuthMethodModalVisible] = useState(false);
  const [selectedStartDate, setSelectedStartDate] = useState(startDate);
  const [selectedEndDate, setSelectedEndDate] = useState(endDate);
  const [selectedTime, setSelectedTime] = useState({startTime, endTime});
  const [selectedAuthMethod, setSelectedAuthMethod] = useState(authMethod);

  const [type, setType] = useState<'start' | 'end'>('start');

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
          <View style={[styles.header, {flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between'}]}>
            <View style={{width: '50%'}}>
              <Text style={styles.title}>인증방법</Text>
            </View>
          </View>

          <View style={styles.dateContainer}>
            <View style={styles.dateInputContainer}>
              <Selection label={selectedAuthMethod} onPress={() => setAuthMethodModalVisible(true)} placeholder="인증 방법" />
            </View>
          </View>

          <View style={styles.header}>
            <Text style={styles.title}>시작 날짜 및 시간</Text>
          </View>

          <View style={styles.timeContainer}>
            <View style={styles.timeInputContainer}>
              <Selection
                label={selectedStartDate ? moment(selectedStartDate).format('YYYY-MM-DD') : ''}
                onPress={() => {
                  setDateModalVisible(true);
                  setType('start');
                }}
                placeholder="시작날짜"
              />
              <Text style={styles.separator}></Text>
              <Selection label={selectedTime.startTime + (selectedTime.startTime && '시')} onPress={() => setTimeModalVisible(true)} placeholder="시작시간" />
            </View>
          </View>
          <View style={styles.header}>
            <Text style={styles.title}>종료 날짜 및 시간</Text>
          </View>

          <View style={styles.timeContainer}>
            <View style={styles.timeInputContainer}>
              <Selection
                label={selectedEndDate ? moment(selectedEndDate).format('YYYY-MM-DD') : ''}
                onPress={() => {
                  setDateModalVisible(true);
                  setType('end');
                }}
                placeholder="종료날짜"
              />
              <Text style={styles.separator}></Text>
              <Selection label={selectedTime.endTime + (selectedTime.endTime && '시')} onPress={() => setTimeModalVisible(true)} placeholder="종료시간" />
            </View>
          </View>
          <Button
            label="확인"
            onPress={() => {
              setFilter({
                startDate: selectedStartDate,
                endDate: selectedEndDate,
                startTime: selectedTime.startTime,
                endTime: selectedTime.endTime,
                authMethod: selectedAuthMethod,
              });

              onClose();
            }}
          />
          <H h={bottom || 20} />
        </Animated.View>
      </Animated.View>

      <DateSelectModal
        visible={dateModalVisible}
        onClose={() => setDateModalVisible(false)}
        onSelectDates={(date) => {
          if (type === 'start') {
            setSelectedStartDate(date);
            setSelectedStartDate(date);
          } else {
            setSelectedEndDate(date);
          }
        }}
        selectedDate={type === 'start' ? selectedStartDate : selectedEndDate}
      />
      <TimeSelectModal
        visible={timeModalVisible}
        onClose={() => setTimeModalVisible(false)}
        onSelect={setSelectedTime}
        selectedTimes={selectedTime}
        times={times}
        endTimes={getEndTimes()}
      />
      <AuthMethodModal isVisible={authMethodModalVisible} onClose={() => setAuthMethodModalVisible(false)} onSelect={setSelectedAuthMethod} />
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

export default EntryFilterModal;
