import {StyleSheet, TextInput, View, TextInputProps} from 'react-native';
import Text from './Text';

interface InputProps extends TextInputProps {
  placeholder: string;
  value: string;
  onChangeText: (text: string) => void;
  error?: string;
}

const Input = ({placeholder, value, onChangeText, error, ...props}: InputProps) => {
  return (
    <View style={styles.container}>
      <TextInput
        placeholder={placeholder}
        value={value}
        onChangeText={onChangeText}
        placeholderTextColor={'#434648'}
        style={[styles.input, {paddingBottom: error ? 8 : 14}]}
        {...props}
      />
      {error && <Text style={styles.error}>{error}</Text>}
    </View>
  );
};

export default Input;

const styles = StyleSheet.create({
  container: {
    borderRadius: 4,
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: '#8A8A8A',
    width: '100%',
    justifyContent: 'center',
    paddingHorizontal: 16,
  },
  input: {
    fontSize: 14,
    fontFamily: 'Pretendard-Regular',
    color: 'black',
    width: '100%',
    paddingVertical: 14,
  },
  error: {
    color: '#FF5F5F',
    fontSize: 11,
    fontFamily: 'Pretendard-Medium',
    paddingBottom: 14,
  },
});
