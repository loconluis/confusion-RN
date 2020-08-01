import React, { Component } from "react";
import { ActivityIndicator, StyleSheet, Text, View } from "react-native";

const style = StyleSheet.create({
  loadingView: {
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
  },
  loadingText: {
    color: "#512DA8",
    fontSize: 14,
    fontWeight: "bold",
  },
});

export default class LoadingComponent extends Component {
  render() {
    console.log("me llamo LOADING");
    return (
      <View style={style.View}>
        <ActivityIndicator size="large" color="#512DA8">
          <Text style={style.loadingText}> Loading ... </Text>
        </ActivityIndicator>
      </View>
    );
  }
}
