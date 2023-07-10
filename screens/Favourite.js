import React, { useCallback, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { useFocusEffect } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { COLORS, SIZES, FONTS } from "../constants";
import { AntDesign } from "@expo/vector-icons";

const Favourite = ({ navigation }) => {
  const [recipe, setRecipe] = useState([]);
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
          fetchRecipeFromFav(JSON.parse(user));
        } catch (error) {
          console.log(error);
        }
      })();
    }, [])
  );

  const fetchRecipeFromFav = (user) => {
    fetch(`https://recipeapp-6vxr.onrender.com/user/${user._id}`)
      .then((res) => res.json())
      .then((response) => {
        setRecipe(response.user.favoriteRecipe);
      })
      .catch((err) => console.log(err));
  };

  function removeFromFav(id) {
    const data = {
      userId: user._id,
      recipeId: id,
    };
    fetch(`https://recipeapp-6vxr.onrender.com/user/favourite`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then(() => {
        fetchRecipeFromFav(user);
      })
      .catch((err) => console.log(err));
  }

  return (
    <SafeAreaView>
      <View
        style={{
          marginTop: 20,
        }}
      >
        <Text
          style={{
            color: COLORS.darkGreen,
            fontWeight: "bold",
            ...FONTS.h1,
            textAlign: "center",
          }}
        >
          Favourite List
        </Text>
      </View>
      <ScrollView>
        {recipe.length === 0 ? (
          <View style={{ marginBottom: 20, marginTop: 30 }}>
            <View style={{ height: 200 }}>
              <Image
                source={require("../assets/images/search-empty.png")}
                resizeMode="contain"
                style={{ height: "100%", marginTop: 10 }}
              />
            </View>

            <Text
              style={{
                fontSize: 25,
                textAlign: "center",
                color: "rgb(120, 117, 117)",
                fontWeight: 600,
              }}
            >
              Let find your favourite recipe !
            </Text>
          </View>
        ) : (
          recipe.map((item) => (
            <View>
              <TouchableOpacity
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  padding: 10,
                  marginTop: 10,
                  borderRadius: SIZES.radius,
                  backgroundColor: COLORS.gray2,
                  marginHorizontal: SIZES.padding,
                }}
                onPress={() => {
                  fetch(
                    `https://recipeapp-6vxr.onrender.com/recipe/${item.recipe._id}`
                  )
                    .then((res) => res.json())
                    .then((data) => {
                      console.log(data);
                      navigation.navigate("Recipe", {
                        recipe: data[0],
                        editable: false,
                      });
                    })
                    .catch((err) => console.log(err));
                }}
              >
                {/* Image */}
                <Image
                  source={{ uri: `${item.recipe.img}` }}
                  resizeMode="cover"
                  style={{
                    width: 100,
                    height: 100,
                    borderRadius: SIZES.radius,
                  }}
                />

                {/* Detail */}
                <View
                  style={{
                    width: "65%",
                    paddingHorizontal: 20,
                  }}
                >
                  {/* Name */}
                  <Text
                    style={{
                      flex: 1,
                      fontWeight: "bold",
                      ...FONTS.h2,
                    }}
                  >
                    {item.recipe.name}
                  </Text>
                  {/* Servings */}
                  <Text
                    style={{
                      color: COLORS.gray,
                      fontWeight: "bold",
                      ...FONTS.h4,
                    }}
                  >
                    {item.recipe.servingTime} min | {item.recipe.servingSize}{" "}
                    Servings
                  </Text>
                </View>
              </TouchableOpacity>
              <AntDesign
                onPress={() => {
                  removeFromFav(item.recipe._id);
                }}
                style={{
                  right: -350,
                  top: -100,
                }}
                name="delete"
                size={24}
                color="black"
              />
              <AntDesign
                onPress={() => {
                  navigation.navigate("EditFavorite", {
                    recipe: item,
                    user: user,
                  });
                }}
                style={{
                  right: -350,
                  top: -60,
                }}
                name="edit"
                size={24}
                color="black"
              />
            </View>
          ))
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

export default Favourite;

const styles = StyleSheet.create({});
