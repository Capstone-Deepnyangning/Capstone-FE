import {StyleSheet, View} from 'react-native';

interface DividerProps {
  height: number;
  color?: string;
}

const Divider = ({height, color}: DividerProps) => {
  return <View style={[styles.container, {height, backgroundColor: color || '#F0F0F3'}]} />;
};
export default Divider;
const styles = StyleSheet.create({
  container: {
    backgroundColor: '#F0F0F3',
  },
});
