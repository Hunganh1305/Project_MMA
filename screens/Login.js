import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  TouchableOpacity,
} from "react-native";
import React, { useCallback, useEffect, useState } from "react";
import Background from "../components/Background";
import { COLORS } from "../constants";
import Field from "../components/Field";
import Button from "../components/Button";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFocusEffect } from "@react-navigation/native";

const Login = (props) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

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
          {error && (
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
          )}

          <Field
            onChangeText={(username) => {
              setUsername(username);
            }}
            placeholder="username"
            keyboardType={"text"}
          />
          <Field
            onChangeText={(password) => {
              setPassword(password);
            }}
            placeholder="Password"
            secureTextEntry={true}
          />
          <View
            style={{
              alignItems: "flex-end",
              width: "78%",
              paddingRight: 16,
              marginBottom: "47%",
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
            Press={() => {
              setError("");
              if (username === "") {
                setError("Username required !");
                return;
              }
              if (password === "") {
                setError("Password required !");
                return;
              }
              fetch("https://recipeapp-6vxr.onrender.com/auth/login", {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify({
                  username: username,
                  password: password,
                }),
              })
                .then((res) => res.json())
                .then((data) => {
                  if (data.success === false) {
                    setError(data.message);
                    return;
                  }
                  (async () => {
                    try {
                      await AsyncStorage.setItem(
                        "user",
                        JSON.stringify(data.userInfo)
                      );
                    } catch (error) {
                      console.log(error);
                    }
                  })();
                  props.navigation.navigate("Home");
                })
                .catch((err) => {
                  console.log(err);
                });
            }}
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
