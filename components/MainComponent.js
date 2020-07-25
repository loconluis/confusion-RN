import React from "react";
import { Platform } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createDrawerNavigator } from "@react-navigation/drawer";
import Constants from "expo-constants";
import Home from "./HomeComponent";
import Menu from "./MenuComponent";
import DishDetail from "./DishDetailComponent";

const MenuNavigator = createStackNavigator();
const HomeNavigator = createStackNavigator();
const MainNavigator = createDrawerNavigator();

function HomeNavigatorComponent(props) {
  return (
    <HomeNavigator.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: "#512DA8",
        },
        headerTintColor: "#fff",
        headerTitleStyle: {
          color: "#fff",
        },
      }}
    >
      <HomeNavigator.Screen name="Home" component={Home} />
    </HomeNavigator.Navigator>
  );
}

function MenuNavigatorComponent(props) {
  return (
    <MenuNavigator.Navigator
      screenOptions={{
        initialRouteName: "Menu",
        headerStyle: {
          backgroundColor: "#512DA8",
        },
        headerTintColor: "#fff",
        headerTitleStyle: {
          color: "#fff",
        },
      }}
    >
      <MenuNavigator.Screen name="Menu" component={Menu} />
      <MenuNavigator.Screen name="Details" component={DishDetail} />
    </MenuNavigator.Navigator>
  );
}

export default function MainComponent(props) {
  return (
    <NavigationContainer
      style={{
        flex: 1,
        paddingTop: Platform.OS === "ios" ? 0 : Constants.statusBarHeight,
      }}
    >
      <MainNavigator.Navigator
        initialRouteName={"Home"}
        drawerContentOptions={{ backgroundColor: "#D1C4E9" }}
      >
        <MainNavigator.Screen
          component={HomeNavigatorComponent}
          name={"Home"}
          options={{
            title: "Home",
            drawerLabel: "Home",
          }}
        />
        <MainNavigator.Screen
          component={MenuNavigatorComponent}
          name={"Menu"}
          options={{
            title: "Menu",
            drawerLabel: "Menu",
          }}
        />
      </MainNavigator.Navigator>
    </NavigationContainer>
  );
}
