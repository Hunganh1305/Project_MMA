import {
  View,
  Text,
  TouchableOpacity,
  Image,
  Platform,
  StyleSheet,
} from "react-native";
import React, { useEffect, useState } from "react";
import { SIZES, FONTS, COLORS, icons } from "../constants";
import { useIsFocused } from "@react-navigation/native";
import { BlurView } from "expo-blur";

const RecipeCardDetails = ({ recipeItem, user }) => {
  const [recipeExisted, setRecipeExisted] = useState([]);
  const isFocused = useIsFocused();

  const arrIdExisted = [];
  const fetchRecipeFromFav = () => {
    fetch(`https://recipeapp-6vxr.onrender.com/user/${user._id}`)
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
    if (recipeExisted.includes(recipeItem._id)) {
      removeFromFav();
    } else {
      addToFav();
    }
  }

  function addToFav() {
    const data = {
      userId: user._id,
      recipeId: recipeItem._id,
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
      recipeId: recipeItem._id,
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
    <View
      style={{
        flex: 1,
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
            color: COLORS.white,
            fontWeight: "bold",
            ...FONTS.h3,
            fontSize: 18,
          }}
        >
          {recipeItem.name}
        </Text>
        <TouchableOpacity
          onPress={() => {
            handleFav();
          }}
        >
          <Image
            source={
              recipeExisted.includes(recipeItem._id)
                ? icons.bookmarkFilled
                : icons.bookmark
            }
            style={{
              width: 20,
              height: 20,
              marginRight: SIZES.base,
              tintColor: COLORS.darkGreen,
            }}
          />
        </TouchableOpacity>
      </View>

      {/* Duration & Serving */}
      <Text
        style={{
          color: COLORS.lightGray,
          ...FONTS.body4,
        }}
      >
        {recipeItem.servingTime} min | {recipeItem.servingSize} Serving
      </Text>
    </View>
  );
};

const RecipeCardInfo = ({ recipeItem, user }) => {
  if (Platform.OS === "ios") {
    return (
      <BlurView tint="dark" style={styles.recipeCardContainer}>
        <RecipeCardDetails recipeItem={recipeItem} user={user} />
      </BlurView>
    );
  } else {
    return (
      <View
        style={{
          ...styles.recipeCardContainer,
          backgroundColor: COLORS.transparentDarkGray,
        }}
      >
        <RecipeCardDetails recipeItem={recipeItem} user={user} />
      </View>
    );
  }
};

const TrendingCard = ({ containerStyle, recipeItem, onPress, user }) => {
  return (
    <TouchableOpacity
      style={{
        height: 350,
        width: 250,
        marginTop: SIZES.radius,
        marginRight: 20,
        borderRadius: SIZES.radius,
        ...containerStyle,
      }}
      onPress={onPress}
    >
      {/* Background Image */}
      <Image
        source={{ uri: `${recipeItem.img}` }}
        resizeMode="cover"
        style={{
          width: 250,
          height: 350,
          borderRadius: SIZES.radius,
        }}
      />

      {/* Category */}
      <View
        style={{
          position: "absolute",
          top: 20,
          left: 15,
          paddingHorizontal: SIZES.radius,
          paddingVertical: 5,
          backgroundColor: COLORS.transparentGray,
          borderRadius: SIZES.radius,
        }}
      >
        <Text
          style={{
            color: COLORS.white,
            fontWeight: "bold",
            ...FONTS.h4,
          }}
        >
          {recipeItem.category.name}
        </Text>
      </View>

      {/* Card info */}
      <RecipeCardInfo recipeItem={recipeItem} user={user} />
    </TouchableOpacity>
  );
};

export default TrendingCard;

const styles = StyleSheet.create({
  recipeCardContainer: {
    position: "absolute",
    bottom: 10,
    left: 10,
    right: 10,
    height: 100,
    paddingVertical: SIZES.radius,
    paddingHorizontal: SIZES.base,
    borderRadius: SIZES.radius,
  },
});
