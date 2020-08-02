import React, { Component, useState, useEffect } from "react";
import {
  Text,
  View,
  ScrollView,
  StyleSheet,
  Picker,
  Switch,
  Button,
} from "react-native";
import { Card } from "react-native-elements";
import DatePicker from "react-native-datepicker";

const ReservationComponent = (props) => {
  const [guest, setGuest] = useState(1);
  const [smoking, setSmoking] = useState(false);
  const [date, setDate] = useState("");

  const handlePickerOnChange = (itemValue, itemIndex) => {
    setGuest(itemValue);
  };

  const handleSwitchOnChange = (value) => {
    setSmoking(value);
  };
  const handleDatePickerOnChange = (date) => {
    setDate(date);
  };

  const handleReservation = () => {
    let state = {
      guest,
      smoking,
      date,
    };
    console.log(state);
    setGuest(1);
    setSmoking(false);
    setGuest("");
  };
  return (
    <ScrollView>
      <View style={style.formRow}>
        <Text style={style.formLabel}> Number of Guests</Text>
        <Picker
          style={style.formItem}
          selectedValue={guest}
          onValueChange={handlePickerOnChange}
        >
          <Picker.Item label="1" value="1" />
          <Picker.Item label="2" value="2" />
          <Picker.Item label="3" value="3" />
          <Picker.Item label="4" value="4" />
          <Picker.Item label="5" value="5" />
          <Picker.Item label="6" value="6" />
        </Picker>
      </View>
      <View style={style.formRow}>
        <Text style={style.formLabel}>Smoking/Non Smoking</Text>
        <Switch
          style={style.formItem}
          value={smoking}
          onTintColor="#512DA8"
          onValueChange={handleSwitchOnChange}
        />
      </View>
      <View style={style.formRow}>
        <Text style={style.formLabel}>Date and Time</Text>
        <DatePicker
          style={{ flex: 2, marginRigth: 20 }}
          date={date}
          format=""
          mode="datetime"
          placeholder="Select date and time"
          minDate="2020-01-01"
          confirmBtnText="Confirm"
          cancelBtnText="Cancel"
          customStyles={{
            dateIcon: {
              position: "absolute",
              left: 0,
              top: 4,
              marginLeft: 0,
            },
            dateInput: {
              marginLeft: 36,
            },
          }}
          onDateChange={handleDatePickerOnChange}
        />
      </View>
      <View style={style.formRow}>
        <Button
          title="Reserve"
          color="#512DA8"
          onPress={handleReservation}
          accessibilityLabel="Learn more about this purple button"
        />
      </View>
    </ScrollView>
  );
};

const style = StyleSheet.create({
  formRow: {
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
    flexDirection: "row",
    margin: 20,
  },
  formLabel: {
    fontSize: 18,
    flex: 2,
  },
  formItem: {
    flex: 1,
  },
});

export default ReservationComponent;
