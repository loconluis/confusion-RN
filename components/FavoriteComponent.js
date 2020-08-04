import React from "react";
import { Text, View, FlatList, Alert } from "react-native";
import { ListItem } from "react-native-elements";
import Loading from "./LoadingComponent";
import Swipeout from "react-native-swipeout";
import { connect } from "react-redux";
import { baseURL } from "../shared/baseUrl";
import { deleteFavorite } from "../redux/ActionCreator";

const mapStateToPros = (state) => {
  return {
    dishes: state.dishes,
    favorites: state.favorites || [],
  };
};

const mapDispatchToProps = (dispatch) => ({
  deleteFavorite: (dishID) => dispatch(deleteFavorite(dishID)),
});

const FavoriteComponent = (props) => {
  const { navigate } = props.navigation;

  const renderMenuItem = ({ item, index }) => {
    const rigthButton = [
      {
        text: "Delete",
        type: "delete",
        onPress: () => {
          Alert.alert(
            "Delete Favorite",
            `Are you sure you wish to delete the favorite dish ${item.name}?`,
            [
              {
                text: "Cancel",
                onPress: () => {
                  console.log("Not Deleted");
                },
                style: "cancel",
              },
              { text: "Ok", onPress: () => props.deleteFavorite(item.id) },
            ],
            { cancelable: false }
          );
        },
      },
    ];
    return (
      <Swipeout right={rigthButton} autoClose={true}>
        <ListItem
          key={index}
          title={item.name}
          subtitle={item.description}
          chevron={false}
          onPress={() => navigate("Details", { dishID: item.id })}
          leftAvatar={{ source: { uri: `${baseURL}${item.image}` } }}
        />
      </Swipeout>
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
      keyExtractor={(item) => item.id.toString()}
    />
  );
};

export default connect(mapStateToPros, mapDispatchToProps)(FavoriteComponent);
