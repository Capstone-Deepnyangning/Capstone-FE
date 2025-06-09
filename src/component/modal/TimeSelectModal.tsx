import {StyleSheet, Text, View, Modal, TouchableOpacity, ScrollView, Pressable, ModalProps} from 'react-native';
import React from 'react';
import {W} from '../theme';
import {height, width} from '@/utils/dimensions';
import moment from 'moment';

interface TimeRange {
  startTime: string;
  endTime: string;
}

interface TimeSelectModalProps extends ModalProps {
  times: string[];
  endTimes: string[];
  selectedTimes: TimeRange;
  onSelect: (range: TimeRange) => void;
  onClose: () => void;
}

const TimeSelectModal = ({visible, onClose, selectedTimes, onSelect, times, endTimes}: TimeSelectModalProps) => {
  const startHour = selectedTimes.startTime || '';
  const endHour = selectedTimes.endTime || '';

  return (
    <Modal visible={visible} transparent animationType="fade" onRequestClose={onClose}>
      <Pressable style={styles.overlay} onPress={onClose} />
      <View style={styles.modalContainer}>
        <View style={styles.pickerRow}>
          {/* 시작 시간 */}
          <ScrollView style={styles.picker}>
            {times.map((hour) => {
              return (
                <TouchableOpacity
                  key={hour}
                  style={styles.item}
                  onPress={() =>
                    onSelect({
                      ...selectedTimes,
                      startTime: hour,
                      endTime: '', // Reset end time when start time changes
                    })
                  }>
                  <View style={styles.check} />

                  <Text style={startHour === hour ? styles.selectedText : styles.text}>{moment(hour, 'HH:mm').format('HH:mm A')}</Text>
                </TouchableOpacity>
              );
            })}
          </ScrollView>
          <W w={8} />
          {/* 종료 시간 */}
          <ScrollView style={styles.picker}>
            {endTimes.map((hour) => {
              return (
                <TouchableOpacity
                  key={hour}
                  style={styles.item}
                  onPress={() =>
                    onSelect({
                      ...selectedTimes,
                      endTime: hour,
                    })
                  }>
                  <View style={styles.check} />

                  <Text style={endHour === hour ? styles.selectedText : styles.text}>{moment(hour, 'HH:mm').format('HH:mm A')}</Text>
                </TouchableOpacity>
              );
            })}
          </ScrollView>
        </View>
      </View>
    </Modal>
  );
};

export default TimeSelectModal;

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.3)',
    justifyContent: 'center',
    alignItems: 'center',
    height: height,
    width: width,
    zIndex: -1,
    position: 'absolute',
    top: 0,
  },
  modalContainer: {
    borderRadius: 12,
    padding: 20,
    width: width / 1.2,
    alignItems: 'center',
    alignSelf: 'center',
    position: 'absolute',
    top: '40%',
  },
  pickerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  picker: {
    width: 80,
    height: 180,
    marginHorizontal: 8,
    backgroundColor: '#fff',
    borderRadius: 8,
    elevation: 2,
  },
  item: {
    flexDirection: 'row',
    padding: 12,
    alignItems: 'center',
    alignSelf: 'center',
  },
  selectedItem: {
    padding: 12,
    alignItems: 'center',
    backgroundColor: '#f0f4ff',
    borderRadius: 8,
  },
  text: {
    fontSize: 16,
    color: '#222',
  },
  selectedText: {
    fontSize: 16,
    color: '#3366ff',
    fontWeight: 'bold',
  },
  confirmBtn: {
    marginTop: 16,
    backgroundColor: '#3366ff',
    borderRadius: 8,
    paddingVertical: 10,
    paddingHorizontal: 40,
  },
  confirmText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  check: {
    width: 24,
    height: 24,
    marginRight: 8,
    position: 'absolute',
    left: -20,
  },
  disabled: {
    opacity: 0.2,
  },
});
