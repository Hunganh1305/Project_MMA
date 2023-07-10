import { StyleSheet, Text, View, TouchableOpacity, Image } from "react-native";
import React, { useEffect, useState } from "react";
import { COLORS, SIZES, FONTS, icons } from "../constants";
import { useIsFocused } from "@react-navigation/native";

const CategoryCard = ({
  containerStyle,
  categoryItem,
  onPress,
  user,
  recipeExisted,
  setRecipeExisted,
}) => {
  const isFocused = useIsFocused();
  const arrIdExisted = [];
  const fetchRecipeFromFav = () => {
    fetch(`https://recipeapp-6vxr.onrender.com/user/${user?._id}`)
      .then((res) => res.json())
      .then((response) => {
        response.user.favoriteRecipe.map((item) => {
          arrIdExisted.push(item.recipe._id);
        });
        setRecipeExisted(arrIdExisted);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    fetchRecipeFromFav();
  }, [isFocused]);

  function handleFav() {
    if (recipeExisted?.includes(categoryItem._id)) {
      removeFromFav();
    } else {
      addToFav();
    }
  }

  function addToFav() {
    const data = {
      userId: user._id,
      recipeId: categoryItem._id,
    };

    fetch(`https://recipeapp-6vxr.onrender.com/user/favourite`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .then(() => {
        fetchRecipeFromFav();
      })
      .catch((err) => console.log(err));
  }

  function removeFromFav() {
    const data = {
      userId: user._id,
      recipeId: categoryItem._id,
    };
    fetch(`https://recipeapp-6vxr.onrender.com/user/favourite`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then(() => {
        fetchRecipeFromFav();
      })
      .catch((err) => console.log(err));
  }

  return (
    <TouchableOpacity
      style={{
        flexDirection: "row",
        alignItems: "center",
        padding: 10,
        marginTop: 10,
        borderRadius: SIZES.radius,
        backgroundColor: COLORS.gray2,
        ...containerStyle,
      }}
      onPress={onPress}
    >
      {/* Image */}
      <Image
        source={{ uri: `${categoryItem.img}` }}
        resizeMode="cover"
        style={{ width: 100, height: 100, borderRadius: SIZES.radius }}
      />

      {/* Detail */}
      <View
        style={{
          width: "65%",
          paddingHorizontal: 20,
        }}
      >
        {/* Name & Bookmark */}
        <View
          style={{
            flex: 1,
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          <Text
            style={{
              width: "70%",
              fontWeight: "bold",
              ...FONTS.h3,
              fontSize: 18,
            }}
          >
            {categoryItem.name}
          </Text>
          <TouchableOpacity
            onPress={() => {
              handleFav();
            }}
          >
            <Image
              source={
                recipeExisted?.includes(categoryItem._id)
                  ? icons.bookmarkFilled
                  : icons.bookmark
              }
              style={{
                top: -10,
                right: -50,
                width: 20,
                height: 20,
                marginRight: SIZES.base,
                tintColor: COLORS.darkGreen,
              }}
            />
          </TouchableOpacity>
        </View>

        {/* Servings */}
        <Text
          style={{
            color: COLORS.gray,
            fontWeight: "bold",
            ...FONTS.h4,
          }}
        >
          {categoryItem.servingTime} min | {categoryItem.servingSize} Servings
        </Text>
      </View>
    </TouchableOpacity>
  );
};

export default CategoryCard;

const styles = StyleSheet.create({});
