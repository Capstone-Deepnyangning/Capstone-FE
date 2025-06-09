import React from "react";
import {TouchableOpacity as DefTouchableOpacity, TouchableOpacityProps} from "react-native";

interface GlobalOpacityWrapperProps extends TouchableOpacityProps {
  children: React.ReactNode;
}

const Tocuhable: React.FC<GlobalOpacityWrapperProps> = ({children, ...props}) => {
  const defaultOpacity = 0.8;

  return (
    <DefTouchableOpacity activeOpacity={defaultOpacity} {...props}>
      {children}
    </DefTouchableOpacity>
  );
};

export default Tocuhable;
