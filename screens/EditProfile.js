import React, { useState } from "react";
import {
  View,
  StyleSheet,
  Text,
  SafeAreaView,
  Image,
  TouchableOpacity,
  TextInput,
} from "react-native";
import { COLORS, SIZES, FONTS, icons } from "../constants";
import Toast from "react-native-toast-message";

const EditProfile = ({ navigation, route }) => {
  let { user } = route.params;
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");

  const showErrorToast = (error1) => {
    Toast.show({
      type: "error",
      text1: error1,
      visibilityTime: 3000,
    });
  };

  const showSuccessToast = () => {
    Toast.show({
      type: "success",
      text1: "Successfully edited !",
      visibilityTime: 3000,
    });
  };

  function uploadImg() {
    console.log("upload img");
  }

  function handleSave() {
    const data = {
      username: name ? name : user?.username,
      email: email ? email : user?.email,
      phone: phone ? phone : user?.phone,
      address: address ? address : user?.address,
    };

    if (
      data.username === "" ||
      data.email === "" ||
      data.phone === "" ||
      data.address === ""
    ) {
      showErrorToast("Please fill all the field !");
      return;
    }

    fetch(`https://recipeapp-6vxr.onrender.com/user/${user?._id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .then((response) => {
        console.log(response);
        showSuccessToast();
      })
      .catch((err) => console.log(err));
  }

  return (
    <SafeAreaView>
      <TouchableOpacity
        style={{
          alignItems: "center",
          justifyContent: "center",
          height: 35,
          width: 35,
          borderRadius: 18,
          borderWidth: 1,
          borderColor: COLORS.lightGray,
          backgroundColor: COLORS.black,
          marginLeft: 20,
          marginVertical: 20,
        }}
        onPress={() => {
          navigation.goBack();
        }}
      >
        <Image
          source={icons.back}
          style={{
            width: 15,
            height: 15,
            tintColor: COLORS.white,
          }}
        />
      </TouchableOpacity>
      <View>
        <Text
          style={{
            color: COLORS.darkGreen,
            fontWeight: "bold",
            ...FONTS.h1,
            textAlign: "center",
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
        <TouchableOpacity
          onPress={() => {
            uploadImg();
          }}
        >
          <Image
            source={icons.camera}
            style={{
              width: 40,
              height: 40,
              borderRadius: 100,
              backgroundColor: COLORS.lightGray3,
              top: -30,
              right: -50,
            }}
          />
        </TouchableOpacity>

        <View
          style={{
            marginTop: 10,
            flexDirection: "row",
          }}
        >
          <Text
            style={{
              fontWeight: "bold",
              ...FONTS.h3,
            }}
          >
            Name:
          </Text>
          <TextInput
            onChangeText={(data) => {
              setName(data);
            }}
            style={{
              width: "60%",
              height: 30,
              borderRadius: 100,
              paddingHorizontal: 10,
              marginLeft: 20,
              backgroundColor: COLORS.lightGray,
              color: COLORS.black,
              fontSize: 16,
            }}
            defaultValue={user?.username}
          />
        </View>

        <View
          style={{
            marginTop: 10,
            flexDirection: "row",
          }}
        >
          <Text
            style={{
              fontWeight: "bold",
              ...FONTS.h3,
            }}
          >
            Email:
          </Text>
          <TextInput
            onChangeText={(data) => {
              setEmail(data);
            }}
            style={{
              width: "60%",
              height: 30,
              borderRadius: 100,
              paddingHorizontal: 10,
              marginLeft: 20,
              backgroundColor: COLORS.lightGray,
              color: COLORS.black,
              fontSize: 16,
            }}
            defaultValue={user?.email}
          />
        </View>
        <View
          style={{
            marginTop: 10,
            flexDirection: "row",
          }}
        >
          <Text
            style={{
              fontWeight: "bold",
              ...FONTS.h3,
            }}
          >
            Phone:
          </Text>
          <TextInput
            onChangeText={(data) => {
              setPhone(data);
            }}
            style={{
              width: "60%",
              height: 30,
              borderRadius: 100,
              paddingHorizontal: 10,
              marginLeft: 20,
              backgroundColor: COLORS.lightGray,
              color: COLORS.black,
              fontSize: 16,
            }}
            defaultValue={user?.phone}
          />
        </View>
        <View
          style={{
            marginTop: 10,
            flexDirection: "row",
          }}
        >
          <Text
            style={{
              fontWeight: "bold",
              ...FONTS.h3,
            }}
          >
            Address:
          </Text>
          <TextInput
            onChangeText={(data) => {
              setAddress(data);
            }}
            style={{
              width: "60%",
              height: 30,
              borderRadius: 100,
              paddingHorizontal: 10,
              marginLeft: 20,
              backgroundColor: COLORS.lightGray,
              color: COLORS.black,
              fontSize: 16,
            }}
            defaultValue={user?.address}
          />
        </View>
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
          handleSave();
        }}
      >
        <Text
          style={{
            color: COLORS.white,
            fontSize: 18,
          }}
        >
          Save
        </Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({});

export default EditProfile;
