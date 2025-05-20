import React from "react";
import { StyleSheet, Text, View, TouchableOpacity, Image } from "react-native";
import { useNavigation } from "@react-navigation/native";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import { icon } from "@fortawesome/fontawesome-svg-core";
const handleCapture = async () => {
  console.log("takepic");
};
export default function TakePicScreen() {
  return (
    <View style={styles.container}>
      <Image style={styles.logo} source={require("../assets/logo.png")} />
      <View style={styles.iconContainer}>
        <View style={styles.icons}>
          <FontAwesome
            style={styles.icon}
            name="upload"
            size={100}
            color="#fff"
          />
        </View>
        <View style={styles.icons}>
          <FontAwesome
            style={styles.icon}
            name="camera"
            size={100}
            color="#fff"
          />
        </View>
      </View>
      <Text style={styles.text}>Envie de personnaliser ton expérience ?</Text>
      <TouchableOpacity
          style={styles.createProfilButton}
        >
      <Text style={styles.text}>Crée ton profil ici !</Text>
        </TouchableOpacity>
      <TouchableOpacity
          style={styles.coinsButton}
        >
      <Text style={styles.text}>Coins : 0 / 3 </Text>
        </TouchableOpacity>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "#2a2e30",
  },
  logo: {
    width: 100,
    height: 100,
    marginBottom: 20,
    position: "absolute",
    top: 25,
  },
  text: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#fff",
    textAlign: "center",
  },
  iconContainer: {
    marginTop: 200,
    marginBottom: 50,
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    width: "100%",
  },
  icons: {
    backgroundColor: "gray",
    borderRadius: "100%",
    padding: 40,
    justifyContent: "center",
    alignItems: "center",
  },
  createProfilButton: {
    marginTop: 40,  
    backgroundColor: "#d395ff",
    borderRadius: 8,
    padding: 10,  
    width: "80%",
    alignItems: "center",
    justifyContent: "center",
  },
  coinsButton: {
    marginTop: 60,
    backgroundColor: "#ffac25",
    borderRadius: 80,
    padding: 5,
    width: "40%",
    alignItems: "center",
    justifyContent: "center",
  },
});
