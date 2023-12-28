import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  SafeAreaView,
  TouchableOpacity,
  TextInput,
} from "react-native";
import { Dropdown } from "react-native-element-dropdown";
import { COLORS, icons, FONTS, SIZES } from "../constants";
import Toast from "react-native-toast-message";

const EditFavorite = ({ navigation, route }) => {
  let { recipe } = route.params;
  const userId = route.params.user._id;
  const recipeId = route.params.recipe.recipe._id;
  const mealOptions = [
    { id: 0, name: "Breakfast" },
    { id: 1, name: "Lunch" },
    { id: 2, name: "Dinner" },
  ];
  const regex =
    /^(0[1-9]|[12][0-9]|3[01])\/(0[1-9]|1[0-2])\/(202[3-5]|2[3-9][0-9]\d+)$/;
  const [date, setDate] = useState("");
  const [meal, setMeal] = useState({ id: null, name: "" });

  useEffect(() => {
    if (date === "") {
      setDate(recipe.date);
    }
    mealOptions.map((item) => {
      if (item.name == recipe.meal) {
        setMeal({ id: item.id, name: item.name });
      }
    });
  }, []);

  const renderItem = (item) => {
    return (
      <View style={{ padding: 10, backgroundColor: "white" }}>
        <Text style={{ fontSize: 14 }}>{item.name}</Text>
      </View>
    );
  };

  const showErrorToast = (error1, error2) => {
    Toast.show({
      type: "error",
      text1: error1,
      text2: error2,
      visibilityTime: 3000,
    });
  };

  const showSuccessToast = () => {
    Toast.show({
      type: "success",
      text1: "Successfully edited !",
      visibilityTime: 3000,
    });
  };

  function handleSave() {
    const data = {
      userId: userId,
      recipeId: recipeId,
      date: date,
      meal: meal.name,
    };

    if (!date.match(regex)) {
      if (date.slice(-1) < 3 || date.slice(-1) > 5) {
        showErrorToast("Wrong date format!", "Year must from 2023 to 2025");
      } else {
        showErrorToast("Wrong date format!", "");
      }
      return;
    }
    if (meal.name === "") {
      showErrorToast("Please fill all the field !");
      return;
    }

    fetch(`https://recipeapp-6vxr.onrender.com/user/favourite`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .then((response) => {
        console.log(response);
        showSuccessToast();
      })
      .catch((err) => console.log(err));
  }

  return (
    <SafeAreaView>
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
          marginLeft: 20,
          marginVertical: 20,
        }}
        onPress={() => {
          navigation.goBack();
        }}
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
      <View>
        <Text
          style={{
            color: COLORS.darkGreen,
            fontWeight: "bold",
            ...FONTS.h1,
            textAlign: "center",
          }}
        >
          Set Date And Meal
        </Text>
      </View>
      <View>
        <View
          style={{
            alignItems: "center",
            padding: 10,
            marginTop: 10,
            borderRadius: SIZES.radius,
            backgroundColor: COLORS.gray2,
            marginHorizontal: SIZES.padding,
          }}
        >
          <Image
            source={{ uri: `${recipe.recipe.img}` }}
            resizeMode="cover"
            style={{
              width: 250,
              height: 200,
              borderRadius: SIZES.radius,
            }}
          />
          <Text
            style={{
              fontWeight: "bold",
              ...FONTS.h2,
              paddingTop: 5,
            }}
          >
            {recipe.recipe.name}
          </Text>
          <Text
            style={{
              color: COLORS.gray,
              fontWeight: "bold",
              ...FONTS.h4,
            }}
          >
            {recipe.recipe.servingTime} min | {recipe.recipe.servingSize}{" "}
            Servings
          </Text>
          <View
            style={{
              marginTop: 10,
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            <Text style={{ fontSize: 18, fontWeight: 500 }}>Date:</Text>
            <TextInput
              defaultValue={recipe?.date}
              onChangeText={(date) => {
                setDate(date);
              }}
              style={{
                width: "60%",
                height: 30,
                borderRadius: 100,
                paddingHorizontal: 10,
                marginLeft: 20,
                backgroundColor: COLORS.lightGray,
                color: COLORS.black,
                fontSize: 16,
              }}
              placeholder="dd/mm/yyyy"
            />
          </View>
          <View
            style={{
              marginTop: 10,
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            <Text style={{ fontSize: 18, fontWeight: 500 }}>Meal:</Text>
            <Dropdown
              style={styles.dropdown}
              placeholderStyle={styles.placeholderStyle}
              selectedTextStyle={styles.selectedTextStyle}
              iconStyle={styles.iconStyle}
              data={mealOptions}
              maxHeight={300}
              labelField="name"
              valueField="id"
              value={meal.id}
              placeholder="Select item"
              autoScroll={false}
              showsVerticalScrollIndicator={true}
              onChange={(data) => {
                setMeal({ id: data.id, name: data.name });
              }}
              renderItem={renderItem}
            />
          </View>
        </View>
        <TouchableOpacity
          style={{
            marginTop: 20,
            marginLeft: "35%",
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: COLORS.darkGreen,
            height: 45,
            width: 120,
            borderRadius: 100,
          }}
          onPress={() => {
            handleSave();
          }}
        >
          <Text
            style={{
              color: COLORS.white,
              fontSize: 18,
            }}
          >
            Save
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default EditFavorite;

const styles = StyleSheet.create({
  dropdown: {
    borderRadius: 100,
    color: COLORS.black,
    paddingHorizontal: 10,
    width: "60%",
    height: 40,
    marginLeft: 20,
    backgroundColor: COLORS.lightGray,
  },
  icon: {
    marginRight: 5,
  },
  placeholderStyle: {
    color: COLORS.lightGray2,
    fontSize: 16,
  },
  selectedTextStyle: {
    fontSize: 16,
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
});
