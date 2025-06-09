import {StyleSheet, View} from 'react-native';
import React from 'react';
import {FaceRegistration} from '@/assets/svgs';
import Button from '@/component/button/Button';
import {H, Text} from '@/component/theme';
import {colors} from '@/theme/color';

const CameraScreen = ({navigation}: {navigation: any}) => {
  const onPress = () => {
    navigation.navigate('Record');
  };

  return (
    <View style={styles.container}>
      <FaceRegistration style={{alignSelf: 'center'}} />
      <Text style={styles.title}>얼굴 정면 등록 후 고개를 회전하여 등록</Text>
      <Text style={styles.desc}>
        {'얼굴 전체를 등록하려면, 먼저 카메라 정면을 바라보세요.\n그런 다음 안내에 따라 측면의 얼굴이 잘 보이도록 얼굴을 회전하여 스캔을 진행합니다.'}
      </Text>
      <H h={130} />
      <Button label="등록하기" onPress={onPress} />
    </View>
  );
};

export default CameraScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    padding: 35,
  },
  title: {
    fontSize: 17,
    fontFamily: 'Pretendard-Bold',
    marginTop: 40,
    textAlign: 'left',
    color: colors.font02black,
  },
  desc: {
    fontSize: 14,
    marginTop: 12,
    textAlign: 'left',
    fontFamily: 'Pretendard-Medium',
    color: colors.font02black,
  },
});
