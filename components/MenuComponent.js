import React from "react";
import { FlatList, View, StyleSheet } from "react-native";
import { ListItem } from "react-native-elements";

export default function MenuComponent(props) {
  const renderMenuItem = ({ item, index }) => (
    <ListItem
      key={index}
      title={item.name}
      subtitle={item.description}
      chevron={false}
      onPress={() => props.onPress(item.id)}
      leftAvatar={{ source: require("./images/uthappizza.png") }}
    />
  );
  const keyMenuItem = (item) => item.id.toString();

  return (
    <FlatList
      data={props.dishes}
      renderItem={renderMenuItem}
      keyExtractor={keyMenuItem}
    />
  );
}
