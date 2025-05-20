import React from "react";
import { StyleSheet, Text, View, Button, Image } from "react-native";
import { useNavigation } from "@react-navigation/native";
import FontAwesome from "react-native-vector-icons/FontAwesome";
const handleCapture = async () => {
  console.log("takepic");
};
export default function TakePicScreen() {
  return (
    <View style={styles.container}>
       <Image style={styles.logo} source={require('../assets/logo.png')} />
      <Text style={styles.text}>2 ways but only 1 result !</Text>
      <FontAwesome name="faArrowUpFromBracket" size={25}/>
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
    justifyContent: "space-around",
    backgroundColor: "#2a2e30"

  },
  logo: {
    width: 100,
    height: 100,
    marginBottom: 20,
    position: "absolute",
    top: 25,
  },
  camera: {
    width: "100%",
    height: "100%",
  },
  text: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#fff",
  },
  buttonContainer: {
    marginTop: 20,
  },
});
