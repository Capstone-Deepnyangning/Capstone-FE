import {ArrowRight} from '@/assets/svgs';
import {colors} from '@/theme/color';
import React from 'react';
import {StyleSheet, View, Modal, Pressable} from 'react-native';
import {Calendar, LocaleConfig} from 'react-native-calendars';
import {Text} from '../theme';
import {height, width} from '@/utils/dimensions';

// 한국어 설정
LocaleConfig.locales['kr'] = {
  monthNames: ['1월', '2월', '3월', '4월', '5월', '6월', '7월', '8월', '9월', '10월', '11월', '12월'],
  monthNamesShort: ['1월', '2월', '3월', '4월', '5월', '6월', '7월', '8월', '9월', '10월', '11월', '12월'],
  dayNames: ['일요일', '월요일', '화요일', '수요일', '목요일', '금요일', '토요일'],
  dayNamesShort: ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'],
};
LocaleConfig.defaultLocale = 'kr';

interface CalendarModalProps {
  visible: boolean;
  onClose: () => void;
  selectedDate: string;
  onSelectDates: (date: string) => void;
}

const CalendarModal = ({visible, onClose, selectedDate, onSelectDates}: CalendarModalProps) => {
  const markedDates = {
    [selectedDate]: {
      selected: true,
      color: '#4169E1',
      textColor: 'white',
    },
  };

  const onDayPress = (day: any) => {
    onSelectDates(day.date.dateString);
  };

  const renderDay = (day) => {
    const dateString = day.date.day;
    const isDisabled = day.state === 'disabled';
    const isSelected = day.date.dateString === selectedDate;

    return (
      <Pressable style={{alignItems: 'center', backgroundColor: isSelected ? colors.primary : 'white', borderRadius: 2, padding: 6}} onPress={() => onDayPress(day)}>
        <Text style={{color: isDisabled ? '#B1B1B2' : isSelected ? 'white' : '#252525'}}>{dateString}</Text>
      </Pressable>
    );
  };

  return (
    <Modal visible={visible} transparent animationType="fade">
      <Pressable style={styles.modalContainer} onPress={onClose} />

      <View style={styles.modalContent}>
        <Calendar
          dayComponent={renderDay}
          markedDates={markedDates}
          markingType={'dot'}
          minDate={new Date().toISOString().split('T')[0]}
          enableSwipeMonths={true}
          theme={{
            textMonthFontFamily: 'Pretendard-Regular',
            textSectionTitleColor: '#252525',
            textDayHeaderFontFamily: 'Pretendard-Regular',
            textDayFontFamily: 'Pretendard-Regular',
            textDayHeaderFontSize: 16,
            textMonthFontSize: 18,
            textDayFontSize: 16,
            arrowColor: 'black',
            monthTextColor: 'black',
            dayTextColor: '#252525',
            todayButtonFontFamily: 'Pretendard-Medium',
          }}
          renderArrow={(props) =>
            props === 'left' ? (
              <View style={{transform: [{rotate: '180deg'}]}}>
                <ArrowRight />
              </View>
            ) : (
              <ArrowRight />
            )
          }
        />
      </View>
    </Modal>
  );
};

export default CalendarModal;

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    position: 'absolute',
    top: 0,
    width: width,
    height: height,
    zIndex: -1,
  },
  modalContent: {
    backgroundColor: 'white',
    borderRadius: 4,
    padding: 20,
    width: '90%',
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: [{translateX: -width * 0.45}, {translateY: -200}],
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  closeButton: {
    marginTop: 20,
    padding: 10,
    backgroundColor: '#4169E1',
    borderRadius: 5,
    alignItems: 'center',
  },
  closeButtonText: {
    color: 'white',
    fontSize: 16,
  },
});
