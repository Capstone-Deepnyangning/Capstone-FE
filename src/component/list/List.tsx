import {FlatList, StyleSheet, View} from 'react-native';
import React from 'react';
import ListItem from './ListItem';
import Divider from '../theme/Divider';

interface ListProps {
  list: {
    label: string;
    icon?: React.ReactNode;
    onPress: () => void;
    switch?: boolean;
    onPressSwitch?: () => void;
    switchValue?: boolean;
  }[];
}

const List = ({list}: ListProps) => {
  return (
    <View>
      <FlatList
        data={list}
        renderItem={({item}) => (
          <ListItem label={item.label} color={item.color} onPress={item.onPress} switch={item.switch} onPressSwitch={item.onPressSwitch} switchValue={item.switchValue} />
        )}
        ItemSeparatorComponent={() => <Divider height={1} />}
        scrollEnabled={false}
      />
    </View>
  );
};

export default List;
