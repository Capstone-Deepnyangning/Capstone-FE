import {Pressable, StyleSheet, Switch, Text} from 'react-native';
import React from 'react';
import {colors} from '@/theme/color';

interface ListItemProps {
  label: string;
  color?: string;
  onPress: () => void;
  switch?: boolean;
  onPressSwitch?: () => void;
  switchValue?: boolean;
}

const ListItem = ({label, color, onPress, switch: switchEnabled, onPressSwitch, switchValue}: ListItemProps) => {
  return (
    <Pressable style={styles.container} onPress={onPress}>
      <Text style={[styles.label, {color: color || 'black'}]}>{label}</Text>
      {switchEnabled && (
        <Switch value={switchValue} onValueChange={onPressSwitch} style={styles.switch} trackColor={{true: colors.primary, false: '#F0F0F3'}} thumbColor={'#FFFFFF'} />
      )}
    </Pressable>
  );
};

export default ListItem;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',

    paddingHorizontal: 20,
    gap: 4,
    backgroundColor: 'white',
    height: 40,
  },
  label: {
    fontSize: 13,
    fontFamily: 'Pretendard-Medium',
    color: '#000614',
  },
  switch: {
    marginLeft: 'auto',
    transform: [{scaleX: 0.7}, {scaleY: 0.7}],
  },
});
