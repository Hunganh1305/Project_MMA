import React, { useCallback, useEffect, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ImageBackground,
  StatusBar,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { images, COLORS, SIZES, FONTS } from "../constants";
import CustomButton from "../components/CustomButton";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFocusEffect } from "@react-navigation/native";

const Starter = ({ navigation }) => {
  useFocusEffect(
    useCallback(() => {
      (async () => {
        try {
          const user = await AsyncStorage.getItem("user");
          if (user !== null) {
            navigation.navigate("Home");
            return;
          }
        } catch (error) {
          console.log(error);
        }
      })();
    }, [])
  );

  function renderHeader() {
    return (
      <View style={{ height: SIZES.height > 700 ? "65%" : "60%" }}>
        <ImageBackground
          source={images.loginBackground}
          style={{
            flex: 1,
            justifyContent: "flex-end",
          }}
          resizeMode="cover"
        >
          <LinearGradient
            start={{ x: 0, y: 0 }}
            end={{ x: 0, y: 1 }}
            colors={[COLORS.transparent, COLORS.black]}
            style={{
              height: 200,
              justifyContent: "flex-end",
              paddingHorizontal: SIZES.padding,
            }}
          >
            <Text
              style={{
                width: "80%",
                color: COLORS.white,
                ...FONTS.largeTitle,
                lineHeight: 45,
                fontWeight: 600,
              }}
            >
              Cooking a Delicious Food Easily
            </Text>
          </LinearGradient>
        </ImageBackground>
      </View>
    );
  }

  function renderDetail() {
    return (
      <View
        style={{
          flex: 1,
          paddingHorizontal: SIZES.padding,
        }}
      >
        {/* Description */}
        <Text
          style={{
            marginTop: SIZES.radius,
            width: "70%",
            color: COLORS.gray,
            ...FONTS.body3,
          }}
        >
          Discover more than 1200 food recipes in your hands and cooking it
          easily
        </Text>
        {/* Button */}
        <View style={{ flex: 1, justifyContent: "center" }}>
          {/* Login */}
          <CustomButton
            buttonText="Login"
            buttonContainerStyle={{
              paddingVertical: 18,
              borderRadius: 20,
            }}
            colors={[COLORS.darkGreen, COLORS.lime]}
            onPress={() => navigation.navigate("Login")}
          />
          {/* Sign up */}
          <CustomButton
            buttonText="Sign up"
            buttonContainerStyle={{
              marginTop: SIZES.radius,
              paddingVertical: 18,
              borderRadius: 20,
              borderColor: COLORS.darkLime,
              borderWidth: 1,
            }}
            colors={[]}
            onPress={() => navigation.navigate("Signup")}
          />
        </View>
      </View>
    );
  }
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: COLORS.black,
      }}
    >
      <StatusBar barStyle="light-content" />
      {/* Header */}
      {renderHeader()}
      {/* Detail */}
      {renderDetail()}
    </View>
  );
};

export default Starter;
