import React from "react";
import { Platform } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createDrawerNavigator } from "@react-navigation/drawer";
import Constants from "expo-constants";
import Home from "./HomeComponent";
import Menu from "./MenuComponent";
import DishDetail from "./DishDetailComponent";
import About from "./AboutComponent";
import Contact from "./ContactComponent";

/**
 * Im using new API from React-Navigation
 * the declaration of is kinda different 
 * from the version used in this project
 */
const MenuNavigator = createStackNavigator();
const HomeNavigator = createStackNavigator();
const AboutNavigator = createStackNavigator();
const ContactNavigator = createStackNavigator();
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

function AboutNavigatorComponent(props) {
  return (
    <AboutNavigator.Navigator
      screenOptions={{
        initialRouteName: "About Us",
        headerStyle: {
          backgroundColor: "#512DA8",
        },
        headerTintColor: "#fff",
        headerTitleStyle: {
          color: "#fff",
        },
      }}
    >
      <AboutNavigator.Screen name="About Us" component={About} />
    </AboutNavigator.Navigator>
  );
}

function ContactNavigatorComponent(props) {
  return (
    <ContactNavigator.Navigator
      screenOptions={{
        initialRouteName: "Contact Us",
        headerStyle: {
          backgroundColor: "#512DA8",
        },
        headerTintColor: "#fff",
        headerTitleStyle: {
          color: "#fff",
        },
      }}
    >
      <ContactNavigator.Screen name="Contact Us" component={Contact} />
    </ContactNavigator.Navigator>
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
        <MainNavigator.Screen
          component={AboutNavigatorComponent}
          name={"About Us"}
          options={{
            title: "About Us",
            drawerLabel: "About Us",
          }}
        />
        <MainNavigator.Screen
          component={ContactNavigatorComponent}
          name={"Contact Us"}
          options={{
            title: "Contact Us",
            drawerLabel: "Contact Us",
          }}
        />
      </MainNavigator.Navigator>
    </NavigationContainer>
  );
}
