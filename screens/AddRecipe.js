import React, { useCallback, useEffect, useState } from "react";
import { Image, Text, TouchableOpacity, View, TextInput } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { SafeAreaView } from "react-native-safe-area-context";
import { COLORS, icons, images } from "../constants";
import { Dropdown } from "react-native-element-dropdown";
import { StyleSheet } from "react-native";
import * as ImagePicker from "expo-image-picker";
import Toast from "react-native-toast-message";
import { auth, db, storage } from "../firebase/firebase.config";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { useFocusEffect } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";

const AddRecipe = ({ navigation, route }) => {
  const params = route.params;
  const [listIngredient, setListIngredient] = useState([]);
  const [listCategory, setListCategory] = useState([]);

  const [userId, setUserId] = useState(null);

  const [recipeIngredients, setRecipeIngredients] = useState([
    { ingredient: null, amount: "" },
  ]);

  const [picture, setPicture] = useState(null);

  const [name, setName] = useState("");
  const [servingSize, setServingSize] = useState(null);
  const [servingTime, setServingTime] = useState(null);
  const [category, setCategory] = useState(null);

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

  useEffect(() => {
    if (params) {
      setName(params?.recipe?.name);
      setServingSize(params?.recipe?.servingSize);
      setServingTime(params?.recipe?.servingTime);
      setCategory(params?.recipe?.category);
      setRecipeIngredients(params?.recipe?.ingredients);
    }
  }, []);

  const uploadImage = async () => {
    //convert image to blob image
    const blobImage = await new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.onload = function () {
        resolve(xhr.response);
      };
      xhr.onerror = function () {
        reject(new TypeError("Network request failed"));
      };
      xhr.responseType = "blob";
      xhr.open("GET", picture, true);
      xhr.send(null);
    });
    try {
      const storageRef = ref(storage, `recipeImages/image-${Date.now()}`);
      const result = await uploadBytes(storageRef, blobImage);

      blobImage.close();
      return await getDownloadURL(storageRef);
    } catch (err) {
      console.log(err);
    }
  };

  const showErrorToast = (error) => {
    Toast.show({
      type: "error",
      text1: error,
      visibilityTime: 3000,
    });
  };

  const showSuccessToast = (text) => {
    Toast.show({
      type: "success",
      text1: `Successfully ${text} !`,
      text2: "View your recipes",
      visibilityTime: 3000,
      onPress: () => {
        navigation.navigate("CreatedRecipe");
      },
    });
  };

  const isDuplicateIngredient = (arr) => {
    var valueArr = arr.map(function (item) {
      return item.ingredient;
    });
    var isDuplicate = valueArr.some(function (item, idx) {
      return valueArr.indexOf(item) != idx;
    });

    return isDuplicate;
  };

  const checkNullIngredients = () => {
    return recipeIngredients.some((item) => !item.ingredient || !item.amount);
  };

  const validate = () => {
    if (!name || !servingSize || !servingTime || !category) {
      showErrorToast("Please fill all the field !");
      return false;
    }

    if (isNaN(servingSize)) {
      showErrorToast("Serving size must be number");
      return false;
    }

    if (isNaN(servingTime)) {
      showErrorToast("Serving time must be number");
      return false;
    }

    if (checkNullIngredients()) {
      showErrorToast("Please fill all the field !");
      return false;
    }
    if (isDuplicateIngredient(recipeIngredients)) {
      showErrorToast("Ingredient cannot be duplicated !");
      return false;
    }
    if (!picture && !params) {
      showErrorToast("Please upload recipe image !");
      return false;
    }

    return true;
  };

  useEffect(() => {
    fetch("https://recipeapp-6vxr.onrender.com/ingredient")
      .then((res) => res.json())
      .then((data) => {
        setListIngredient(data);
      })
      .catch((err) => console.log(err));
    fetch("https://recipeapp-6vxr.onrender.com/category")
      .then((res) => res.json())
      .then((data) => {
        setListCategory(data);
      })
      .catch((err) => console.log(err));
  }, []);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
      maxWidth: 900,
      maxHeight: 900,
    });

    if (!result.canceled) {
      setPicture(result.assets[0].uri);
    }
  };

  const renderItem = (item) => {
    return (
      <View style={{ padding: 10, backgroundColor: "white" }}>
        <Text style={{ fontSize: 14 }}>{item.name}</Text>
      </View>
    );
  };

  return (
    <SafeAreaView
      style={{ padding: 20, backgroundColor: COLORS.white, flex: 1 }}
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
          <Text style={{ fontSize: 20, fontWeight: 600 }}>
            Create Your Recipe
          </Text>
        </View>

        {/* {error && (
          <View
            style={{
              flex: 1,
              alignItems: "center",
              justifyContent: "center",
              marginTop: 20,
              marginBottom: 10,
            }}
          >
            <Text style={{ fontSize: 20, color: "red", fontWeight: 600 }}>
              {error}
            </Text>
          </View>
        )} */}

        <TouchableOpacity onPress={pickImage}>
          <View
            style={{
              backgroundColor: COLORS.lightGray,
              marginVertical: 20,
              height: 200,
              flex: 1,
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            {params ? (
              !picture ? (
                <Image
                  style={{ width: "100%", height: "100%" }}
                  resizeMode="cover"
                  source={{ uri: params?.recipe?.img }}
                />
              ) : (
                <Image
                  style={{ width: "100%", height: "100%" }}
                  resizeMode="cover"
                  source={{ uri: picture }}
                />
              )
            ) : picture ? (
              <Image
                style={{ width: "100%", height: "100%" }}
                resizeMode="cover"
                source={{ uri: picture }}
              />
            ) : (
              <Text style={{ fontSize: 17, color: COLORS.gray }}>
                Upload recipe image
              </Text>
            )}
          </View>
        </TouchableOpacity>

        <View
          style={{
            marginTop: 10,
            flex: 1,
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Text style={{ fontSize: 20, fontWeight: 500 }}>Recipe name:</Text>
          <TextInput
            onChangeText={(name) => setName(name)}
            value={name}
            style={{
              borderRadius: 100,
              color: COLORS.black,
              paddingHorizontal: 10,
              width: "60%",
              height: "100%",
              backgroundColor: COLORS.lightGray,
              marginVertical: 9,
            }}
            placeholder="Name"
          />
        </View>
        <View
          style={{
            marginTop: 10,
            flex: 1,
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Text style={{ fontSize: 20, fontWeight: 500 }}>Serving time:</Text>
          <TextInput
            value={servingTime && servingTime + ""}
            onChangeText={(time) => setServingTime(time)}
            style={{
              borderRadius: 100,
              color: COLORS.black,
              paddingHorizontal: 10,
              width: "60%",
              height: "100%",
              backgroundColor: COLORS.lightGray,
              marginVertical: 9,
            }}
            placeholder="Serving time (min)"
          />
        </View>
        <View
          style={{
            marginTop: 10,
            flex: 1,
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Text style={{ fontSize: 20, fontWeight: 500 }}>Serving size:</Text>
          <TextInput
            value={servingSize && servingSize + ""}
            onChangeText={(size) => setServingSize(size)}
            style={{
              borderRadius: 100,
              color: COLORS.black,
              paddingHorizontal: 10,
              width: "60%",
              height: "100%",
              backgroundColor: COLORS.lightGray,
              marginVertical: 9,
            }}
            placeholder="Serving size"
          />
        </View>
        <View
          style={{
            marginTop: 10,
            flex: 1,
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Text style={{ fontSize: 20, fontWeight: 500 }}>Category:</Text>
          <Dropdown
            style={styles.dropdown}
            placeholderStyle={styles.placeholderStyle}
            selectedTextStyle={styles.selectedTextStyle}
            inputSearchStyle={styles.inputSearchStyle}
            iconStyle={styles.iconStyle}
            data={listCategory}
            maxHeight={300}
            labelField="name"
            valueField="_id"
            placeholder="Select category"
            searchPlaceholder="Search..."
            search
            value={category}
            autoScroll={false}
            showsVerticalScrollIndicator={true}
            onChange={(data) => {
              setCategory(data._id);
            }}
            renderItem={renderItem}
          />
        </View>
        {recipeIngredients.map((item, index) => (
          <View
            style={{
              marginTop: 20,
              marginBottom: 20,
            }}
          >
            <Text style={{ fontSize: 20, fontWeight: 700, marginBottom: 20 }}>
              Ingredient {index + 1}:
            </Text>
            <View
              style={{ padding: 20, borderColor: COLORS.black, borderWidth: 1 }}
            >
              <View
                style={{
                  flex: 1,
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <Text style={{ fontSize: 20, fontWeight: 500 }}>
                  Ingredient:
                </Text>
                <Dropdown
                  style={styles.dropdown}
                  placeholderStyle={styles.placeholderStyle}
                  selectedTextStyle={styles.selectedTextStyle}
                  inputSearchStyle={styles.inputSearchStyle}
                  iconStyle={styles.iconStyle}
                  data={listIngredient}
                  maxHeight={300}
                  labelField="name"
                  valueField="_id"
                  placeholder="Select item"
                  searchPlaceholder="Search..."
                  search
                  value={item.ingredient}
                  autoScroll={false}
                  showsVerticalScrollIndicator={true}
                  onChange={(data) => {
                    const newIngredients = recipeIngredients.map((item, i) => {
                      if (i === index) {
                        return { ...item, ingredient: data._id };
                      }
                      return item;
                    });
                    setRecipeIngredients(newIngredients);
                  }}
                  renderItem={renderItem}
                />
              </View>
              <View
                style={{
                  marginTop: 10,
                  flex: 1,
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <Text style={{ fontSize: 20, fontWeight: 500 }}>Amount:</Text>
                <TextInput
                  style={{
                    borderRadius: 100,
                    color: COLORS.black,
                    paddingHorizontal: 10,
                    width: "60%",
                    height: "100%",
                    backgroundColor: COLORS.lightGray,
                    marginVertical: 9,
                  }}
                  value={item.amount}
                  onChangeText={(data) => {
                    const newIngredients = recipeIngredients.map((item, i) => {
                      if (i === index) {
                        return { ...item, amount: data };
                      }
                      return item;
                    });
                    setRecipeIngredients(newIngredients);
                  }}
                  placeholder="Amount"
                />
              </View>

              {recipeIngredients.length > 1 && (
                <TouchableOpacity
                  style={{
                    alignItems: "center",
                    justifyContent: "center",
                    height: 35,
                    width: 100,
                    alignSelf: "center",
                    marginTop: 20,
                    borderWidth: 1,
                    borderColor: COLORS.lightGray,
                    backgroundColor: COLORS.black,
                  }}
                  onPress={() => {
                    setRecipeIngredients(
                      recipeIngredients.filter((recipe, i) => i !== index)
                    );
                  }}
                >
                  <Text style={{ color: COLORS.white }}>Remove</Text>
                </TouchableOpacity>
              )}
            </View>
          </View>
        ))}

        <TouchableOpacity
          style={{
            alignItems: "center",
            justifyContent: "center",
            height: 35,
            width: 35,

            borderWidth: 1,
            borderColor: COLORS.lightGray,
            backgroundColor: COLORS.black,
          }}
          onPress={() => {
            const newIngredient = {
              ingredient: null,
              amount: "",
            };
            setRecipeIngredients([...recipeIngredients, newIngredient]);
          }}
        >
          <Image
            source={icons.plus}
            style={{
              width: 15,
              height: 15,
              tintColor: COLORS.white,
            }}
          />
        </TouchableOpacity>
        {params ? (
          <View
            style={{
              marginTop: 20,
              flex: 1,
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <TouchableOpacity
              style={{
                alignItems: "center",
                justifyContent: "center",
                height: 35,
                width: 120,

                borderWidth: 1,
                borderColor: COLORS.lightGray,
                backgroundColor: COLORS.black,
              }}
              onPress={async () => {
                if (validate()) {
                  let data;
                  if (picture) {
                    const url = await uploadImage();
                    data = {
                      name: name,
                      servingSize: servingSize,
                      servingTime: servingTime,
                      img: url,
                      category: category,
                      ingredients: recipeIngredients,
                    };
                  } else {
                    data = {
                      name: name,
                      servingSize: servingSize,
                      servingTime: servingTime,
                      category: category,
                      ingredients: recipeIngredients,
                    };
                  }
                  fetch(
                    `https://recipeapp-6vxr.onrender.com/recipe/${params.recipe._id}`,
                    {
                      method: "Put",
                      headers: {
                        "Content-Type": "application/json",
                      },
                      body: JSON.stringify(data),
                    }
                  )
                    .then((res) => res.json())
                    .then((data) => {
                      console.log(data);
                      showSuccessToast("edited");
                    })
                    .catch((err) => console.log(err));
                }
              }}
            >
              <Text style={{ color: COLORS.white }}>Edit</Text>
            </TouchableOpacity>
          </View>
        ) : (
          <View
            style={{
              marginTop: 20,
              flex: 1,
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <TouchableOpacity
              style={{
                alignItems: "center",
                justifyContent: "center",
                height: 35,
                width: 120,

                borderWidth: 1,
                borderColor: COLORS.lightGray,
                backgroundColor: COLORS.black,
              }}
              onPress={async () => {
                if (validate()) {
                  const url = await uploadImage();
                  const data = {
                    name: name,
                    servingSize: servingSize,
                    servingTime: servingTime,
                    img: url,
                    category: category,
                    ingredients: recipeIngredients,
                  };
                  fetch(
                    `https://recipeapp-6vxr.onrender.com/recipe/${userId}`,
                    {
                      method: "POST",
                      headers: {
                        "Content-Type": "application/json",
                      },
                      body: JSON.stringify(data),
                    }
                  )
                    .then((res) => res.json())
                    .then((data) => {
                      showSuccessToast("created");
                    })
                    .catch((err) => console.log(err));
                }
              }}
            >
              <Text style={{ color: COLORS.white }}>Create</Text>
            </TouchableOpacity>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

export default AddRecipe;

const styles = StyleSheet.create({
  dropdown: {
    borderRadius: 100,
    color: COLORS.black,
    paddingHorizontal: 10,
    width: "60%",
    height: 50,
    backgroundColor: COLORS.lightGray,
  },
  icon: {
    marginRight: 5,
  },
  placeholderStyle: {
    color: COLORS.lightGray2,
    fontSize: 14,
  },
  selectedTextStyle: {
    fontSize: 14,
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  inputSearchStyle: {
    height: 30,
    fontSize: 14,
  },
});
