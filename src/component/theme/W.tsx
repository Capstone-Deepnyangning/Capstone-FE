import {View} from "react-native";
import React from "react";

interface WProps {
  w?: number;
  flex?: boolean;
}

const W = ({w, flex}: WProps) => {
  return <View style={{width: w, flex: flex ? 1 : undefined}} />;
};

export default W;
