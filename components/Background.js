import { StyleSheet, Text, View, ImageBackground, SafeAreaView } from "react-native";
import { images } from "../constants";
import React from "react";

const Background = ({ children }) => {
  return (
    <View>
      <ImageBackground
        source={images.loginBackground}
        style={{
          height: "100%",
        }}
      >
        <View>{children}</View>
      </ImageBackground>
    </View>
  );
};

export default Background;

const styles = StyleSheet.create({});
