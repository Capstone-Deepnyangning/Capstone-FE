import {
  StyleSheet,
  View,
  Keyboard,
  TouchableWithoutFeedback,
  ScrollView,
} from 'react-native';
import React, {forwardRef, ReactNode} from 'react';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {H} from '.';

interface ContainerProps {
  center?: boolean;
  avoidKeyboard?: boolean;
  children: ReactNode;
  top?: boolean;
  scroll?: boolean;
  p?: boolean;
  bottom?: boolean;
}

const Container = forwardRef(
  (
    {
      center,
      avoidKeyboard,
      children,
      top,
      scroll,
      p,
      bottom,
      ...otherProps
    }: ContainerProps,
    ref?: any,
  ) => {
    const {top: _top, bottom: _bottom} = useSafeAreaInsets();

    const containerStyle = [
      styles.container,
      {
        paddingTop: top ? _top : 0,
        padding: p ? 16 : 0,
      },
    ];

    const renderContent = scroll ? (
      <ScrollView
        style={containerStyle}
        contentContainerStyle={center && styles.centered}
        showsVerticalScrollIndicator={false}
        ref={ref}
        {...otherProps}>
        {children}
        <H h={_bottom} />
      </ScrollView>
    ) : (
      <View style={containerStyle}>
        {children}
        {bottom && <H h={_bottom} />}
      </View>
    );

    if (avoidKeyboard) {
      return (
        <TouchableWithoutFeedback
          onPress={() => Keyboard.dismiss()}
          style={{flex: 1}}>
          {renderContent}
        </TouchableWithoutFeedback>
      );
    }

    return renderContent;
  },
);

export default Container;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  centered: {
    alignItems: 'center',
  },
});
