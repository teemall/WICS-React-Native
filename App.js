import React, { useState, useEffect } from 'react';
import { Platform, Text, View, StyleSheet, Button, Alert } from 'react-native';
import { useAsync } from "react-async"

import * as Location from 'expo-location';

export function doRequest() {
  Alert.alert('Alert Title', 'blahhh', [
    {
      text: 'Cancel',
      onPress: () => console.log('Cancel Pressed'),
      style: 'cancel',
    },
    { text: 'OK', onPress: () => console.log('OK Pressed') },
  ]);
}

const GetDummy = async () => {
  const response = await fetch('https://dummyjson.com/products/1')
    .then(res => res.json())
    .catch((e) => {throw e})
  return response
}

export default function App() {
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const [dummy, setDummy] = useState(null);

  useEffect(() => {
    (async () => {

      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setLocation(location);


      let dumb_data = await GetDummy();
      setDummy(dumb_data)

    })();
  }, []);

  let text = 'Waiting..';
  if (errorMsg) {
    text = errorMsg;
  } else if (location) {
    text = JSON.stringify(location);
  }
  dumb_text = JSON.stringify(dummy)
  

  return (
    <View style={styles.container}>
      <Text style={styles.paragraph}>{text}</Text>
      <Button onPress={doRequest} title="SEND REQUEST"></Button>
      <Text style={styles.paragraph}>{dumb_text}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  bolded: {
    flex: 1,
    backgroundColor: '#f34',
    alignItems: 'center',
    justifyContent: 'center',
  }
});
