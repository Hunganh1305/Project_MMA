import React from "react";
import {
  Starter,
  Recipe,
  Login,
  Signup,
  Profile,
  EditProfile,
} from "./screens";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import Toast from "react-native-toast-message";

import Tabs from "./navigation/tabs";
import AddRecipe from "./screens/AddRecipe";
import ManageRecipe from "./screens/ManageRecipe";
import EditFavorite from "./screens/EditFavorite";

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
          <Stack.Screen name="Manage" component={ManageRecipe} />
          <Stack.Screen name="Signup" component={Signup} />
          <Stack.Screen name="Home" component={Tabs} />
          <Stack.Screen name="Recipe" component={Recipe} />
          <Stack.Screen name="EditFavorite" component={EditFavorite} />
          <Stack.Screen name="Profile" component={Profile} />
          <Stack.Screen name="EditProfile" component={EditProfile} />
        </Stack.Navigator>
      </NavigationContainer>
      <Toast />
    </>
  );
}
