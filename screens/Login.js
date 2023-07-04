import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  TouchableOpacity,
} from "react-native";
import React from "react";
import Background from "../components/Background";
import { COLORS } from "../constants";
import Field from "../components/Field";
import Button from "../components/Button";

const Login = (props) => {
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
          <Field
            iconName="email-outline"
            placeholder="Enter your email address"
            label="Email"
          />
          <Field
            iconName="lock-outline"
            placeholder="Enter your password"
            label="Password"
            password
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
            Press={() => {
              props.navigation.navigate("Home");
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
