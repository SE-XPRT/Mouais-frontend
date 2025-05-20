import React from "react";
import { StyleSheet, Text, View, Button } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Camera } from "expo-camera";
import { useEffect } from "react";

const handleCapture = async () => {
  console.log("takepic");
};
export default function TakePicScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Take Picture</Text>
      <View style={styles.buttonContainer}>
        <Button title="Capture" onPress={handleCapture} />
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  camera: {
    width: "100%",
    height: "100%",
  },
  text: {
    fontSize: 24,
    fontWeight: "bold",
  },
  buttonContainer: {
    marginTop: 20,
  },
});
