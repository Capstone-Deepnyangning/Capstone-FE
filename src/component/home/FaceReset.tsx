import {Pressable, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {useNavigation} from '@react-navigation/native';
const FaceReset = () => {
  const navigation = useNavigation();
  return (
    <Pressable style={styles.container} onPress={() => navigation.navigate('Camera' as never)}>
      <Text style={styles.title}>얼굴 재학습하기</Text>
    </Pressable>
  );
};

export default FaceReset;

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    paddingHorizontal: 24,
    paddingVertical: 18,
    borderRadius: 16,
  },
  title: {
    fontSize: 16,
    fontFamily: 'Pretendard-Bold',
    color: '#000614',
  },
});
