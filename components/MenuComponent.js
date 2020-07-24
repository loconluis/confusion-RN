import React,{ useState, useEffect }  from "react";
import { FlatList, View, StyleSheet } from "react-native";
import { ListItem } from "react-native-elements";
import { DISHES } from '../shared/dishes'

export default function MenuComponent(props) {
  let [dishes] = useState(DISHES) 
  // Navigation config
  const { navigate } = props.navigation;

  const renderMenuItem = ({ item, index }) => (
    <ListItem
      key={index}
      title={item.name}
      subtitle={item.description}
      chevron={false}
      onPress={() => navigate('Details', { dishID: item.id })}
      leftAvatar={{ source: require("./images/uthappizza.png") }}
    />
  );
  const keyMenuItem = (item) => item.id.toString();
  
  return (
    <FlatList
      data={dishes}
      renderItem={renderMenuItem}
      keyExtractor={keyMenuItem}
    />
  );
}
