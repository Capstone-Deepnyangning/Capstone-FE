import {StyleSheet, Text, View, Modal, Pressable, TouchableOpacity} from 'react-native';
import React from 'react';
import {height, width} from '@/utils/dimensions';
import {colors} from '@/theme/color';

interface AuthMethodModalProps {
  isVisible: boolean;
  onClose: () => void;
  onSelect: (authMethod: 'FACE' | 'QR') => void;
}

const AuthMethodModal = ({isVisible, onClose, onSelect}: AuthMethodModalProps) => {
  return (
    <Modal visible={isVisible} transparent animationType="fade" onRequestClose={onClose}>
      <Pressable style={styles.overlay} onPress={onClose} />
      <View style={styles.modalContainer}>
        <TouchableOpacity
          style={styles.option}
          onPress={() => {
            onSelect('FACE');
            onClose();
          }}>
          <Text style={styles.optionText}>얼굴</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.option, styles.lastOption]}
          onPress={() => {
            onSelect('QR');
            onClose();
          }}>
          <Text style={styles.optionText}>QR</Text>
        </TouchableOpacity>
      </View>
    </Modal>
  );
};

export default AuthMethodModal;

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
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 20,
    width: width / 1.2,
    alignItems: 'center',
    alignSelf: 'center',
    position: 'absolute',
    top: '40%',
  },
  option: {
    width: '100%',
    paddingVertical: 16,
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: colors.gray100,
  },
  lastOption: {
    borderBottomWidth: 0,
  },
  optionText: {
    fontSize: 16,
    color: colors.font02black,
  },
});
