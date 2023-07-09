import React, { useCallback, useState } from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { SafeAreaView } from "react-native-safe-area-context";
import { COLORS, FONTS, SIZES, icons } from "../constants";
import { useFocusEffect } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Toast from "react-native-toast-message";

const CreatedRecipe = ({ navigation }) => {
  const [createdRecipe, setCreatedRecipe] = useState([]);
  const [userId, setUserId] = useState(null);
  console.log(createdRecipe);

  const showSuccessToast = (text) => {
    Toast.show({
      type: "success",
      text1: text,
      visibilityTime: 3000,
    });
  };

  useFocusEffect(
    useCallback(() => {
      (async () => {
        try {
          let user = await AsyncStorage.getItem("user");
          if (user === null) {
            navigation.navigate("Login");
            return;
          }
          setUserId(JSON.parse(user)._id);
          user = JSON.parse(user);
          fetch(`https://recipeapp-6vxr.onrender.com/user/${user._id}`)
            .then((res) => res.json())
            .then((response) => {
              setCreatedRecipe(response.user.createdRecipe);
            })
            .catch((err) => console.log(err));
        } catch (error) {
          console.log(error);
        }
      })();
    }, [])
  );

  const handelChangeStatus = (recipeId) => {
    fetch("https://recipeapp-6vxr.onrender.com/recipe/status", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ recipeId: recipeId, status: "pending" }),
    })
      .then((res) => res.json())
      .then((data) => {
        fetch(`https://recipeapp-6vxr.onrender.com/user/${userId}`)
          .then((res) => res.json())
          .then((response) => {
            setCreatedRecipe(response.user.createdRecipe);
            showSuccessToast("Reapply recipe succesfully !");
          })
          .catch((err) => console.log(err));
      })
      .catch((err) => console.log(err));
  };

  const handleDelete = (recipeId) => {
    fetch("https://recipeapp-6vxr.onrender.com/recipe", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ recipeId: recipeId, userId: userId }),
    })
      .then((res) => res.json())
      .then((data) => {
        fetch(`https://recipeapp-6vxr.onrender.com/user/${userId}`)
          .then((res) => res.json())
          .then((response) => {
            setCreatedRecipe(response.user.createdRecipe);
            showSuccessToast("Delete recipe succesfully !");
          })
          .catch((err) => console.log(err));
      })
      .catch((err) => console.log(err));
  };
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
          <Text style={{ fontSize: 20, fontWeight: 600 }}>Your recipes</Text>
        </View>
        {createdRecipe.length > 0 ? (
          <View style={{ flex: 1, alignItems: "flex-start", marginTop: 25 }}>
            {createdRecipe.map((item) => (
              <TouchableOpacity
                onPress={() => {
                  fetch(
                    `https://recipeapp-6vxr.onrender.com/recipe/${item._id}`
                  )
                    .then((res) => res.json())
                    .then((data) => {
                      navigation.navigate("Recipe", {
                        recipe: data[0],
                        editable: false,
                      });
                    })
                    .catch((err) => console.log(err));
                }}
                key={item._id}
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
                  source={{ uri: item.img }}
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
                    width: "50%",
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
                    {item.name}
                  </Text>
                  {/* status */}
                  <Text
                    style={{
                      flex: 1,
                      fontWeight: 600,
                      color: COLORS.lightGray3,
                      ...FONTS.h4,
                    }}
                  >
                    Status: {item.status}
                  </Text>
                  {/* Servings */}
                  <Text
                    style={{
                      color: COLORS.gray,
                      fontWeight: "bold",
                      ...FONTS.h4,
                    }}
                  >
                    {item.servingTime} min | {item.servingSize} Servings
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
                  {item.status === "rejected" && (
                    <TouchableOpacity
                      style={{
                        alignItems: "center",
                        justifyContent: "center",
                        width: 80,
                        backgroundColor: "#00C851",
                        paddingHorizontal: 10,
                        paddingVertical: 10,
                        borderRadius: 5,
                        //   borderWidth: 1,
                        //   borderColor: COLORS.lightGray,
                        //   backgroundColor: COLORS.black,
                      }}
                      onPress={() => handelChangeStatus(item._id)}
                    >
                      <Text style={{ fontWeight: 600 }}>REAPPLY</Text>
                    </TouchableOpacity>
                  )}

                  <TouchableOpacity
                    resizeMode="contain"
                    style={{
                      alignItems: "center",
                      justifyContent: "center",
                      width: 80,
                      backgroundColor: "#ff4444",
                      paddingHorizontal: 10,
                      paddingVertical: 10,
                      borderRadius: 5,
                      //   borderRadius: 18,
                      //   borderWidth: 1,
                      //   borderColor: COLORS.lightGray,
                      //   backgroundColor: COLORS.black,
                    }}
                    onPress={() => handleDelete(item._id)}
                  >
                    <Text style={{ fontWeight: 600 }}>DELETE</Text>
                  </TouchableOpacity>
                </View>
              </TouchableOpacity>
            ))}
          </View>
        ) : (
          <></>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

export default CreatedRecipe;
