import {
  View,
  Text,
  TouchableOpacity,
  Image,
  Platform,
  StyleSheet,
} from "react-native";
import React from "react";
import { SIZES, FONTS, COLORS, icons, images } from "../constants";
import { BlurView } from "expo-blur";

const RecipeCardDetails = ({ recipeItem }) => {
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
            console.log("favourite");
          }}
        >
          <Image
            source={
              recipeItem.isBookmark ? icons.bookmarkFilled : icons.bookmark
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

const RecipeCardInfo = ({ recipeItem }) => {
  if (Platform.OS === "ios") {
    return (
      <BlurView tint="dark" style={styles.recipeCardContainer}>
        <RecipeCardDetails recipeItem={recipeItem} />
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
        <RecipeCardDetails recipeItem={recipeItem} />
      </View>
    );
  }
};

const TrendingCard = ({ containerStyle, recipeItem, onPress }) => {
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
      <RecipeCardInfo recipeItem={recipeItem} />
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
