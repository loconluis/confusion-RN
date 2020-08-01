import React from "react";
import { ScrollView, View, Text } from "react-native";
import { Card } from "react-native-elements";
import { connect } from "react-redux";
import { baseURL } from "../shared/baseUrl";

const mapStateToProps = (state) => {
  return {
    dishes: state.dishes,
    promos: state.promos,
    leaders: state.leaders,
  };
};

function RenderItem({ item }) {
  if (item != null) {
    return (
      <Card
        featuredTitle={item.name}
        featuredSubtitle={item.designation}
        image={{ uri: `${baseURL}${item.image}` }}
      >
        <Text style={{ margin: 10 }}>{item.description}</Text>
      </Card>
    );
  }

  return <View></View>;
}

function Home(props) {
  return (
    <ScrollView>
      <RenderItem
        item={props.dishes.dishes.filter((dish) => dish.featured)[0]}
      />
      <RenderItem
        item={props.promos.promos.filter((promotion) => promotion.featured)[0]}
      />
      <RenderItem
        item={props.leaders.leaders.filter((leader) => leader.featured)[0]}
      />
    </ScrollView>
  );
}

export default connect(mapStateToProps)(Home);
