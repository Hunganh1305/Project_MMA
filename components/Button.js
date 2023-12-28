import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import React from "react";

export default function Button({
  bgColor,
  btnLabel,
  textColor,
  onPress = () => {},
  ...others
}) {
  return (
    <TouchableOpacity
      activeOpacity={0.5}
      onPress={onPress}
      style={{
        backgroundColor: bgColor,
        borderRadius: 100,
        alignItems: "center",
        width: "76%",
        height: "4%",
        justifyContent: "center",
        marginVertical: 20,
        others,
      }}
    >
      <Text
        style={{
          color: textColor,
          fontSize: 22,
          fontWeight: "bold",
        }}
      >
        {btnLabel}
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({});
