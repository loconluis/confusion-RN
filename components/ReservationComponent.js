import React, { Component, useState, useEffect } from "react";
import {
  Text,
  View,
  ScrollView,
  StyleSheet,
  Picker,
  Switch,
  Button,
  Modal,
  Alert,
} from "react-native";
import * as Notifications from "expo-notifications";
import * as Permissions from "expo-permissions";
// import { Card } from "react-native-elements";
import * as Animatable from "react-native-animatable";
import DatePicker from "react-native-datepicker";
import * as Calendar from "expo-calendar";

const ReservationComponent = (props) => {
  const [guest, setGuest] = useState(1);
  const [smoking, setSmoking] = useState(false);
  const [date, setDate] = useState("");
  const [showModal, setShowModal] = useState(false);

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
    Alert.alert(
      "Your reservation OK?",
      `Number of Guest: ${guest}\n Smoking?: ${smoking}\n Date and Time: ${date}\n`,
      [
        {
          text: "Cancel",
          onPress: () => resetForm(),
          style: "cancel",
        },
        {
          text: "OK",
          onPress: () => {
            presentLocalNotification(date);
            resetForm();
          },
        },
      ],
      { cancelable: false }
    );
    let _date = new Date(date);
    obtainCalendarPermission("Con Fusion Table Reservation", _date);
    // toggleModal();
  };
  const toggleModal = () => {
    setShowModal(!showModal);
  };
  const resetForm = () => {
    setGuest(1);
    setSmoking(false);
    setGuest("");
    setDate(null);
  };

  const obtainCalendarPermission = async (
    title = "Con Fusion Table Reservation",
    date,
    location = "121, Clear Water Bay Road, Clear Water Bay, Kowloon, Hong Kong",
    timeZone = "Asia/Hong_Kong"
  ) => {
    const { status } = await Calendar.requestCalendarPermissionsAsync();
    if (status === "granted") {
      // Ios Support
      let defaultCalendar = await Calendar.getDefaultCalendarAsync();
      addReservationToCalendar({
        id: defaultCalendar.id,
        title,
        startDate: date,
        endDate: date,
        location,
        timeZone,
      });
    }
  };

  const addReservationToCalendar = async ({
    id,
    title,
    startDate,
    endDate,
    notes,
  }) => {
    let calendarID = await Calendar.createEventAsync(id, {
      title,
      startDate,
      endDate,
      notes,
    });
    return calendarID;
  };

  const obtainNotificationPermissions = async () => {
    let permission = await Permissions.getAsync(
      Permissions.USER_FACING_NOTIFICATIONS
    );
    if (permission.status !== "granted") {
      permission = await Permissions.askAsync(
        Permissions.USER_FACING_NOTIFICATIONS
      );
      if (permission.status !== "granted") {
        Alert.alert("Permission not granted to show notifications");
      }
    }
  };

  const presentLocalNotification = async (date) => {
    await obtainNotificationPermissions();
    Notifications.presentNotificationAsync({
      title: "Your Reservation",
      body: `Reservation for ${date} requested.`,
      ios: {
        sound: true,
      },
      android: {
        sound: true,
        vibrate: true,
        color: "#512DA8",
      },
    });
  };
  const checkandCleanData = () => {
    toggleModal();
    resetForm();
  };
  return (
    <ScrollView>
      <Animatable.View animation="zoomIn" duration={1500} delay={800}>
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
        {/*<Modal
          animationType="slide"
          transparent={false}
          visible={showModal}
          // onDismiss={checkandCleanData}
          onRequestClose={checkandCleanData}
        >
          <View style={style.modal}>
            <Text style={style.modalTitle}>Your Reservation</Text>
            <Text style={style.modalText}>Number of Guests: {guest}</Text>
            <Text style={style.modalText}>
              Smoking? : {smoking === false ? "Yes" : "No"}
            </Text>
            <Text style={style.modalText}>Date and Time: {date}</Text>
            <Button onPress={checkandCleanData} color="#512DA8" title="Close" />
          </View>
        </Modal>*/}
      </Animatable.View>
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

export default ReservationComponent;
