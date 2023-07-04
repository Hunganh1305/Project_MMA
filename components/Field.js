import { StyleSheet, Text, View, TextInput } from "react-native";
import React, { useState } from "react";
import { COLORS } from "../constants";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

const Field = ({
  label,
  iconName,
  error,
  password,
  onFocus = () => {},
  ...props
}) => {
  const [isFocused, setIsFocused] = useState(false);
  const [hidePassword, setHidePassword] = useState(password);
  return (
    <View style={{ marginBottom: 10 }}>
      <Text style={styles.label}>{label}</Text>
      <View
        style={[
          styles.inputContainer,
          {
            borderColor: error
              ? "red"
              : isFocused
              ? COLORS.darkGreen
              : COLORS.black,
          },
        ]}
      >
        <Icon
          name={iconName}
          style={{ fontSize: 22, color: COLORS.darkGreen, marginRight: 10 }}
        ></Icon>
        <TextInput
          secureTextEntry={hidePassword}
          {...props}
          style={{ color: COLORS.darkGreen, flex: 1 }}
          autoCorrect={false}
          onFocus={() => {
            onFocus();
            setIsFocused(true);
          }}
          onBlur={() => {
            setIsFocused(false);
          }}
        ></TextInput>
        {password && (
          <Icon
            onPress={() => {
              setHidePassword(!hidePassword);
            }}
            name={hidePassword ? "eye-outline" : "eye-off-outline"}
            style={{ color: COLORS.darkGreen, fontSize: 22 }}
          ></Icon>
        )}
      </View>
      {error && (
        <Text style={{ color: "red", fontSize: 12, marginTop: 5 }}>
          {error}
        </Text>
      )}
    </View>

    // <TextInput
    //   {...props}
    //   style={{
    //     borderRadius: 100,
    //     color: COLORS.darkGreen,
    //     paddingHorizontal: 10,
    //     width: "76%",
    //     height: "5%",
    //     backgroundColor: COLORS.lightGray,
    //     marginVertical: 9,
    //   }}
    //   placeholderTextColor={COLORS.darkGreen}
    // ></TextInput>
  );
};

export default Field;

const styles = StyleSheet.create({
  label: {
    marginVertical: 3,
    fontSize: 14,
    color: COLORS.gray,
  },
  inputContainer: {
    height: 40,
    width: 320,
    backgroundColor: COLORS.white,
    flexDirection: "row",
    paddingHorizontal: 15,
    borderWidth: 0.7,
    alignItems: "center",
  },
});
