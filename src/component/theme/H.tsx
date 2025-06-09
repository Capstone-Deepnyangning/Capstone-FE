import { DimensionValue, View } from "react-native";
import React from "react";

interface HProps {
  h?: DimensionValue | undefined;
  flex?: boolean;
}

const H = ({ h, flex }: HProps) => {
  return <View style={{ height: h, flex: flex ? 1 : undefined }} />;
};

export default H;
