import React, { useState } from "react";
import { View, Text } from "react-native";
import { Card } from "react-native-elements";
import { DISHES } from '../shared/dishes'

const RenderDish = ({ dish }) => {
  if (dish != null) {
    return (
      <Card
        featuredTitle={dish.name}
        image={require("./images/uthappizza.png")}
      >
        <Text style={{ margin: 10 }}>{dish.description}</Text>
      </Card>
    );
  }

  return <View></View>;
};

export default function DishDetailComponent({ route }) {
  const [dishes] = useState(DISHES);
  const id = route.params.dishID ? route.params.dishID : null;

  return <RenderDish dish={dishes[+id]} />;
}
