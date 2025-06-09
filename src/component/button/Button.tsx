import {colors} from '@/theme/color';
import {Pressable, PressableProps, StyleSheet, View} from 'react-native';
import {Text} from '../theme';

interface ButtonProps extends PressableProps {
  label: string;
  onPress: () => void;
  width?: number;
  type?: 'primary' | 'white';
  flex?: number;
}

const Button = ({label, onPress, width, type = 'primary', flex, ...otherProps}: ButtonProps) => {
  return (
    <Pressable
      onPress={onPress}
      {...otherProps}
      style={[
        styles.container,
        {
          backgroundColor: otherProps.disabled ? '#9EBAF1' : type === 'white' ? 'white' : colors.primary,
          width: width || '100%',
          flex: flex,
          borderColor: type === 'white' ? '#CFD2D3' : colors.primary,
          borderWidth: otherProps.disabled ? 0 : 1,
        },
      ]}>
      <Text style={[styles.label, {color: type === 'white' ? 'black' : 'white'}]}>{label}</Text>
    </Pressable>
  );
};
export default Button;

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.primary,
    padding: 16,
    borderRadius: 8,
    width: '100%',
    flex: 1,
  },
  label: {
    color: 'white',
    fontSize: 14,
    fontWeight: '500',
    fontFamily: 'Pretendard-Regular',
    alignSelf: 'center',
  },
});
