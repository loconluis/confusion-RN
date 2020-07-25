import React from 'react';
import { View, Text } from 'react-native';
import { Card } from 'react-native-elements';
import { CONTACT } from '../shared/contact'


const RenderContact = ({ data }) => {
  if (data != null) {
    return (
      <Card
        title={data.contact.title}

      >
        <Text style={{ margin: 10 }}>{data.address.addressLine1}</Text>
        <Text style={{ margin: 10 }}>{data.address.addressLine2}</Text>
        <Text style={{ margin: 10 }}>{data.address.city}</Text>
        
        <Text style={{ margin: 10, marginTop: 25 }}>Tel: {data.contact.tel}</Text>
        <Text style={{ margin: 10 }}>Fax: {data.contact.fax}</Text>
        <Text style={{ margin: 10 }}>Email: {data.contact.email}</Text>
      </Card>
    );
  }

  return <View></View>;
};

export default function ContactComponent() {

  return (
    <RenderContact data={CONTACT} />
  )
}