import React from "react";
import { FlatList } from "react-native";
import { Tile } from "react-native-elements";
import * as Animatable from "react-native-animatable";
import { connect } from "react-redux";
import { baseURL } from "../shared/baseUrl";

const mapStateToProps = (state) => {
  return {
    dishes: state.dishes,
  };
};
function MenuComponent(props) {
  // Navigation config
  const { navigate } = props.navigation;

  const renderMenuItem = ({ item, index }) => (
    <Animatable.View animation="fadeInRightBig" duration={2000} delay={1000}>
      <Tile
        key={index}
        title={item.name}
        caption={item.description}
        featured
        onPress={() => navigate("Details", { dishID: item.id })}
        imageSrc={{ uri: `${baseURL}${item.image}` }}
      />
    </Animatable.View>
  );
  const keyMenuItem = (item) => item.id.toString();

  return (
    <FlatList
      data={props.dishes.dishes}
      renderItem={renderMenuItem}
      keyExtractor={keyMenuItem}
    />
  );
}

export default connect(mapStateToProps)(MenuComponent);
