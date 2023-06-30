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

const Signup = (props) => {
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
          Register
        </Text>
        <Text
          style={{
            color: "white",
            fontSize: 19,
            fontWeight: "bold",
            marginBottom: 20,
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
          <Field placeholder="User Name" />
          <Field placeholder="Phone" keyboardType={"numeric"} />
          <Field placeholder="Address" />
          <Field placeholder="Email" keyboardType={"email-address"} />
          <Field placeholder="Password" secureTextEntry={true} />
          <Field placeholder="Confirm Password" secureTextEntry={true} />
          <View
            style={{
              alignItems: "flex",
              flexDirection: "row",
              width: "78%",
              paddingRight: 16,
              //   marginBottom: "40%",
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
              alignItems: "flex",
              flexDirection: "row",
              justifyContent: "center",
              width: "78%",
              paddingRight: 16,
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
              }}
            >
              Provacy Policy
            </Text>
          </View>
          <Button
            textColor={COLORS.white}
            bgColor={COLORS.darkGreen}
            btnLabel="Signup"
            Press={() => {
              alert("Account Created !");
              props.navigation.navigate("Login");
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

const styles = StyleSheet.create({});
