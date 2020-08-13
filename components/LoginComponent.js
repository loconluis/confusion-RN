import React, { useState, useEffect } from "react";
import { View, Button, StyleSheet } from "react-native";
import { Card, Icon, Input, CheckBox } from "react-native-elements";
import * as SecureStore from "expo-secure-store";

export default function LoginComponent() {
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
      SecureStore.deleteItemAsync("userinfo").then(res => initialState()).catch((err) =>
        console.log("Could not delete userinfo", err)
      );
    }
  };

  const toggleCheckBox = () => {
    setRemeberMe(!remberMe)
  }

  const initialState = () => {
    setUserName("")
    setPassword("")
    setRemeberMe(false)
  }
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
        type='password'
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
        <Button onPress={handleLogin} title="Login" color="#512DA8" />
      </View>
    </View>
  );
}

const style = StyleSheet.create({
  container: {
    justifyContent: "center",
    margin: 20,
  },
  formInput: {
    marginTop: 40,
    marginBottom: 40,
  },
  formCheckBox: {
    margin: 40,
    backgroundColor: null,
  },
  formButton: {
    margin: 60,
  },
});
