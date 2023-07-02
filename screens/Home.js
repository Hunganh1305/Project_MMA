import React, { useCallback, useEffect, useRef, useState } from "react";
import {
  View,
  Text,
  Image,
  SafeAreaView,
  TouchableOpacity,
  TextInput,
  FlatList,
} from "react-native";
import { FONTS, COLORS, SIZES, icons, images, dummyData } from "../constants";
import { CategoryCard, TrendingCard } from "../components";
import { useFocusEffect } from "@react-navigation/native";
import { ScrollView } from "react-native-gesture-handler";

const Home = ({ navigation }) => {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");
  const [page, setPage] = useState(1);
  const [totalPage, setTotalPage] = useState(1);
  const [result, setResult] = useState([]);
  const [cateList, setCateList] = useState([]);

  useEffect(() => {
    fetch(
      `http://10.0.3.2:8800/recipe?search=${search}${
        category === "" ? "" : "&category=" + category._id
      }&page=${page}&limit=4`
    )
      .then((res) => res.json())
      .then((data) => {
        setResult(data.recipes);
        setPage(data.page);
        setTotalPage(data.totalPage);
      })
      .catch((err) => console.log(err));
  }, [category, search]);

  useEffect(() => {
    fetch(`http://10.0.3.2:8800/category`)
      .then((res) => res.json())
      .then((data) => {
        setCateList([{ _id: 0, name: "All" }, ...data]);
      })
      .catch((err) => console.log(err));
  }, []);

  function renderHeader() {
    return (
      <View
        style={{
          flexDirection: "row",
          marginHorizontal: SIZES.padding,
          alignItems: "center",
          height: 80,
        }}
      >
        {/* Text */}
        <View style={{ flex: 1 }}>
          <Text
            style={{
              color: COLORS.darkGreen,
              fontWeight: "bold",
              ...FONTS.h2,
            }}
          >
            Hello Quang,
          </Text>
          <Text
            style={{
              marginTop: 3,
              color: COLORS.gray,
              fontWeight: "normal",
              ...FONTS.body3,
            }}
          >
            What you want to cook today?
          </Text>
        </View>

        {/* Image */}
        <TouchableOpacity
          onPress={() => {
            console.log("Profile");
          }}
        >
          <Image
            source={images.profile}
            style={{ width: 40, height: 40, borderRadius: 20 }}
          ></Image>
        </TouchableOpacity>
      </View>
    );
  }

  function renderSearchBar() {
    const typingTimeoutRef = useRef(null);
    return (
      <View
        style={{
          marginTop: 30,
          flexDirection: "row",
          height: 50,
          alignItems: "center",
          marginHorizontal: SIZES.padding,
          paddingHorizontal: SIZES.radius,
          borderRadius: 10,
          backgroundColor: COLORS.lightGray,
        }}
      >
        <Image
          source={icons.search}
          style={{
            width: 20,
            height: 20,
            tintColor: COLORS.gray,
          }}
        />

        <TextInput
          style={{
            marginLeft: SIZES.radius,
            // fontWeight: "bold",
            ...FONTS.body3,
          }}
          onChangeText={(value) => {
            if (typingTimeoutRef.current) {
              clearTimeout(typingTimeoutRef.current);
            }
            typingTimeoutRef.current = setTimeout(() => {
              setPage(1);
              setSearch(value);
            }, 400);
          }}
          placeholderTextColor={COLORS.gray}
          placeholder="Search Recipe"
        />
      </View>
    );
  }

  function renderSeeRecipeCard() {
    return (
      <View
        style={{
          flexDirection: "row",
          marginTop: SIZES.padding,
          marginHorizontal: SIZES.padding,
          borderRadius: 10,
          backgroundColor: COLORS.lightGreen,
          zIndex: -1,
        }}
      >
        {/* Image */}
        <View
          style={{
            width: 100,
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Image source={images.recipe} style={{ width: 80, height: 80 }} />
        </View>

        {/* Text */}
        <View style={{ flex: 1, paddingVertical: SIZES.radius }}>
          <Text
            style={{
              width: "70%",
              ...FONTS.body4,
            }}
          >
            You have 12 recipes that you haven't tried yet
          </Text>
          <TouchableOpacity
            style={{
              marginTop: 10,
            }}
            onPress={() => console.log("See Recipes")}
          >
            <Text
              style={{
                color: COLORS.darkGreen,
                textDecorationLine: "underline",
                ...FONTS.h4,
              }}
            >
              See recipe
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  function renderTrendingSection() {
    const [trendingRecipe, setTrendingRecipe] = useState([]);

    useEffect(() => {
      fetch("http://10.0.3.2:8800/recipe?page=1&limit=4")
        .then((res) => res.json())
        .then((data) => {
          setTrendingRecipe(data.recipes);
        })
        .catch((err) => {
          console.log(err);
        });
    }, []);

    return (
      <View
        style={{
          marginTop: SIZES.padding,
        }}
      >
        <Text
          style={{
            marginHorizontal: SIZES.padding,
            fontWeight: "bold",
            ...FONTS.h2,
          }}
        >
          Trending Recipe
        </Text>

        <FlatList
          data={trendingRecipe}
          horizontal
          showsHorizontalScrollIndicator={false}
          keyExtractor={(item) => `${item._id}`}
          renderItem={({ item, index }) => {
            return (
              <TrendingCard
                recipeItem={item}
                containerStyle={{
                  marginLeft: index === 0 ? SIZES.padding : 0,
                }}
                onPress={() => {
                  navigation.navigate("Recipe", { recipe: item });
                }}
              />
            );
          }}
        />
      </View>
    );
  }

  function renderCategoryHeader() {
    const [openModal, setOpenModal] = useState(false);

    return (
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          marginTop: 20,
          marginHorizontal: SIZES.padding,
          position: "relative",
        }}
      >
        {/* Section title */}
        <Text
          style={{
            flex: 1,
            fontWeight: "bold",
            ...FONTS.h2,
          }}
        >
          Category: {category === "" ? "All" : category.name}
        </Text>
        {/* View all */}
        <TouchableOpacity
          onPress={() => {
            console.log(cateList);
            setOpenModal(!openModal);
          }}
        >
          <Text
            style={{
              color: COLORS.gray,
              ...FONTS.body4,
            }}
          >
            Select
          </Text>
        </TouchableOpacity>
        {openModal ? (
          <ScrollView
            style={{
              position: "absolute",
              backgroundColor: COLORS.white,
              width: 100,
              height: 150,
              right: 0,
              bottom: -150,
              elevation: Platform.OS === "android" ? 20 : 0,
              overflow: "hidden",
              flexGrow: 1,
              borderRadius: 8,
              zIndex: 99999999,
            }}
          >
            <FlatList
              data={cateList}
              keyExtractor={(item) => `${item._id}`}
              renderItem={({ item }) => {
                return (
                  <TouchableOpacity
                    style={{ marginHorizontal: 10, marginVertical: 8 }}
                    onPress={() => {
                      if (item._id === 0) {
                        setCategory("");
                        setOpenModal(!openModal);
                      } else {
                        setCategory(item);
                        setOpenModal(!openModal);
                      }
                    }}
                  >
                    <Text style={{ fontSize: 16, fontWeight: 500 }}>
                      {item.name}
                    </Text>
                  </TouchableOpacity>
                );
              }}
            />
          </ScrollView>
        ) : (
          <></>
        )}
      </View>
    );
  }
  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: COLORS.white,
      }}
    >
      <FlatList
        data={result}
        keyExtractor={(item) => `${item._id}`}
        keyboardDismissMode="on-drag"
        showsVerticalScrollIndicator={false}
        removeClippedSubviews={false}
        ListHeaderComponentStyle={{ zIndex: 10 }}
        ListHeaderComponent={
          <View>
            {/* Header */}
            {renderHeader()}

            {/* See recipe card */}
            {renderSeeRecipeCard()}

            {/* Trending section */}
            {renderTrendingSection()}

            {/* Search bar */}
            {renderSearchBar()}

            {/* Category header */}
            {renderCategoryHeader()}
          </View>
        }
        renderItem={({ item }) => {
          return (
            <>
              <CategoryCard
                containerStyle={{
                  marginHorizontal: SIZES.padding,
                }}
                categoryItem={item}
                onPress={() => navigation.navigate("Recipe", { recipe: item })}
              />
            </>
          );
        }}
        ListFooterComponent={
          <>
            {result.length === 0 && (
              <View style={{ marginBottom: 20 }}>
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
                  Not found recipes !
                </Text>
              </View>
            )}
            {page < totalPage ? (
              <View
                style={{
                  marginBottom: 120,
                  marginTop: 20,
                  alignItems: "center",
                }}
              >
                <TouchableOpacity
                  onPress={() => {
                    setPage(page + 1);
                    fetch(
                      `http://10.0.3.2:8800/recipe?search=${search}&category=${category}&page=${
                        page + 1
                      }&limit=4`
                    )
                      .then((res) => res.json())
                      .then((data) => {
                        setResult([...result, ...data.recipes]);
                        setTotalPage(data.totalPage);
                      })
                      .catch((err) => console.log(err));
                  }}
                  style={{
                    shadowColor: "black",
                    shadowRadius: 40,
                    shadowOffset: { width: -20, height: -10 },
                    shadowOpacity: 1,
                    backgroundColor: "black",
                    borderRadius: 20,
                    paddingHorizontal: 30,
                    paddingVertical: 10,
                  }}
                >
                  <Text style={{ color: COLORS.gray2, ...FONTS.h3 }}>
                    Load More
                  </Text>
                </TouchableOpacity>
              </View>
            ) : (
              <View style={{ marginBottom: 120 }}></View>
            )}
          </>
        }
      ></FlatList>
    </SafeAreaView>
  );
};

export default Home;
