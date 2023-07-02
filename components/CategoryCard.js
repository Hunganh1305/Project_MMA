import { StyleSheet, Text, View, TouchableOpacity, Image } from "react-native";
import React from "react";
import { COLORS, SIZES, FONTS } from "../constants";

const CategoryCard = ({ containerStyle, categoryItem, onPress }) => {
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
        {/* Name */}
        <Text
          style={{
            flex: 1,
            fontWeight: "bold",
            ...FONTS.h2,
          }}
        >
          {categoryItem.name}
        </Text>
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
