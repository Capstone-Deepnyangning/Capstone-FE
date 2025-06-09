import React, {ReactNode} from 'react';
import {Text as DefText, TextStyle, TextProps as DefTextProps} from 'react-native';

interface TextProps extends DefTextProps {
  children: ReactNode;

  style?: TextStyle | TextStyle[] | any;
  center?: boolean;
  color?: string;
  shadow?: boolean;
}

const Text: React.FC<TextProps> = ({children, style, center, color, shadow, ...otherProps}) => {
  // 기본 스타일 설정
  const defaultStyles: TextStyle = {
    fontFamily: 'Pretendard-Regular',
    textAlign: center ? 'center' : 'auto',
    includeFontPadding: false,
    color: color || 'black',
    allowFontScaling: false,
  };

  // 스타일을 병합하는 유틸리티 함수
  const mergeStyles = (additionalStyles: TextStyle | TextStyle[] | any) => {
    const combinedStyle = Array.isArray(additionalStyles) ? [defaultStyles, ...additionalStyles] : [defaultStyles, additionalStyles];

    return combinedStyle;
  };

  return (
    <DefText {...otherProps} style={mergeStyles(style)} allowFontScaling={false}>
      {children}
    </DefText>
  );
};

export default Text;
