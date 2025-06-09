import {Pressable, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {ArrowBottomBlue} from '@/assets/svgs';
import {colors} from '@/theme/color';

interface SelectionProps {
  label: string;
  onPress: () => void;
  placeholder?: string;
  editable?: boolean;
}

const Selection = ({label, onPress, placeholder, editable = true}: SelectionProps) => {
  return (
    <Pressable style={styles.selection} onPress={onPress} disabled={!editable}>
      <Text style={{color: label ? '#2D2D2D' : '#8A8A8A', fontSize: 16, fontFamily: 'Pretendard-Regular'}}>{label || placeholder}</Text>
      {editable && <ArrowBottomBlue />}
    </Pressable>
  );
};

export default Selection;

const styles = StyleSheet.create({
  selection: {
    borderWidth: 1,
    borderColor: colors.primary,
    borderRadius: 8,
    padding: 10,
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: 48,
  },
});
