import { StyleSheet, Text, View, TextInput } from "react-native";
import React from "react";
import { COLORS } from "../constants";

const Field = (props) => {
  return (
    <TextInput
      {...props}
      style={{
        borderRadius: 100,
        color: COLORS.darkGreen,
        paddingHorizontal: 10,
        width: "76%",
        height: "6%",
        backgroundColor: COLORS.lightGray,
        marginVertical: 10,
      }}
      placeholderTextColor={COLORS.darkGreen}
    ></TextInput>
  );
};

export default Field;

const styles = StyleSheet.create({});
