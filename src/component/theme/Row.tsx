import {StyleSheet, Text, View, ViewStyle} from "react-native";
import React, {ReactNode} from "react";

interface RowProps {
  children: ReactNode;
  style?: ViewStyle;
}

const Row = ({children, style}: RowProps) => {
  return <View style={[styles.row, style]}>{children}</View>;
};

export default Row;

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    alignItems: "center",
  },
});
