// src/component/LoadingIndicator.tsx
import React, {useEffect, useRef} from 'react';
import {Animated, Easing, View, StyleSheet} from 'react-native';
import Svg, {Circle, Defs, LinearGradient, Stop} from 'react-native-svg';

const SIZE = 80;
const STROKE_WIDTH = 10;
const RADIUS = (SIZE - STROKE_WIDTH) / 2;
const CIRCUMFERENCE = 2 * Math.PI * RADIUS;

const LoadingIndicator = () => {
  const rotateAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.loop(
      Animated.timing(rotateAnim, {
        toValue: 1,
        duration: 600,
        easing: Easing.linear,
        useNativeDriver: true,
      }),
      {
        iterations: -1,
        resetBeforeIteration: false,
      },
    ).start();
  }, [rotateAnim]);

  const rotate = rotateAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  return (
    <View style={styles.container}>
      <Animated.View style={{transform: [{rotate}]}}>
        <Svg width={SIZE} height={SIZE}>
          <Defs>
            <LinearGradient id="grad" x1="0" y1="0" x2="1" y2="0">
              <Stop offset="0" stopColor="#4169E1" stopOpacity="1" />
              <Stop offset="1" stopColor="#4169E1" stopOpacity="0" />
            </LinearGradient>
          </Defs>
          <Circle
            cx={SIZE / 2}
            cy={SIZE / 2}
            r={RADIUS}
            stroke="url(#grad)"
            strokeWidth={STROKE_WIDTH}
            strokeDasharray={`${CIRCUMFERENCE * 0.75}, ${CIRCUMFERENCE}`}
            strokeLinecap="round"
            fill="none"
          />
        </Svg>
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default LoadingIndicator;
