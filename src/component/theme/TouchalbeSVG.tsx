import {ViewStyle} from "react-native";
import React from "react";
import Touchable from "./Touchable";

// Define the type for props
type TouchableSVGProps = {
  style?: ViewStyle;
  SVG: React.ComponentType<any>; // More specific type for SVG component
  width?: number;
  height?: number;
  size?: number;
  onPress?: () => void;
  disabled?: boolean;
  p?: number;
};

const TouchableSVG: React.FC<TouchableSVGProps> = ({
  style,
  SVG,
  width,
  height,
  size,
  onPress = () => {},
  disabled,
  p = 0, // Default padding to 0
  ...otherProps // Collect the remaining props
}) => {
  // Determine the size to use
  const iconWidth = size || width;
  const iconHeight = size || height;

  return (
    <Touchable {...otherProps} style={style} onPress={onPress} disabled={disabled}>
      <SVG width={iconWidth} height={iconHeight} style={{padding: p}} />
    </Touchable>
  );
};

export default TouchableSVG;
