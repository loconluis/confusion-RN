import React from "react";
import { ScrollView, View, Text } from "react-native";
import { Card } from "react-native-elements";
import Loading from "./LoadingComponent";
import { connect } from "react-redux";
import { baseURL } from "../shared/baseUrl";

const mapStateToProps = (state) => {
  return {
    dishes: state.dishes,
    promos: state.promos,
    leaders: state.leaders,
  };
};

function RenderItem({ item, isLoading, errMess }) {
  if (isLoading) {
    return <Loading />;
  } else if (errMess) {
    return (
      <View>
        <Text>{props.erreMess}</Text>
      </View>
    );
  } else {
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
  }
}

function Home(props) {
  return (
    <ScrollView>
      <RenderItem
        item={props.dishes.dishes.filter((dish) => dish.featured)[0]}
        isLoading={props.dishes.isLoading}
        errMess={props.dishes.errMess}
      />
      <RenderItem
        item={props.promos.promos.filter((promotion) => promotion.featured)[0]}
        isLoading={props.promos.isLoading}
        errMess={props.promos.errMess}
      />
      <RenderItem
        item={props.leaders.leaders.filter((leader) => leader.featured)[0]}
        isLoading={props.leaders.isLoading}
        errMess={props.leaders.errMess}
      />
    </ScrollView>
  );
}

export default connect(mapStateToProps)(Home);
