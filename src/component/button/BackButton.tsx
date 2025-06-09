import {Pressable, StyleSheet, Text, View} from 'react-native';
import {Back} from '@/assets/svgs';
import {useNavigation} from '@react-navigation/native';

const BackButton = () => {
  const navigation = useNavigation<any>();

  const onPress = () => {
    navigation.goBack();
  };

  return (
    <Pressable onPress={onPress} hitSlop={{top: 20, bottom: 20, left: 20, right: 20}}>
      <Back />
    </Pressable>
  );
};
export default BackButton;

const styles = StyleSheet.create({});
