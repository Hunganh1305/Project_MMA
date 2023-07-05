import React from "react";
import { Starter, Recipe, Login, Signup } from "./screens";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import Toast from "react-native-toast-message";

import Tabs from "./navigation/tabs";
import AddRecipe from "./screens/AddRecipe";

const Stack = createStackNavigator();

export default function App() {
  return (
    <>
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{
            headerShown: false,
          }}
          initialRouteName={"Starter"}
        >
          <Stack.Screen name="Starter" component={Starter} />
          <Stack.Screen name="Login" component={Login} />
          <Stack.Screen name="AddRecipe" component={AddRecipe} />
          <Stack.Screen name="Signup" component={Signup} />
          <Stack.Screen name="Home" component={Tabs} />
          <Stack.Screen name="Recipe" component={Recipe} />
        </Stack.Navigator>
      </NavigationContainer>
      <Toast />
    </>
  );
}
