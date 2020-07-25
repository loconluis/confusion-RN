import React from "react";
import { ScrollView, View, Text, FlatList } from "react-native";
import { Card, ListItem } from "react-native-elements";
import { CONTACT } from "../shared/contact";
import { LEADERS } from "../shared/leaders";

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
      leftAvatar={{ source: require("../assets/images/avatar.png") }}
    />
  );
  const keyMenuItem = (item) => item.id.toString();

  return (
    <FlatList
      data={leadership}
      renderItem={renderLeaderItem}
      keyExtractor={keyMenuItem}
    />
  );
};

const LeaderShipCard = ({ leadership }) => {
  if (leadership != null) {
    return (
      <Card title={"Corporate Leadership"}>
        <LeaderMemberList leadership={LEADERS} />
      </Card>
    );
  }

  return <View></View>;
};

export default function AboutComponent(props) {
  return (
    <ScrollView>
      <HistoryComponent data={CONTACT} />
      <LeaderShipCard leadership={LEADERS} />
    </ScrollView>
  );
}
