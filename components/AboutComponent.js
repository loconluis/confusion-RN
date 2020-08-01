import React from "react";
import { ScrollView, View, Text, FlatList } from "react-native";
import Loading from "./LoadingComponent";
import { Card, ListItem } from "react-native-elements";
import { connect } from "react-redux";
import { CONTACT } from "../shared/contact";
import { LEADERS } from "../shared/leaders";
import { baseURL } from "../shared/baseUrl";

const mapStateToProps = (state) => {
  return {
    leaders: state.leaders,
  };
};

const HistoryComponent = ({ data }) => {
  if (data != null) {
    return (
      <Card title={data.title}>
        <Text style={{ margin: 10 }}>{data.subtitle}</Text>
        <Text style={{ margin: 10 }}>{data.description}</Text>
      </Card>
    );
  }

  return <View></View>;
};

const LeaderMemberList = ({ leadership }) => {
  const renderLeaderItem = ({ item, index }) => (
    <ListItem
      key={index}
      title={item.name}
      titleStyle={{
        fontSize: 15,
        paddingBottom: 5,
        fontWeight: "bold",
      }}
      subtitle={item.description}
      subtitleStyle={{
        fontSize: 13,
      }}
      chevron={false}
      leftAvatar={{ source: { uri: `${baseURL}${item.image}` } }}
    />
  );
  const keyMenuItem = (item) => item.id.toString();

  return (
    <FlatList
      data={leadership.leaders}
      renderItem={renderLeaderItem}
      keyExtractor={keyMenuItem}
    />
  );
};

const LeaderShipCard = ({ leadership, isLoading }) => {
  if (leadership != null) {
    return (
      <Card title={"Corporate Leadership"}>
        <LeaderMemberList leadership={leadership} />
      </Card>
    );
  }

  return <View></View>;
};

function AboutComponent(props) {
  if (props.leaders.isLoading) {
    return (
      <ScrollView>
        <HistoryComponent data={CONTACT} />
        <Loading />
      </ScrollView>
    );
  } else if (props.leaders.errMess) {
    return (
      <ScrollView>
        <HistoryComponent data={CONTACT} />
        <Text>{props.leaders.errMess}</Text>
      </ScrollView>
    );
  }
  return (
    <ScrollView>
      <HistoryComponent data={CONTACT} />
      <LeaderShipCard leadership={props.leaders} />
    </ScrollView>
  );
}

export default connect(mapStateToProps)(AboutComponent);
