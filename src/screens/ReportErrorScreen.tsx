import {StyleSheet, View} from 'react-native';
import React from 'react';
import {CatError, CatSad} from '@/assets/svgs';
import Button from '@/component/button/Button';
import {reportFaceError} from '@/services/reports';
import {H, Text} from '@/component/theme';
import {useModalStore} from '@/store/useModalStore';
import {useNavigation} from '@react-navigation/native';

const ReportErrorScreen = () => {
  const {openModal} = useModalStore();
  const navigation = useNavigation();

  const onPress = async () => {
    const {result, success, message} = await reportFaceError();
    console.log(message);
    if (success) {
      openModal({
        title: '신고 완료',
        message: message,
        onConfirm: () => {
          navigation.goBack();
        },
      });
    }
  };
  return (
    <View style={styles.container}>
      <H h={30} />
      <Text style={styles.title} center>
        {'출입 과정에서\n안면인식이 반복적으로\n실패하셨나요?'}
      </Text>
      <H h={8} />
      <CatError />
      <H h={8} />
      <Text style={styles.desc} center>
        {'신고하시면 관리자가 확인하고\n도움을 드립니다.'}
      </Text>
      <H h={50} />
      <Button label="신고" onPress={onPress} />
    </View>
  );
};

export default ReportErrorScreen;

const styles = StyleSheet.create({
  container: {padding: 35, alignItems: 'center', backgroundColor: 'white', flex: 1},
  title: {fontFamily: 'Pretendard-Bold', fontSize: 28, color: 'black'},
  desc: {fontFamily: 'Pretendard-Medium', fontSize: 16, color: 'black'},
});
