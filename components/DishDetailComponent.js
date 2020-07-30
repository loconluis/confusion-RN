import React, { useState } from "react";
import { View, Text, ScrollView, FlatList } from "react-native";
import { Card, Icon } from "react-native-elements";
import { DISHES } from "../shared/dishes";
import { COMMENTS } from "../shared/comments";

const RenderDish = ({ dish, favorite, onPress }) => {
  if (dish != null) {
    return (
      <Card
        featuredTitle={dish.name}
        image={require("./images/uthappizza.png")}
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

export default function DishDetailComponent({ route }) {
  const [dishes] = useState(DISHES);
  const [comments] = useState(COMMENTS);
  const [favorites, setFavorites] = useState([]);
  const id = route.params.dishID
    ? route.params.dishID
    : route.params.dishID == 0
    ? 0
    : null;

  const markFavorite = (dishID) => {
    setFavorites(favorites.concat(dishID));
  };

  return (
    <ScrollView>
      <RenderDish
        dish={dishes[+id]}
        favorite={favorites.some((el) => el === id)}
        onPress={() => markFavorite(id)}
      />
      <RenderComments
        comments={comments.filter((comment) => comment.dishId === id)}
      />
    </ScrollView>
  );
}
