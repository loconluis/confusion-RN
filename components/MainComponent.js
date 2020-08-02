import React, { useEffect } from "react";
import {
  Platform,
  Image,
  StyleSheet,
  ScrollView,
  View,
  Text,
} from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import {
  createDrawerNavigator,
  // DrawerContentScrollView,
  DrawerItemList,
} from "@react-navigation/drawer";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { Icon } from "react-native-elements";
import Constants from "expo-constants";
import { connect } from "react-redux";
import {
  fetchComments,
  fetchDishes,
  fetchLeaders,
  fetchPromos,
} from "../redux/ActionCreator";
import Home from "./HomeComponent";
import Menu from "./MenuComponent";
import DishDetail from "./DishDetailComponent";
import About from "./AboutComponent";
import Contact from "./ContactComponent";
import Reservation from "./ReservationComponent";

const mapDispatchToProps = (dispatch) => {
  return {
    fetchDishes: () => dispatch(fetchDishes()),
    fetchComments: () => dispatch(fetchComments()),
    fetchLeaders: () => dispatch(fetchLeaders()),
    fetchPromos: () => dispatch(fetchPromos()),
  };
};

const MenuNavigator = createStackNavigator();
const HomeNavigator = createStackNavigator();
const AboutNavigator = createStackNavigator();
const ContactNavigator = createStackNavigator();
const ReservationNavigator = createStackNavigator();
const MainNavigator = createDrawerNavigator();

function HomeNavigatorComponent(props) {
  const navigationOptions = {
    headerLeft: () => {
      return (
        <Icon
          name="menu"
          size={24}
          color="white"
          style={{ paddingLeft: 15 }}
          onPress={() => props.navigation.toggleDrawer()}
        />
      );
    },
  };
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
      <HomeNavigator.Screen
        name="Home"
        component={Home}
        options={navigationOptions}
      />
    </HomeNavigator.Navigator>
  );
}

function MenuNavigatorComponent(props) {
  const navigationOptions = {
    headerLeft: () => {
      return (
        <Icon
          name="menu"
          size={24}
          color="white"
          style={{ paddingLeft: 15 }}
          onPress={() => props.navigation.toggleDrawer()}
        />
      );
    },
  };
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
      <MenuNavigator.Screen
        name="Menu"
        component={Menu}
        options={navigationOptions}
      />
      <MenuNavigator.Screen name="Details" component={DishDetail} />
    </MenuNavigator.Navigator>
  );
}

function AboutNavigatorComponent(props) {
  const navigationOptions = {
    headerLeft: () => {
      return (
        <Icon
          name="menu"
          size={24}
          color="white"
          style={{ paddingLeft: 15 }}
          onPress={() => props.navigation.toggleDrawer()}
        />
      );
    },
  };
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
      <AboutNavigator.Screen
        name="About Us"
        component={About}
        options={navigationOptions}
      />
    </AboutNavigator.Navigator>
  );
}

function ContactNavigatorComponent(props) {
  const navigationOptions = {
    headerLeft: () => {
      return (
        <Icon
          name="menu"
          size={24}
          color="white"
          style={{ paddingLeft: 15 }}
          onPress={() => props.navigation.toggleDrawer()}
        />
      );
    },
  };
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
      <ContactNavigator.Screen
        name="Contact Us"
        component={Contact}
        options={navigationOptions}
      />
    </ContactNavigator.Navigator>
  );
}

function ReservationNavigatorComponent(props) {
  const navigationOptions = {
    headerLeft: () => {
      return (
        <Icon
          name="menu"
          size={24}
          color="white"
          style={{ paddingLeft: 15 }}
          onPress={() => props.navigation.toggleDrawer()}
        />
      );
    },
  };
  return (
    <ReservationNavigator.Navigator
      screenOptions={{
        initialRouteName: "Reservation",
        headerStyle: {
          backgroundColor: "#512DA8",
        },
        headerTintColor: "#fff",
        headerTitleStyle: {
          color: "#fff",
        },
      }}
    >
      <ReservationNavigator.Screen
        name="Reservation"
        component={Reservation}
        options={navigationOptions}
      />
    </ReservationNavigator.Navigator>
  );
}

function CustomDrawerComponent(props) {
  return (
    <ScrollView {...props}>
      <SafeAreaView style={style.container}>
        <View style={style.drawerHeader}>
          <View style={{ flex: 1 }}>
            <Image
              source={require("./images/logo.png")}
              style={style.drawerImage}
            />
          </View>
          <View style={{ flex: 2 }}>
            <Text style={style.drawerHeaderText}>Ristorante Con Fusion</Text>
          </View>
        </View>
        <DrawerItemList {...props} />
      </SafeAreaView>
    </ScrollView>
  );
}

function MainComponent(props) {
  useEffect(() => {
    props.fetchComments();
    props.fetchDishes();
    props.fetchLeaders();
    props.fetchPromos();
  });

  return (
    <SafeAreaProvider>
      <NavigationContainer
        style={{
          flex: 1,
          paddingTop: Platform.OS === "ios" ? 0 : Constants.statusBarHeight,
        }}
      >
        <MainNavigator.Navigator
          initialRouteName={"Home"}
          drawerContentOptions={{ backgroundColor: "#D1C4E9" }}
          drawerContent={(props) => <CustomDrawerComponent {...props} />}
        >
          <MainNavigator.Screen
            component={HomeNavigatorComponent}
            name={"Home"}
            options={{
              title: "Home",
              drawerLabel: "Home",
              drawerIcon: ({ color }) => (
                <Icon name="home" type="font-awesome" size={24} color={color} />
              ),
            }}
          />
          <MainNavigator.Screen
            component={MenuNavigatorComponent}
            name={"Menu"}
            options={{
              title: "Menu",
              drawerLabel: "Menu",
              drawerIcon: ({ color }) => (
                <Icon name="list" type="font-awesome" size={24} color={color} />
              ),
            }}
          />
          <MainNavigator.Screen
            component={AboutNavigatorComponent}
            name={"About Us"}
            options={{
              title: "About Us",
              drawerLabel: "About Us",
              drawerIcon: ({ color }) => (
                <Icon
                  name="info-circle"
                  type="font-awesome"
                  size={24}
                  color={color}
                />
              ),
            }}
          />
          <MainNavigator.Screen
            component={ReservationNavigatorComponent}
            name={"Reservation"}
            options={{
              title: "Reservation",
              drawerLabel: "Reservation",
              drawerIcon: ({ color }) => (
                <Icon
                  name="address-card-o"
                  type="font-awesome"
                  size={22}
                  color={color}
                />
              ),
            }}
          />
          <MainNavigator.Screen
            component={ContactNavigatorComponent}
            name={"Contact Us"}
            options={{
              title: "Contact Us",
              drawerLabel: "Contact Us",
              drawerIcon: ({ color }) => (
                <Icon
                  name="address-card"
                  type="font-awesome"
                  size={22}
                  color={color}
                />
              ),
            }}
          />
        </MainNavigator.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}

const style = StyleSheet.create({
  container: {
    flex: 1,
  },
  drawerHeader: {
    backgroundColor: "#512DA8",
    height: 140,
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
    flexDirection: "row",
  },
  drawerHeaderText: {
    color: "white",
    fontSize: 24,
    fontWeight: "bold",
  },
  drawerImage: {
    margin: 10,
    width: 80,
    height: 60,
  },
});

export default connect(undefined, mapDispatchToProps)(MainComponent);
