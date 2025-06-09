import {FlatList, KeyboardAvoidingView, Pressable, ScrollView, StyleSheet, Text, TextInput, View} from 'react-native';
import React, {useCallback, useEffect, useRef, useState} from 'react';
import Selection from '@/component/theme/Selection';
import Divider from '@/component/theme/Divider';
import {H, Input, W} from '@/component/theme';
import Button from '@/component/button/Button';
import {ios} from '@/utils/platform';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import DateSelectModal from '@/component/modal/DateSelectModal';
import TimeSelectModal from '@/component/modal/TimeSelectModal';
import moment from 'moment';
import {getAvailableTime, reserveStudyRoom, addParticipant, putReservation, getMyReservations} from '@/services/studyroom';
import {useModalStore} from '@/store/useModalStore';
import {width} from '@/utils/dimensions';
import {Close, User} from '@/assets/svgs';
import useStudyRoomStore from '@/store/useStudyRoomStore';
import {useReservationStore} from '@/store/useReservationStore';
interface TimeSlot {
  start: string;
  end: string[];
}

const ReservationScreen = ({navigation, route}: any) => {
  const {bottom} = useSafeAreaInsets();
  const {setReservations} = useReservationStore();
  const {openModal, closeModal} = useModalStore();
  const {fetchStudyRooms, addReservation} = useStudyRoomStore();
  const {room, date, isEdit = false, reservationId} = route.params || {};
  const {name: roomName} = room || {};

  const [selectedDate, setSelectedDate] = useState(date);
  const [selectedTimes, setSelectedTimes] = useState({
    startTime: '',
    endTime: '',
  });
  const [availableTimeSlots, setAvailableTimeSlots] = useState<TimeSlot[]>([]);
  const [availableStartTimes, setAvailableStartTimes] = useState<string[]>([]);
  const [availableEndTimes, setAvailableEndTimes] = useState<string[]>([]);

  const nameRef = useRef('');
  const studentIdRef = useRef('');
  const [purpose, setPurpose] = useState('');
  const [dateModalVisible, setDateModalVisible] = useState(false);
  const [timeModalVisible, setTimeModalVisible] = useState(false);
  const [participants, setParticipants] = useState<any[]>([]);
  const [currentPage, setCurrentPage] = useState(0);

  useEffect(() => {
    setSelectedTimes({
      startTime: '',
      endTime: '',
    });
  }, [selectedDate]);

  useEffect(() => {
    if (isEdit) {
      setParticipants(route.params.participants || []);
      setPurpose(route.params.purpose || '');
      setSelectedDate(route.params.date || date);
      setSelectedTimes({startTime: route.params.startTime, endTime: route.params.endTime});
    }
  }, [isEdit, route.params, date]);

  useEffect(() => {
    (async () => {
      try {
        const res = await getAvailableTime({studyRoomId: room.id, date: selectedDate});
        if (res.code === 200) {
          setAvailableTimeSlots(res.result);
          // Get all available start times
          const startTimes = res.result.map((slot: TimeSlot) => slot.start);
          setAvailableStartTimes(startTimes);
        }
      } catch (error) {
        console.error('Failed to fetch available times:', error);
      }
    })();
  }, [date, room.id, selectedDate]);

  // Reset selected times when date changes

  useEffect(() => {
    if (selectedTimes.startTime) {
      // Find the selected time slot and get its available end times
      const selectedSlot = availableTimeSlots.find((slot) => slot.start === selectedTimes.startTime);
      if (selectedSlot) {
        setAvailableEndTimes(selectedSlot.end);
      } else {
        setAvailableEndTimes([]);
      }
    } else {
      setAvailableEndTimes([]);
    }
  }, [selectedTimes.startTime, availableTimeSlots]);

  const fetchMyReservations = async () => {
    const {result, success, message} = await getMyReservations();
    if (success) {
      setReservations(result.content);
    }
  };

  const onReserve = async () => {
    try {
      if (isEdit) {
        const {success} = await putReservation(
          {
            studyRoomId: room.id,
            date: selectedDate,
            startTime: moment(selectedTimes.startTime, 'HH:mm').format('HH:mm'),
            endTime: moment(selectedTimes.endTime, 'HH:mm').format('HH:mm'),
            purpose,
            participants,
          },
          reservationId,
        );

        if (success) {
          openModal({
            title: '예약 수정 성공',
            message: '예약이 수정되었습니다.',
            onConfirm: () => {
              closeModal();
              navigation.goBack();
              fetchStudyRooms();

              fetchMyReservations();
            },
          });
        }
      } else {
        const {success, message} = await reserveStudyRoom({
          studyRoomId: room.id,
          date: selectedDate,
          startTime: moment(selectedTimes.startTime, 'HH:mm').format('HH:mm'),
          endTime: moment(selectedTimes.endTime, 'HH:mm').format('HH:mm'),
          purpose,
          participants,
        });

        if (success) {
          openModal({
            title: '예약 성공',
            message: '예약이 완료되었습니다.',
            onConfirm: () => {
              closeModal();
              navigation.goBack();
              fetchStudyRooms();
              fetchMyReservations();
            },
          });
        }
      }
    } catch (error: any) {
      console.log(error.response);
      openModal({
        title: '예약 실패',
        message: error?.data?.message || '예약에 실패했습니다.',
        onConfirm: () => {
          closeModal();
        },
      });
    }
  };

  const searchParticipant = async () => {
    try {
      let user = {
        identifier: studentIdRef.current,
        name: nameRef.current,
        date: selectedDate,
      };
      const {result, success, message} = await addParticipant(user);

      if (success) {
        if (participants.find((p) => p.identifier === result.identifier)) {
          openModal({
            title: '추가 실패',
            message: '이미 추가된 이용자입니다.',
            onConfirm: () => {
              closeModal();
            },
          });
        } else {
          setParticipants([...participants, user]);
        }
      } else {
        openModal({
          title: '조회 실패',
          message: message || '조회에 실패했습니다.',
        });
      }
    } catch (error) {
      openModal({
        title: '조회 실패',
        message: error?.response?.data?.message || '조회에 실패했습니다.',
        onConfirm: () => {
          closeModal();
        },
      });
    } finally {
      nameRef.current = '';
      studentIdRef.current = '';
    }
  };

  const removeParticipant = (identifier: string) => {
    const removedIndex = participants.findIndex((p) => p.identifier === identifier);
    setParticipants(participants.filter((p) => p.identifier !== identifier));

    // If the removed participant was at or before the current page, adjust the current page
    if (removedIndex <= currentPage && currentPage > 0) {
      setCurrentPage(currentPage - 1);
    }
  };

  const renderItem = ({item}: {item: any}) => {
    return (
      <View style={styles.userContainer}>
        <View style={styles.user}>
          <User />
          <Text>{item.name}</Text>
          <Text>{item.identifier}</Text>

          <Pressable onPress={() => removeParticipant(item.identifier)} style={styles.close}>
            <Close />
          </Pressable>
        </View>
      </View>
    );
  };

  const Indicator = () => {
    return (
      <View style={styles.indicatorContainer}>
        {[...participants, {isHeader: true}].map((_, index) => (
          <View key={index} style={[styles.indicatorDot, index === currentPage && styles.activeIndicatorDot]} />
        ))}
      </View>
    );
  };

  const renderHeader = useCallback(() => {
    return (
      <View style={styles.userContainer}>
        <View style={{flex: 1, flexDirection: 'row', gap: 8}}>
          <View style={{flex: 1}}>
            <Input placeholder="이름" onChangeText={(text) => (nameRef.current = text)} />
          </View>
          <View style={{flex: 1}}>
            <Input placeholder="학번" onChangeText={(text) => (studentIdRef.current = text)} />
          </View>
        </View>
        <Button label="조회" onPress={searchParticipant} width={76} />
      </View>
    );
  }, [searchParticipant]);

  return (
    <>
      <KeyboardAvoidingView behavior={ios ? 'padding' : 'height'} style={styles.container} keyboardVerticalOffset={ios ? 100 : 100}>
        <ScrollView style={styles.container}>
          <View style={styles.subContainer}>
            <Text style={styles.title}>{roomName}</Text>
            <H h={16} />
            <Selection label={selectedDate} onPress={() => setDateModalVisible(true)} placeholder="날짜" />
            <View style={styles.timeContainer}>
              <Selection
                label={selectedTimes.startTime ? moment(selectedTimes.startTime, 'HH:mm').format('HH:mm A') : ''}
                onPress={() => setTimeModalVisible(true)}
                placeholder="시작시간"
              />
              <Text>~</Text>
              <Selection
                label={selectedTimes.endTime ? moment(selectedTimes.endTime, 'HH:mm').format('HH:mm A') : ''}
                onPress={() => setTimeModalVisible(true)}
                placeholder="종료시간"
              />
            </View>
          </View>
          <Divider height={4} />
          <View style={[styles.subContainer, {paddingHorizontal: 0}]}>
            <View style={styles.row}>
              <Text style={styles.title}>{'동반 이용자'}</Text>
              <H h={16} />
              <Text style={styles.count}>
                {participants.length}/{room.maxCapacity}
              </Text>
            </View>
            <FlatList
              data={participants}
              renderItem={renderItem}
              pagingEnabled
              horizontal
              onMomentumScrollEnd={(event) => {
                const newPage = Math.round(event.nativeEvent.contentOffset.x / width);
                setCurrentPage(newPage);
              }}
              ListHeaderComponent={renderHeader}
              style={{width: width}}
            />

            <Indicator />
          </View>
          <Divider height={4} />
          <View style={styles.subContainer}>
            <Text style={styles.title}>{'예약사유'}</Text>
            <H h={16} />
            <TextInput
              value={purpose}
              onChangeText={setPurpose}
              style={styles.reasonInput}
              placeholder="500자 이내로 입력해주세요."
              placeholderTextColor={'#434648'}
              multiline
            />
          </View>
          <H h={40} />
          <View style={{paddingHorizontal: 20, marginBottom: bottom + 20}}>
            <Button
              label={isEdit ? '수정하기' : '예약하기'}
              onPress={onReserve}
              disabled={!purpose || !selectedDate || !selectedTimes.startTime || !selectedTimes.endTime}
            />
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
      <DateSelectModal visible={dateModalVisible} onClose={() => setDateModalVisible(false)} selectedDate={selectedDate} onSelectDates={setSelectedDate} />
      <TimeSelectModal
        visible={timeModalVisible}
        onClose={() => setTimeModalVisible(false)}
        onSelect={setSelectedTimes}
        selectedTimes={selectedTimes}
        times={availableStartTimes}
        endTimes={availableEndTimes}
      />
    </>
  );
};

export default ReservationScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  title: {
    fontSize: 20,
    fontFamily: 'Pretendard-Medium',
  },
  subContainer: {
    padding: 20,
    marginBottom: 16,
  },
  timeContainer: {flexDirection: 'row', alignItems: 'center', gap: 8, marginTop: 10},
  userContainer: {flexDirection: 'row', alignItems: 'center', gap: 8, marginTop: 10, width: width, paddingHorizontal: 20},
  reasonInput: {borderRadius: 8, borderWidth: 1, borderColor: '#8A8A8A', backgroundColor: 'white', height: 100, textAlignVertical: 'top', padding: 16},
  row: {flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 20},
  count: {fontSize: 16, fontFamily: 'Pretendard-Medium', color: '#434648'},
  indicatorContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 8,
    marginTop: 16,
  },
  indicatorDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#E0E0E0',
  },
  activeIndicatorDot: {
    backgroundColor: '#000000',
  },
  user: {
    backgroundColor: '#F0F0F3',
    flexDirection: 'row',
    alignItems: 'center',
    height: 50,
    width: '100%',
    borderRadius: 8,
    paddingHorizontal: 16,
    justifyContent: 'center',
    gap: 10,
  },
  close: {position: 'absolute', right: 16},
});
