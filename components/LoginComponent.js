import React, { useState, useEffect } from "react";
import { View, StyleSheet, Text, ScrollView, Image } from "react-native";
import { Icon, Input, CheckBox, Button } from "react-native-elements";
import * as SecureStore from "expo-secure-store";
import * as Permissions from "expo-permissions";
import * as ImagePicker from "expo-image-picker";
import { Asset } from "expo-asset";
import * as ImageManipulator from "expo-image-manipulator";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { baseURL } from "../shared/baseUrl";

const Tab = createBottomTabNavigator();

function LoginComponent(props) {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [remberMe, setRemeberMe] = useState(false);

  useEffect(() => {
    SecureStore.getItemAsync("userinfo").then((userData) => {
      let userinfo = JSON.parse(userData);
      if (userinfo) {
        setUserName(userinfo.userName);
        setPassword(userinfo.password);
        setRemeberMe(true);
      }
    });
  }, []);

  const handleLogin = () => {
    if (remberMe) {
      SecureStore.setItemAsync(
        "userinfo",
        JSON.stringify({ userName, password })
      ).catch((err) => console.log("Could not save userinfo", err));
    } else {
      SecureStore.deleteItemAsync("userinfo")
        .then((res) => initialState())
        .catch((err) => console.log("Could not delete userinfo", err));
    }
  };

  const toggleCheckBox = () => {
    setRemeberMe(!remberMe);
  };

  const initialState = () => {
    setUserName("");
    setPassword("");
    setRemeberMe(false);
  };
  return (
    <View style={style.container}>
      <Input
        placeholder="Username"
        leftIcon={{ type: "font-awesome", name: "user-o" }}
        onChangeText={(username) => setUserName(username)}
        value={userName}
        containerStyle={style.formInput}
      />
      <Input
        placeholder="Password"
        leftIcon={{ type: "font-awesome", name: "key" }}
        onChangeText={(pwd) => setPassword(pwd)}
        value={password}
        type="password"
        containerStyle={style.formInput}
      />
      <CheckBox
        title="Remeber Me"
        center
        checked={remberMe}
        onPress={toggleCheckBox}
        containerStyle={style.formCheckBox}
      />
      <View style={style.formButton}>
        <Button
          onPress={handleLogin}
          title="Login"
          icon={
            <Icon
              name="sign-in"
              type="font-awesome"
              size={24}
              color="white"
              style={{ paddingRight: 5 }}
            />
          }
          buttonStyle={{ backgroundColor: "#512DA8" }}
        />
      </View>
      <View style={style.formButton}>
        <Button
          onPress={() => props.navigation.navigate("Register")}
          clear
          titleStyle={{ color: "blue" }}
          title="Register"
          icon={
            <Icon
              name="user-plus"
              type="font-awesome"
              size={24}
              color="blue"
              style={{ paddingRight: 5 }}
            />
          }
          buttonStyle={{ backgroundColor: "transparent" }}
        />
      </View>
    </View>
  );
}

function RegisterComponent() {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [remberMe, setRemeberMe] = useState(false);
  const [firstName, setFirstName] = useState();
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [imageURL, setImageURL] = useState(`${baseURL}images/logo.png`);

  const handleRegister = () => {};

  const getImageFromCamera = async () => {
    const cameraPermission = await Permissions.askAsync(Permissions.CAMERA);
    const cameraRollPermission = await Permissions.askAsync(
      Permissions.CAMERA_ROLL
    );

    if (
      cameraPermission.status === "granted" &&
      cameraRollPermission.status === "granted"
    ) {
      let capturedImage = await ImagePicker.launchCameraAsync({
        allowsEditing: true,
        aspect: [4, 3],
      });

      if (!capturedImage.cancelled) {
        processImage(capturedImage.uri);
      }
    }
  };

  const processImage = async (imageURI) => {
    let processedImage = await ImageManipulator.manipulateAsync(
      imageURI,
      [{ resize: { width: 400 } }],
      { format: "png" }
    );
    setImageURL(processedImage.uri);
  };

  const toggleCheckBox = () => {
    setRemeberMe(!remberMe);
  };

  const initialState = () => {
    setUserName("");
    setPassword("");
    setRemeberMe(false);
    setFirstName("");
    setLastName("");
    setEmail("");
    setImageURL(`${baseURL}images/logo.png`);
  };

  return (
    <ScrollView contentContainerStyle={style.container}>
      <View style={style.imageContainer}>
        <Image
          source={{ uri: imageURL }}
          loadingIndicatorSource={require("./images/logo.png")}
          style={style.image}
        />
        <Button title="Camera" onPress={() => getImageFromCamera()} />
      </View>
      <Input
        placeholder="Username"
        leftIcon={{ type: "font-awesome", name: "user-o" }}
        onChangeText={(username) => setUserName(username)}
        value={userName}
        containerStyle={style.formInput}
      />
      <Input
        placeholder="Password"
        leftIcon={{ type: "font-awesome", name: "key" }}
        onChangeText={(pwd) => setPassword(pwd)}
        value={password}
        type="password"
        containerStyle={style.formInput}
      />
      <Input
        placeholder="First Name"
        leftIcon={{ type: "font-awesome", name: "user-o" }}
        onChangeText={(firstName) => setFirstName(firstName)}
        value={firstName}
        containerStyle={style.formInput}
      />
      <Input
        placeholder="Last Name"
        leftIcon={{ type: "font-awesome", name: "user-o" }}
        onChangeText={(lastName) => setLastName(lastName)}
        value={lastName}
        containerStyle={style.formInput}
      />
      <Input
        placeholder="Email"
        leftIcon={{ type: "font-awesome", name: "envelope-o" }}
        onChangeText={(email) => setEmail(email)}
        value={email}
        containerStyle={style.formInput}
      />
      <CheckBox
        title="Remeber Me"
        center
        checked={remberMe}
        onPress={toggleCheckBox}
        containerStyle={style.formCheckBox}
      />
      <View style={style.formButton}>
        <Button
          onPress={handleRegister}
          title="Register"
          buttonStyle={{ backgroundColor: "#512DA8" }}
          icon={
            <Icon
              name="user-plus"
              type="font-awesome"
              color="white"
              size={24}
            />
          }
        />
      </View>
    </ScrollView>
  );
}

export default function LoginComoponentNavigator() {
  return (
    <Tab.Navigator
      tabBarOptions={{
        activeBackgroundColor: "#9575CD",
        inactiveBackgroundColor: "#D1C4E9",
        activeTintColor: "white",
        inactiveTintColor: "gray",
      }}
      initialRouteName="Login"
    >
      <Tab.Screen
        name="Login"
        component={LoginComponent}
        options={{
          tabBarLabel: "Login",
          color: "#512DA8",
          tabBarIcon: () => (
            <Icon
              name="sign-in"
              type="font-awesome"
              size={24}
              iconStyle={{ color: "#512DA8" }}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Register"
        component={RegisterComponent}
        options={{
          tabBarLabel: "Register",
          color: "#512DA8",
          tabBarIcon: () => (
            <Icon
              name="user-plus"
              type="font-awesome"
              size={24}
              iconStyle={{ color: "#512DA8" }}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

const style = StyleSheet.create({
  container: {
    justifyContent: "center",
    margin: 20,
  },
  imageContainer: {
    flex: 1,
    flexDirection: "row",
    margin: 20,
  },
  image: {
    margin: 10,
    width: 80,
    height: 60,
  },
  formInput: {
    marginTop: 20,
    marginBottom: 40,
  },
  formCheckBox: {
    margin: 20,
    backgroundColor: null,
  },
  formButton: {
    margin: 60,
  },
});
