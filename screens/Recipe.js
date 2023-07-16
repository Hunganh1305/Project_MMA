import React, { useEffect, useRef, useState, useCallback } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  Animated,
  Platform,
} from "react-native";
import { BlurView } from "expo-blur";
import { SIZES, FONTS, COLORS, icons } from "../constants";
import { useFocusEffect } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Viewers } from "../components";
const HEADER_HEIGHT = 350;

const RecipeCreatorCardDetail = ({ selectedRecipe }) => {
  const [owner, setOwner] = useState(null);

  useFocusEffect(
    useCallback(() => {
      fetch(
        `https://recipeapp-6vxr.onrender.com/recipe/owner/${selectedRecipe?._id}`
      )
        .then((res) => res.json())
        .then((data) => {
          setOwner(data.owner[0]);
        })
        .catch((err) => console.log(err));
    }, [selectedRecipe])
  );
  return (
    <View style={{ flex: 1, flexDirection: "row", alignItems: "center" }}>
      {/* Profile Photo */}
      <View style={{ width: 40, height: 40, marginLeft: 20 }}>
        {owner?.img ? (
          <Image
            resizeMode="contain"
            source={{
              uri: owner.img,
            }}
            style={{ width: 40, height: 40, borderRadius: 20 }}
          ></Image>
        ) : (
          <Image
            resizeMode="contain"
            source={{
              uri: "https://assets.stickpng.com/images/585e4bf3cb11b227491c339a.png",
            }}
            style={{ width: 40, height: 40, borderRadius: 20 }}
          ></Image>
        )}
      </View>
      {/* Labels */}
      <View style={{ flex: 1, marginHorizontal: 20 }}>
        <Text style={{ color: COLORS.lightGray2, ...FONTS.body4 }}>
          Recipe by:
        </Text>
        <Text style={{ color: COLORS.white2, ...FONTS.h3 }}>
          {owner?.username}
        </Text>
      </View>
      {/* Button */}
      <TouchableOpacity
        style={{
          width: 30,
          height: 30,
          alignItems: "center",
          justifyContent: "center",
          borderRadius: 5,
          marginRight: 20,
          borderWidth: 1,
          borderColor: COLORS.lightGreen1,
        }}
      >
        <Image
          source={icons.rightArrow}
          style={{ width: 15, height: 15, tintColor: COLORS.lightGreen1 }}
        />
      </TouchableOpacity>
    </View>
  );
};

const RecipeCreatorCardInfo = ({ selectedRecipe }) => {
  if (Platform.OS === "ios") {
    return (
      <BlurView style={{ flex: 1, borderRadius: SIZES.radius }} tint="dark">
        <RecipeCreatorCardDetail selectedRecipe={selectedRecipe} />
      </BlurView>
    );
  } else {
    return (
      <View
        style={{
          flex: 1,
          borderRadius: SIZES.radius,
          backgroundColor: COLORS.transparentBlack9,
        }}
      >
        <RecipeCreatorCardDetail selectedRecipe={selectedRecipe} />
      </View>
    );
  }
};

const Recipe = ({ navigation, route }) => {
  const [selectedRecipe, setSelectedRecipe] = useState(null);
  const [user, setUser] = useState(null);
  const [recipeExisted, setRecipeExisted] = useState([]);
  const [ingredientImg, setIngredientImg] = useState("");
  const arrIdExisted = [];
  const [editable, setEditable] = useState(false);

  const recipeId = route.params.recipe._id;
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

  useEffect(() => {
    fetch(`https://recipeapp-6vxr.onrender.com/recipe/${recipeId}`)
      .then((res) => res.json())
      .then((response) => {
        setIngredientImg(response[0].img);
      });
  }, []);

  const fetchRecipeFromFav = (user) => {
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

  const scrollY = useRef(new Animated.Value(0)).current;
  useEffect(() => {
    let { recipe, editable } = route.params;
    setSelectedRecipe(recipe);
    setEditable(editable);
  }, []);

  function handleFav() {
    if (recipeExisted.includes(selectedRecipe._id)) {
      removeFromFav();
    } else {
      addToFav();
    }
  }

  function addToFav() {
    const data = {
      userId: user._id,
      recipeId: selectedRecipe._id,
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
        fetchRecipeFromFav(user);
      })
      .catch((err) => console.log(err));
  }

  function removeFromFav() {
    const data = {
      userId: user._id,
      recipeId: selectedRecipe._id,
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

  function renderHeaderBar() {
    return (
      <View
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          height: 90,
          flexDirection: "row",
          alignItems: "flex-end",
          justifyContent: "space-between",
          paddingHorizontal: SIZES.padding,
          paddingBottom: 10,
        }}
      >
        {/* Screen Overlay */}
        <Animated.View
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: COLORS.black,
            opacity: scrollY.interpolate({
              inputRange: [HEADER_HEIGHT - 100, HEADER_HEIGHT - 70],
              outputRange: [0, 1],
            }),
          }}
        />

        {/* Header Bar Title */}
        <Animated.View
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            alignItems: "center",
            justifyContent: "flex-end",
            paddingBottom: 10,
            opacity: scrollY.interpolate({
              inputRange: [HEADER_HEIGHT - 100, HEADER_HEIGHT - 50],
              outputRange: [0, 1],
            }),
            transform: [
              {
                translateY: scrollY.interpolate({
                  inputRange: [HEADER_HEIGHT - 100, HEADER_HEIGHT - 50],
                  outputRange: [50, 0],
                  extrapolate: "clamp",
                }),
              },
            ],
          }}
        >
          <Text style={{ color: COLORS.lightGray2, ...FONTS.body4 }}>
            Recipe by:
          </Text>
          <Text style={{ color: COLORS.white2, ...FONTS.h3 }}>Tu123</Text>
        </Animated.View>

        {/* Back Button */}
        <TouchableOpacity
          style={{
            alignItems: "center",
            justifyContent: "center",
            height: 35,
            width: 35,
            borderRadius: 18,
            borderWidth: 1,
            borderColor: COLORS.lightGray,
            backgroundColor: COLORS.transparentBlack5,
          }}
          onPress={() => navigation.goBack()}
        >
          <Image
            source={icons.back}
            style={{
              width: 15,
              height: 15,
              tintColor: COLORS.lightGray,
            }}
          />
        </TouchableOpacity>
        {/* Bookmark */}

        {editable && (
          <TouchableOpacity
            style={{
              alignItems: "center",
              justifyContent: "center",
              height: 35,
              width: 35,
            }}
            onPress={() => {
              handleFav();
            }}
          >
            <Image
              source={
                recipeExisted.includes(selectedRecipe?._id)
                  ? icons.bookmarkFilled
                  : icons.bookmark
              }
              style={{
                width: 30,
                height: 30,
                tintColor: COLORS.darkGreen,
              }}
            />
          </TouchableOpacity>
        )}
      </View>
    );
  }

  function renderRecipeCardHeader() {
    return (
      <View
        style={{
          alignItems: "center",
          overflow: "hidden",
          marginTop: -1000,
          paddingTop: 1000,
        }}
      >
        {/* Background Image */}

        <Animated.Image
          source={{
            uri: selectedRecipe?.img ? selectedRecipe?.img : ingredientImg,
          }}
          resizeMode="cover"
          style={{
            height: HEADER_HEIGHT,
            width: "150%",
            transform: [
              {
                translateY: scrollY.interpolate({
                  inputRange: [-HEADER_HEIGHT, 0, HEADER_HEIGHT],
                  outputRange: [-HEADER_HEIGHT / 2, 0, HEADER_HEIGHT * 0.75],
                }),
              },
              {
                scale: scrollY.interpolate({
                  inputRange: [-HEADER_HEIGHT, 0, HEADER_HEIGHT],
                  outputRange: [2, 1, 0.75],
                }),
              },
            ],
          }}
        />

        {/* Recipe Creator Card */}
        <Animated.View
          style={{
            position: "absolute",
            bottom: 10,
            left: 30,
            right: 30,
            height: 80,
            transform: [
              {
                translateY: scrollY.interpolate({
                  inputRange: [0, 170, 250],
                  outputRange: [0, 0, 100],
                  extrapolate: "clamp",
                }),
              },
            ],
          }}
        >
          <RecipeCreatorCardInfo selectedRecipe={selectedRecipe} />
        </Animated.View>
      </View>
    );
  }

  function renderRecipeInfo() {
    return (
      <View
        style={{
          flexDirection: "row",
          height: 130,
          width: SIZES.width,
          paddingHorizontal: 30,
          paddingVertical: 30,
          alignItems: "center",
        }}
      >
        {/* Recipe */}
        <View style={{ flex: 1.5, justifyContent: "center" }}>
          <Text style={{ ...FONTS.h2, fontWeight: "600" }}>
            {selectedRecipe?.name}
          </Text>
          <Text
            style={{ marginTop: 5, color: COLORS.lightGray2, ...FONTS.body4 }}
          >
            {selectedRecipe?.servingTime} min | {selectedRecipe?.servingSize}{" "}
            Serving
          </Text>
        </View>

        {/* Viewers */}
        {/* <View style={{ flex: 1, justifyContent: "center" }}>
          <Viewers viewersList={selectedRecipe?.viewers} />
        </View> */}
      </View>
    );
  }

  function renderIngredientHeader() {
    return (
      <View
        style={{
          flexDirection: "row",
          paddingHorizontal: 30,
          marginTop: SIZES.radius,
          marginBottom: SIZES.padding,
        }}
      >
        <Text style={{ flex: 1, ...FONTS.h3, fontWeight: 600 }}>
          Ingredients
        </Text>
        <Text
          style={{
            color: COLORS.lightGray2,
            ...FONTS.body4,
          }}
        >
          {selectedRecipe?.ingredients?.length} items
        </Text>
      </View>
    );
  }
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: COLORS.white,
      }}
    >
      <Animated.FlatList
        data={selectedRecipe?.ingredients}
        keyExtractor={(item) => `${item._id}`}
        showsVerticalScrollIndicator={false}
        ListHeaderComponent={
          <View>
            {/* Header */}
            {renderRecipeCardHeader()}
            {/* Info */}
            {renderRecipeInfo()}
            {/* Ingredient Title */}
            {renderIngredientHeader()}
          </View>
        }
        scrollEventThrottle={16}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { y: scrollY } } }],
          { useNativeDriver: true }
        )}
        renderItem={({ item }) => (
          <View
            style={{
              flexDirection: "row",
              paddingHorizontal: 30,
              marginVertical: 5,
            }}
          >
            {/* Icon */}
            <View
              style={{
                alignItems: "center",
                justifyContent: "center",
                height: 50,
                width: 50,
                borderRadius: 5,
                backgroundColor: COLORS.lightGray,
              }}
            >
              <Image
                source={{ uri: item?.ingredient?.img }}
                style={{
                  height: 40,
                  width: 40,
                }}
              />
            </View>
            {/* Description */}
            <View
              style={{
                flex: 1,
                paddingHorizontal: 20,
                justifyContent: "center",
              }}
            >
              <Text style={{ ...FONTS.body3 }}>{item.name}</Text>
            </View>

            {/* Quantity */}
            <View style={{ alignItems: "flex-end", justifyContent: "center" }}>
              <Text style={{ ...FONTS.body3 }}>{item.amount}</Text>
            </View>
          </View>
        )}
        ListFooterComponent={
          <View
            style={{
              marginBottom: 200,
            }}
          ></View>
        }
      />
      {/* HeaderBar */}
      {renderHeaderBar()}
    </View>
  );
};

export default Recipe;
