import React from "react";
import { View, Text, ScrollView } from "react-native";
import { Card } from "react-native-elements";
import * as Animatable from "react-native-animatable";
import { CONTACT } from "../shared/contact";

const RenderContact = ({ data }) => {
  if (data != null) {
    return (
      <ScrollView>
        <Animatable.View animation="fadeInDown" duration={2000} delay={1000}>
          <Card title={data.contact.title}>
            <Text style={{ margin: 10 }}>{data.address.addressLine1}</Text>
            <Text style={{ margin: 10 }}>{data.address.addressLine2}</Text>
            <Text style={{ margin: 10 }}>{data.address.city}</Text>

            <Text style={{ margin: 10, marginTop: 25 }}>
              Tel: {data.contact.tel}
            </Text>
            <Text style={{ margin: 10 }}>Fax: {data.contact.fax}</Text>
            <Text style={{ margin: 10 }}>Email: {data.contact.email}</Text>
          </Card>
        </Animatable.View>
      </ScrollView>
    );
  }

  return <View></View>;
};

export default function ContactComponent() {
  return <RenderContact data={CONTACT} />;
}
