import React, { useState } from "react";
import { View, Text, ScrollView, FlatList } from "react-native";
import { Card, Icon } from "react-native-elements";
import { connect } from "react-redux";
import { baseURL } from "../shared/baseUrl";
import { postFavorite } from "../redux/ActionCreator";

const mapStateToProps = (state) => {
  return {
    dishes: state.dishes,
    comments: state.comments,
    favorites: state.favorites,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    postFavorite: (dishID) => dispatch(postFavorite(dishID)),
  };
};

const RenderDish = ({ dish, favorite, onPress }) => {
  if (dish != null) {
    return (
      <Card
        featuredTitle={dish.name}
        image={{ uri: `${baseURL}${dish.image}` }}
      >
        <Text style={{ margin: 10 }}>{dish.description}</Text>
        <Icon
          raised
          reverse
          name={favorite ? "heart" : "heart-o"}
          type="font-awesome"
          color="#f50"
          onPress={() => {
            favorite ? console.log("Already Favorite") : onPress();
          }}
        />
      </Card>
    );
  }

  return <View></View>;
};

const RenderComments = ({ comments }) => {
  const renderCommentItem = ({ item, index }) => {
    return (
      <ScrollView>
        <View key={index} style={{ margin: 10 }}>
          <Text style={{ fontSize: 14 }}>{item.comment}</Text>
          <Text style={{ fontSize: 12 }}>{item.rating} Stars</Text>
          <Text style={{ fontSize: 12 }}>
            {"-- " + item.author + ", " + item.date}
          </Text>
        </View>
      </ScrollView>
    );
  };
  return (
    <Card title="Comments">
      <FlatList
        data={comments}
        renderItem={renderCommentItem}
        keyExtractor={(item) => item.id.toString()}
      />
    </Card>
  );
};

function DishDetailComponent({
  route,
  dishes,
  comments,
  postFavorite,
  favorites,
}) {
  const id = route.params.dishID
    ? route.params.dishID
    : route.params.dishID == 0
    ? 0
    : null;

  const markFavorite = (dishID) => {
    postFavorite(dishID);
  };

  return (
    <ScrollView>
      <RenderDish
        dish={dishes.dishes[+id]}
        favorite={favorites.some((el) => el === id)}
        onPress={() => markFavorite(id)}
      />
      <RenderComments
        comments={comments.comments.filter((comment) => comment.dishId === id)}
      />
    </ScrollView>
  );
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DishDetailComponent);
