import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  TouchableOpacity,
  Keyboard,
  Alert,
} from "react-native";
import React, { useCallback, useEffect, useState } from "react";
import Background from "../components/Background";
import { COLORS } from "../constants";
import Field from "../components/Field";
import Button from "../components/Button";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFocusEffect } from "@react-navigation/native";

const Login = (props) => {
  // const [username, setUsername] = useState("");
  // const [password, setPassword] = useState("");
  // const [error, setError] = useState("");
  const [inputs, setInputs] = useState({
    username: "",
    password: "",
  });
  const [errors, setErrors] = useState({});
  const validate = () => {
    Keyboard.dismiss();
    let valid = true;

    if (!inputs.username) {
      handleError("Please input username", "username");
      valid = false;
    }

    if (!inputs.password) {
      handleError("Please input password", "password");
      valid = false;
    }
    if (valid) {
      console.log("input: " + JSON.stringify(inputs));
      login();
    }
  };

  const login = () => {
    fetch("http://recipeapp-6vxr.onrender.com/auth/login", {
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
        (async () => {
          try {
            await AsyncStorage.setItem("user", JSON.stringify(data.userInfo));
          } catch (error) {
            console.log(error);
          }
        })();
        props.navigation.navigate("Home");
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const handleOnChange = (text, input) => {
    setInputs((prevState) => ({ ...prevState, [input]: text }));
  };
  const handleError = (errorMessage, input) => {
    setErrors((prevState) => ({ ...prevState, [input]: errorMessage }));
  };

  useFocusEffect(
    useCallback(() => {
      (async () => {
        try {
          const user = await AsyncStorage.getItem("user");
          if (user !== null) {
            props.navigation.navigate("Home");
            return;
          }
        } catch (error) {
          console.log(error);
        }
      })();
    }, [])
  );

  return (
    <Background>
      <SafeAreaView
        style={{
          alignItems: "center",
          width: "100%",
        }}
      >
        <Text
          style={{
            color: "white",
            fontSize: 54,
            fontWeight: "bold",
            marginVertical: 10,
          }}
        >
          Login
        </Text>
        <View
          style={{
            backgroundColor: "white",
            height: "100%",
            width: "100%",
            borderTopLeftRadius: 130,
            paddingTop: 70,
            alignItems: "center",
          }}
        >
          <Text
            style={{
              fontSize: 30,
              color: COLORS.darkGreen,
              fontWeight: "bold",
            }}
          >
            Welcome Back
          </Text>
          <Text
            style={{
              color: COLORS.gray,
              fontSize: 16,
              fontWeight: "bold",
              marginBottom: 20,
            }}
          >
            Login to your account
          </Text>
          {/* {error && (
            <Text
              style={{
                color: "red",
                fontSize: 16,
                fontWeight: "bold",
                marginBottom: 20,
              }}
            >
              {error}
            </Text>
          )} */}

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
          <View
            style={{
              alignItems: "flex-end",
              width: "80%",
              paddingRight: "2%",
              marginBottom: "45%",
            }}
          >
            <Text
              style={{
                color: COLORS.darkGreen,
                fontWeight: "bold",
                fontSize: 16,
              }}
            >
              Forgot Password ?
            </Text>
          </View>
          <Button
            textColor={COLORS.white}
            bgColor={COLORS.darkGreen}
            btnLabel="Login"
            onPress={validate}
            // onPress={() => {
            //   setError("");
            //   if (username === "") {
            //     setError("Username required !");
            //     return;
            //   }
            //   if (password === "") {
            //     setError("Password required !");
            //     return;
            //   }
            //   fetch("https://recipeapp-6vxr.onrender.com/auth/login", {
            //     method: "POST",
            //     headers: {
            //       "Content-Type": "application/json",
            //     },
            //     body: JSON.stringify({
            //       username: username,
            //       password: password,
            //     }),
            //   })
            //     .then((res) => res.json())
            //     .then((data) => {
            //       if (data.success === false) {
            //         setError(data.message);
            //         return;
            //       }
            //       (async () => {
            //         try {
            //           await AsyncStorage.setItem(
            //             "user",
            //             JSON.stringify(data.userInfo)
            //           );
            //         } catch (error) {
            //           console.log(error);
            //         }
            //       })();
            //       props.navigation.navigate("Home");
            //     })
            //     .catch((err) => {
            //       console.log(err);
            //     });
            // }}
          />
          <View
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "center",
            }}
          >
            <Text style={{ fontSize: 16 }}>Don't have an account ? </Text>
            <TouchableOpacity
              onPress={() => props.navigation.navigate("Signup")}
            >
              <Text
                style={{
                  color: COLORS.darkGreen,
                  fontWeight: "bold",
                  fontSize: 16,
                }}
              >
                Signup
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </SafeAreaView>
    </Background>
  );
};

export default Login;

const styles = StyleSheet.create({});
