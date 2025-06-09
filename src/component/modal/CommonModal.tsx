import {useModalStore} from '@/store/useModalStore';
import React from 'react';
import {Modal, StyleSheet, Text, View, Pressable} from 'react-native';

const CommonModal = () => {
  const {modal, openModal, closeModal} = useModalStore();
  return (
    <Modal animationType="fade" transparent={true} visible={modal.isOpen} onRequestClose={closeModal}>
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <Text style={styles.title}>{modal.title}</Text>
          <Text style={styles.description}>{modal.message}</Text>
          <Pressable
            style={styles.button}
            onPress={() => {
              closeModal();
              modal.onConfirm();
            }}>
            <Text style={styles.buttonText}>{modal.confirmText || '확인'}</Text>
          </Pressable>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalView: {
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 20,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    width: '80%',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
    color: 'black',
  },
  description: {
    fontSize: 16,
    marginBottom: 20,
    textAlign: 'center',
    color: 'black',
    lineHeight: 22,
  },
  button: {
    backgroundColor: '#4A67FF',
    borderRadius: 10,
    padding: 15,
    width: '100%',
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: 16,
  },
});

export default CommonModal;
