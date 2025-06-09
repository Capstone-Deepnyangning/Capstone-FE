import {Pressable, StyleSheet, TextInput, TextInputProps, View} from 'react-native';
import React from 'react';
import {Filter, Search} from '@/assets/svgs';
import {ios} from '@/utils/platform';

const SearchInput = ({onPressFilter, disabled, filter = true, ...props}: TextInputProps & {onPressFilter: () => void; disabled: boolean; filter?: boolean}) => {
  return (
    <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', gap: 8}}>
      <View style={[styles.container, disabled && {opacity: 0.5}]}>
        <TextInput style={styles.input} placeholder="학번 검색" placeholderTextColor={'#999999'} {...props} editable={!disabled} />
        <Search />
      </View>
      {filter && (
        <Pressable
          style={[{width: 32, height: 32, borderRadius: 8, borderWidth: 1, borderColor: '#CFD2D3', justifyContent: 'center', alignItems: 'center'}]}
          onPress={onPressFilter}>
          <Filter />
        </Pressable>
      )}
    </View>
  );
};

export default SearchInput;

const styles = StyleSheet.create({
  container: {flex: 1, backgroundColor: '#F0F0F3', paddingHorizontal: 16, paddingVertical: ios ? 12 : 0, borderRadius: 8, flexDirection: 'row', alignItems: 'center'},
  input: {
    flex: 1,
  },
});
