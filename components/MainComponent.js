import React from "react";
import { Platform } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import Constants from "expo-constants";
import Menu from "./MenuComponent";
import DishDetail from "./DishDetailComponent";

const Stack = createStackNavigator();

export default function MainComponent(props) {
  return (
    <NavigationContainer
      style={{
        flex: 1,
        paddingTop: Platform.OS === "ios" ? 0 : Constants.statusBarHeight,
      }}
    >
      <Stack.Navigator
        screenOptions={{
          initialRouteName: 'Menu',
          headerStyle: {
            backgroundColor: "#512DA8",
          },
          headerTintColor: "#fff",
          headerTitleStyle: {
            color: "#fff",
          },
        }}
      >
        <Stack.Screen name="Menu" component={Menu} />
        <Stack.Screen name="Details" component={DishDetail} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
