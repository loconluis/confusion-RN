import React, { useState } from "react";
import {
  View,
  Text,
  ScrollView,
  FlatList,
  Modal,
  Button,
  StyleSheet,
} from "react-native";
import { Card, Icon, Rating, Input } from "react-native-elements";
import { connect } from "react-redux";
import { baseURL } from "../shared/baseUrl";
import { postFavorite, postComment } from "../redux/ActionCreator";

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
    postComment: (comment) => dispatch(postComment(comment)),
  };
};

const RenderDish = ({ dish, favorite, onPress, onLeaveAComment }) => {
  if (dish != null) {
    return (
      <Card
        featuredTitle={dish.name}
        image={{ uri: `${baseURL}${dish.image}` }}
      >
        <Text style={{ margin: 10 }}>{dish.description}</Text>
        <View
          style={{
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "row",
          }}
        >
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
          <Icon
            reverse
            name="pencil"
            type="font-awesome"
            color="#512DA8"
            onPress={() => onLeaveAComment()}
          />
        </View>
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
          <View style={{ flexDirection: 'row', paddingTop: 5, paddingBottom: 5 }}>
            <Rating readonly startingValue={item.rating} imageSize={10} />
          </View>
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

function ModalCommentComponent({ visible, toggleModal, dishID, postComment }) {
  const [author, setAuthor] = useState("");
  const [comment, setComment] = useState("");
  const [rating, setRating] = useState(5);

  const handleChangeValueAuthor = (author) => {
    setAuthor(author);
  };
  const handleChangeValueComment = (comment) => {
    setComment(comment);
  };
  const handleChangeValueRating = (rating) => {
    setRating(rating);
  };

  const handlePostComment = () => {
    if (author === "" && comment === "") {
      alert("Fields Author and Comment are empty!");
      return;
    }
    let state = {
      author,
      comment,
      rating,
      date: new Date().toISOString(),
      dishId: dishID,
    };
    postComment(state);
    cleanAll();
  };

  const cleanAll = () => {
    setAuthor("");
    setComment("");
    setRating(5);
    toggleModal();
  };

  return (
    <Modal animationType="slide" transparent={false} visible={visible}>
      <View style={style.modal}>
        <Text style={style.modalTitle}>Leave a comment.</Text>
        <Rating
          showRating
          startingValue={rating}
          onFinishRating={handleChangeValueRating}
        />
        <Input
          value={author}
          placeholder="Author"
          onChangeText={handleChangeValueAuthor}
          leftIcon={
            <Icon name="user-o" type="font-awesome" size={20} color="black" />
          }
        />
        <Input
          placeholder="Comment"
          value={comment}
          onChangeText={handleChangeValueComment}
          leftIcon={
            <Icon
              name="comment-o"
              type="font-awesome"
              size={20}
              color="black"
            />
          }
        />
        <Button onPress={handlePostComment} color="#512DA8" title="Submit" />
        <Button onPress={cleanAll} color="black" title="Cancel" />
      </View>
    </Modal>
  );
}

function DishDetailComponent({
  route,
  dishes,
  comments,
  postFavorite,
  favorites,
  postComment
}) {
  // Handle State
  const [showModal, setShowModal] = useState(false);
  const id = route.params.dishID
    ? route.params.dishID
    : route.params.dishID == 0
    ? 0
    : null;

  const markFavorite = (dishID) => {
    postFavorite(dishID);
  };

  const toggleModal = () => {
    setShowModal(!showModal);
  };

  return (
    <ScrollView>
      <RenderDish
        dish={dishes.dishes[+id]}
        favorite={favorites.some((el) => el === id)}
        onPress={() => markFavorite(id)}
        onLeaveAComment={() => toggleModal()}
      />
      <RenderComments
        comments={comments.comments.filter((comment) => comment.dishId === id)}
      />
      <ModalCommentComponent
        dishID={+id}
        visible={showModal}
        toggleModal={toggleModal}
        postComment={postComment}
      />
    </ScrollView>
  );
}

const style = StyleSheet.create({
  modal: {
    justifyContent: "center",
    margin: 20,
    marginTop: 50,
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: "bold",
    backgroundColor: "#512DA8",
    textAlign: "center",
    color: "white",
    marginBottom: 20,
  },
  modalText: {
    fontSize: 18,
    margin: 10,
  },
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DishDetailComponent);
