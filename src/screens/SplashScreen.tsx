import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import Logo from '@/component/theme/Logo';
import useAutoLogin from '@/hooks/useAutoLogin';

const SplashScreen = () => {
  useAutoLogin();

  return (
    <View style={styles.container}>
      <Logo />
    </View>
  );
};

export default SplashScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  },
});
