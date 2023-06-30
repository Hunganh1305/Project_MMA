import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import React from "react";

export default function Button({ bgColor, btnLabel, textColor, Press }) {
  return (
    <TouchableOpacity
      onPress={Press}
      style={{
        backgroundColor: bgColor,
        borderRadius: 100,
        alignItems: "center",
        width: "76%",
        height: "4%",
        justifyContent: "center",
        marginVertical: 10,
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
