import React, { useState } from "react";
import { ScrollView, View, Text } from "react-native";
import { Card } from "react-native-elements";
import { DISHES } from "../shared/dishes";
import { PROMOTIONS } from "../shared/promotions";
import { LEADERS } from "../shared/leaders";

function RenderItem({ item }) {
  if (item != null) {
    return (
      <Card
        featuredTitle={item.name}
        featuredSubtitle={item.designation}
        image={require("./images/uthappizza.png")}
      >
        <Text style={{ margin: 10 }}>{item.description}</Text>
      </Card>
    );
  }

  return <View></View>;
}

export default function Home(props) {
  const [dishes] = useState(DISHES);
  const [promotions] = useState(PROMOTIONS);
  const [leaders] = useState(LEADERS);

  return (
    <ScrollView>
      <RenderItem item={dishes.filter((dish) => dish.featured)[0]} />
      <RenderItem
        item={promotions.filter((promotion) => promotion.featured)[0]}
      />
      <RenderItem item={leaders.filter((leader) => leader.featured)[0]} />
    </ScrollView>
  );
}
