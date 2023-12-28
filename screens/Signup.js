import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  TouchableOpacity,
  TextInput,
  Keyboard,
  Alert,
} from "react-native";
import React, { useState } from "react";
import Background from "../components/Background";
import { COLORS } from "../constants";
import Field from "../components/Field";
import Button from "../components/Button";
import { Dropdown } from "react-native-element-dropdown";
import { ScrollView } from "react-native-gesture-handler";

const Signup = (props) => {
  const [inputs, setInputs] = useState({
    email: "",
    username: "",
    address: "",
    phone: "",
    password: "",
  });
  const dropdown = [
    { id: 1, name: "Recipe maker" },
    { id: 2, name: "Cooker" },
  ];
  const [errors, setErrors] = useState({});
  const validate = () => {
    Keyboard.dismiss();
    let valid = true;
    if (!inputs.email) {
      handleError("Please input email", "email");
      valid = false;
    } else if (!inputs.email.match(/\S+@\S+\.\S+/)) {
      handleError("Please input valid email", "email");
      valid = false;
    }
    if (!inputs.username) {
      handleError("Please input username", "username");
      valid = false;
    }
    if (!inputs.address) {
      handleError("Please input address", "address");
      valid = false;
    }
    if (!inputs.phone) {
      handleError("Please input phone number", "phone");
      valid = false;
    }
    if (!inputs.password) {
      handleError("Please input password", "password");
      valid = false;
    } else if (inputs.password.length < 5) {
      handleError("Min password length of 5", "password");
      valid = false;
    }
    if (valid) {
      console.log("input: " + JSON.stringify(inputs));
      register();
    }
  };
  const register = () => {
    fetch("http://recipeapp-6vxr.onrender.com/auth/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(inputs),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data.success === false) {
          Alert.alert("OOPS !", data.message);
          return;
        }
        Alert.alert("CONGRATES !", "Your account is created !", [
          {
            text: "Next",
            onPress: () => {
              props.navigation.navigate("Login");
            },
          },
        ]);
      });
  };
  const handleOnChange = (text, input) => {
    setInputs((prevState) => ({ ...prevState, [input]: text }));
  };
  const handleError = (errorMessage, input) => {
    setErrors((prevState) => ({ ...prevState, [input]: errorMessage }));
  };
  // console.log(errors);
  const renderItem = (item) => {
    return (
      <View style={{ padding: 10, backgroundColor: "white" }}>
        <Text style={{ fontSize: 14 }}>{item.name}</Text>
      </View>
    );
  };
  // console.log(inputs);
  return (
    <Background>
      <SafeAreaView
        style={{
          alignItems: "center",
        }}
      >
        <Text
          style={{
            color: "white",
            fontSize: 54,
            fontWeight: "bold",
            marginVertical: 8,
          }}
        >
          Register
        </Text>
        <Text
          style={{
            color: "white",
            fontSize: 19,
            fontWeight: "bold",
            marginBottom: 10,
          }}
        >
          Create a new account
        </Text>
        <View
          style={{
            backgroundColor: "white",
            height: "100%",
            width: "100%",
            borderTopLeftRadius: 130,
            paddingTop: 37,
            alignItems: "center",
          }}
        >
          <Field
            iconName="email-outline"
            placeholder="Enter your email address"
            label="Email"
            error={errors.email}
            onFocus={() => {
              handleError(null, "email");
            }}
            onChangeText={(text) => handleOnChange(text, "email")}
          />
          <Field
            iconName="account-outline"
            placeholder="Enter your username"
            label="Username"
            error={errors.username}
            onFocus={() => {
              handleError(null, "username");
            }}
            onChangeText={(text) => handleOnChange(text, "username")}
          />
          <Field
            iconName="home-outline"
            placeholder="Enter your address"
            label="Address"
            error={errors.address}
            onFocus={() => {
              handleError(null, "address");
            }}
            onChangeText={(text) => handleOnChange(text, "address")}
          />
          <Field
            label="Phone"
            placeholder="Enter your phone number"
            keyboardType={"numeric"}
            iconName="phone-outline"
            error={errors.phone}
            onFocus={() => {
              handleError(null, "phone");
            }}
            onChangeText={(text) => handleOnChange(text, "phone")}
          />
          <Field
            iconName="lock-outline"
            placeholder="Enter your password"
            label="Password"
            password
            error={errors.password}
            onFocus={() => {
              handleError(null, "password");
            }}
            onChangeText={(text) => handleOnChange(text, "password")}
          />

          {/* Text and Button */}
          <View
            style={{
              // alignItems: "center",
              flexDirection: "row",
              width: "78%",
              justifyContent: "center",
              marginBottom: "4%",
            }}
          >
            <Text
              style={{
                color: COLORS.gray,
                fontSize: 12,
              }}
            >
              By signing in, you agree to our{" "}
            </Text>
            <Text
              style={{
                color: COLORS.darkGreen,
                fontWeight: "bold",
                fontSize: 12,
              }}
            >
              Term & Conditions
            </Text>
          </View>
          <View
            style={{
              flexDirection: "row",
              width: "78%",
              justifyContent: "center",
              marginBottom: "1%",
            }}
          >
            <Text
              style={{
                color: COLORS.gray,
                fontSize: 12,
              }}
            >
              and{" "}
            </Text>
            <Text
              style={{
                color: COLORS.darkGreen,
                fontWeight: "bold",
                fontSize: 12,
                marginBottom: "4.7%",
              }}
            >
              Privacy Policy
            </Text>
          </View>
          <Button
            textColor={COLORS.white}
            bgColor={COLORS.darkGreen}
            btnLabel="Signup"
            onPress={() => {
              validate();
            }}
          />
          <View
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "center",
            }}
          >
            <Text style={{ fontSize: 16 }}>Already have an account ? </Text>
            <TouchableOpacity
              onPress={() => props.navigation.navigate("Login")}
            >
              <Text
                style={{
                  color: COLORS.darkGreen,
                  fontWeight: "bold",
                  fontSize: 16,
                }}
              >
                Login
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </SafeAreaView>
    </Background>
  );
};

export default Signup;

const styles = StyleSheet.create({
  dropdown: {
    height: 40,
    width: 320,
    backgroundColor: COLORS.white,
    flexDirection: "row",
    paddingHorizontal: 15,
    borderWidth: 0.7,
    alignItems: "center",
    borderColor: COLORS.darkGreen,
  },
  icon: {
    marginRight: 5,
  },
  placeholderStyle: {
    color: COLORS.black,
    fontSize: 14,
  },
  selectedTextStyle: {
    fontSize: 14,
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  inputSearchStyle: {
    height: 30,
    fontSize: 14,
  },
});
