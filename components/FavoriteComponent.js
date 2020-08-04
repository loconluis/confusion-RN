import React, { Component } from "react";
import { Text, View, FlatList } from "react-native";
import { ListItem } from "react-native-elements";
import { connect } from "react-redux";
import { baseURL } from "../shared/baseUrl";
import Loading from "./LoadingComponent";

const mapStateToPros = (state) => {
  return {
    dishes: state.dishes,
    favorites: state.favorites || [],
  };
};

const FavoriteComponent = (props) => {
  const { navigate } = props.navigation;

  const renderMenuItem = ({ item, index }) => {
    return (
      <ListItem
        key={index}
        title={item.name}
        subtitle={item.description}
        chevron={false}
        onPress={() => navigate("Details", { dishID: item.id })}
        leftAvatar={{ source: {uri: `${baseURL}${item.image}` }}}
      />
    );
  };

  if (props.isLoading) {
    return <Loading />;
  } else if (props.errMess) {
    return (
      <View>
        <Text>{props.errMess}</Text>
      </View>
    );
  }
  return (
    <FlatList
      data={props.dishes.dishes.filter((dish) =>
        props.favorites.some((el) => el === dish.id)
      )}
      renderItem={renderMenuItem}
      keyExtractor={item => item.id.toString()}
    />
  );
};

export default connect(mapStateToPros)(FavoriteComponent);
