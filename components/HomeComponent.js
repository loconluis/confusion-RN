import React, { useRef, useEffect } from "react";
import { View, Text, Animated, Easing } from "react-native";
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
  const animatedRef = useRef(new Animated.Value(0)).current;
  const animate = () => {
    animatedRef.setValue(0);
    Animated.timing(animatedRef, {
      toValue: 8,
      duration: 8000,
      useNativeDriver: false,
      easing: Easing.linear,
    }).start(() => animate());
  };

  useEffect(() => {
    animate();
  });

  const xpo1 = animatedRef.interpolate({
    inputRange: [0, 1, 3, 5, 8],
    outputRange: [1200, 600, 0, -600, -1200],
  });
  const xpo2 = animatedRef.interpolate({
    inputRange: [0, 2, 4, 6, 8],
    outputRange: [1200, 600, 0, -600, -1200],
  });
  const xpo3 = animatedRef.interpolate({
    inputRange: [0, 3, 5, 7, 8],
    outputRange: [1200, 600, 0, -600, -1200],
  });
  return (
    <View style={{ flex: 1, flexDirection: "row", justifyContent: "center" }}>
      <Animated.View
        style={{ width: "100%", transform: [{ translateX: xpo1 }] }}
      >
        <RenderItem
          item={props.dishes.dishes.filter((dish) => dish.featured)[0]}
          isLoading={props.dishes.isLoading}
          errMess={props.dishes.errMess}
        />
      </Animated.View>
      <Animated.View
        style={{ width: "100%", transform: [{ translateX: xpo2 }] }}
      >
        <RenderItem
          item={
            props.promos.promos.filter((promotion) => promotion.featured)[0]
          }
          isLoading={props.promos.isLoading}
          errMess={props.promos.errMess}
        />
      </Animated.View>
      <Animated.View
        style={{ width: "100%", transform: [{ translateX: xpo2 }] }}
      >
        <RenderItem
          item={props.leaders.leaders.filter((leader) => leader.featured)[0]}
          isLoading={props.leaders.isLoading}
          errMess={props.leaders.errMess}
        />
      </Animated.View>
    </View>
  );
}

export default connect(mapStateToProps)(Home);
