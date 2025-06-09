import {StyleSheet, View} from 'react-native';
import React from 'react';

interface ShadowCardProps {
  children: React.ReactNode;
}

const ShadowCard = ({children}: ShadowCardProps) => {
  return (
    <View style={{marginBottom: 20}}>
      <View style={styles.container}>{children}</View>
      <View style={[styles.underCard, {backgroundColor: '#ACB2B5'}]} />
      <View style={[styles.underCard, {backgroundColor: '#CFD2D3', bottom: -20, zIndex: -2, width: '96%'}]} />
    </View>
  );
};

export default ShadowCard;

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    paddingHorizontal: 24,
    paddingVertical: 18,
    borderRadius: 16,
    height: 229,
  },
  title: {
    fontSize: 16,
    fontFamily: 'Pretendard-Bold',
    color: '#000614',
  },
  underCard: {
    height: 50,
    borderRadius: 16,
    zIndex: -1,
    position: 'absolute',
    bottom: -10,
    width: '98%',
    alignSelf: 'center',
  },
});
