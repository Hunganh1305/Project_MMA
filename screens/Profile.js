import React, { useState, useCallback } from "react";
import {
  View,
  StyleSheet,
  Text,
  SafeAreaView,
  Image,
  TouchableOpacity,
} from "react-native";
import { useFocusEffect } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { COLORS, SIZES, FONTS } from "../constants";

const Profile = ({ navigation }) => {
  const [user, setUser] = useState(null);

  useFocusEffect(
    useCallback(() => {
      (async () => {
        try {
          const user = await AsyncStorage.getItem("user");
          if (user === null) {
            navigation.navigate("Login");
            return;
          }
          setUser(JSON.parse(user));
        } catch (error) {
          console.log(error);
        }
      })();
    }, [])
  );

  return (
    <SafeAreaView>
      <View>
        <Text
          style={{
            color: COLORS.darkGreen,
            fontWeight: "bold",
            ...FONTS.h1,
            textAlign: "center",
            marginTop: 20,
          }}
        >
          Profile
        </Text>
      </View>
      <View
        style={{
          alignItems: "center",
          padding: 10,
          marginTop: 10,
          borderRadius: SIZES.radius,
          backgroundColor: COLORS.gray2,
          marginHorizontal: SIZES.padding,
        }}
      >
        {user &&
          (user.img ? (
            <Image
              resizeMode="cover"
              source={{ uri: user?.img }}
              style={{ width: 200, height: 200, borderRadius: SIZES.radius }}
            ></Image>
          ) : (
            <Image
              resizeMode="cover"
              source={{
                uri: "https://assets.stickpng.com/images/585e4bf3cb11b227491c339a.png",
              }}
              style={{ width: 200, height: 200, borderRadius: SIZES.radius }}
            ></Image>
          ))}
        <Text
          style={{
            fontWeight: "bold",
            ...FONTS.h2,
            paddingTop: 15,
          }}
        >
          {user?.username}
        </Text>
        <Text
          style={{
            color: COLORS.gray,
            fontWeight: "bold",
            ...FONTS.h4,
          }}
        >
          Email: {user?.email}
        </Text>
        <Text
          style={{
            color: COLORS.gray,
            fontWeight: "bold",
            ...FONTS.h4,
          }}
        >
          Phone: {user?.phone}
        </Text>
        <Text
          style={{
            color: COLORS.gray,
            fontWeight: "bold",
            ...FONTS.h4,
          }}
        >
          Address: {user?.address}
        </Text>
      </View>
      <TouchableOpacity
        style={{
          marginTop: 20,
          marginLeft: "35%",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: COLORS.darkGreen,
          height: 45,
          width: 120,
          borderRadius: 100,
        }}
        onPress={() => {
          navigation.navigate("EditProfile", { user: user });
        }}
      >
        <Text
          style={{
            color: COLORS.white,
            fontSize: 18,
          }}
        >
          Edit
        </Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({});

export default Profile;
