import React, { useCallback, useState } from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { SafeAreaView } from "react-native-safe-area-context";
import { COLORS, FONTS, SIZES, icons } from "../constants";
import { useFocusEffect } from "@react-navigation/native";
import { AntDesign } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";

const ManageRecipe = ({ navigation }) => {
  const [userWithPendingRecipes, setUserWithPendingRecipes] = useState([]);
  const [userId, setUserId] = useState(null);

  const changeRecipeStatus = (recipeId, status) => {
    fetch("https://recipeapp-6vxr.onrender.com/recipe/status", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ recipeId: recipeId, status: status }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data.success) {
          fetch("https://recipeapp-6vxr.onrender.com/recipe/pending")
            .then((res) => res.json())
            .then((data) => {
              setUserWithPendingRecipes(data);
            })
            .catch((err) => console.log(err));
        }
      })
      .catch((err) => console.log(err));
  };

  useFocusEffect(
    useCallback(() => {
      (async () => {
        try {
          const user = await AsyncStorage.getItem("user");
          if (user === null) {
            navigation.navigate("Login");
            return;
          }
          setUserId(JSON.parse(user)._id);
        } catch (error) {
          console.log(error);
        }
      })();
    }, [])
  );

  useFocusEffect(
    useCallback(() => {
      fetch("https://recipeapp-6vxr.onrender.com/recipe/pending")
        .then((res) => res.json())
        .then((data) => {
          setUserWithPendingRecipes(data);
        })
        .catch((err) => console.log(err));
    }, [])
  );
  return (
    <SafeAreaView
      style={{ padding: 10, backgroundColor: COLORS.white, flex: 1 }}
    >
      <ScrollView
        nestedScrollEnabled={true}
        style={{ backgroundColor: COLORS.white }}
      >
        <View
          style={{
            flex: 1,
            alignItems: "center",
            gap: 10,
            flexDirection: "row",
          }}
        >
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
            }}
            onPress={() => navigation.goBack()}
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
          <Text style={{ fontSize: 20, fontWeight: 600 }}>Pending recipes</Text>
        </View>
        {userWithPendingRecipes.length > 0 ? (
          <View style={{ flex: 1, alignItems: "flex-start", marginTop: 25 }}>
            {userWithPendingRecipes.map((item) => (
              <>
                <Text style={{ fontSize: 24, fontWeight: 700 }}>
                  Owner: {item.username}
                </Text>

                {item.createdRecipe.map((recipe) => (
                  <TouchableOpacity
                    style={{
                      flexDirection: "row",
                      alignItems: "center",
                      padding: 10,
                      paddingLeft: 20,
                      marginLeft: -10,
                      marginTop: 10,
                      borderRadius: SIZES.radius,
                      backgroundColor: COLORS.gray2,
                      marginHorizontal: SIZES.padding,
                      width: "100%",
                    }}
                  >
                    {/* Image */}
                    <Image
                      source={{
                        uri: `${recipe.img}`,
                      }}
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
                        width: "55%",
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
                        {recipe.name}
                      </Text>
                      {/* Servings */}
                      <Text
                        style={{
                          color: COLORS.gray,
                          fontWeight: "bold",
                          ...FONTS.h4,
                        }}
                      >
                        {recipe.servingTime} min | {recipe.servingSize} Servings
                      </Text>

                      {/* <AntDesign
                          onPress={() => {}}
                          style={{
                            right: -350,
                            top: -100,
                          }}
                          name="delete"
                          size={24}
                          color="black"
                        /> */}
                    </View>
                    <View
                      style={{
                        flex: 1,
                        alignItems: "center",
                        justifyContent: "space-between",
                        gap: 20,
                      }}
                    >
                      <TouchableOpacity
                        style={{
                          alignItems: "center",
                          justifyContent: "center",
                          height: 35,
                          width: 35,
                          //   borderRadius: 18,
                          //   borderWidth: 1,
                          //   borderColor: COLORS.lightGray,
                          //   backgroundColor: COLORS.black,
                        }}
                        onPress={() =>
                          changeRecipeStatus(recipe._id, "accepted")
                        }
                      >
                        <Image
                          source={icons.check}
                          style={{
                            width: 35,
                            height: 35,
                            // tintColor: COLORS.white,
                          }}
                        />
                      </TouchableOpacity>
                      <TouchableOpacity
                        resizeMode="contain"
                        style={{
                          alignItems: "center",
                          justifyContent: "center",
                          height: 35,
                          width: 35,
                          //   borderRadius: 18,
                          //   borderWidth: 1,
                          //   borderColor: COLORS.lightGray,
                          //   backgroundColor: COLORS.black,
                        }}
                        onPress={() =>
                          changeRecipeStatus(recipe._id, "rejected")
                        }
                      >
                        <Image
                          source={icons.remove}
                          style={{
                            width: 30,
                            height: 30,
                            // tintColor: COLORS.white,
                          }}
                        />
                      </TouchableOpacity>
                    </View>
                  </TouchableOpacity>
                ))}
              </>
            ))}
          </View>
        ) : (
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
              No pending recipe available !
            </Text>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

export default ManageRecipe;
