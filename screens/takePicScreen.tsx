import React from "react";
import { StyleSheet, Text, View, TouchableOpacity, Image } from "react-native";
import { useNavigation } from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import _FontAwesome from "@react-native-vector-icons/fontawesome";
const FontAwesome = _FontAwesome as React.ElementType;
import { icon } from "@fortawesome/fontawesome-svg-core";
import SnapScreen from "../screens/snapscreen";

type RootStackParamList = {
  TakePic: undefined;
  Snap: undefined;
};

export default function TakePicScreen() {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  return (
    <View style={styles.container}>
      <View style={styles.iconContainer}>
        <View style={styles.icons}>
          <FontAwesome name="upload" size={100} color="#fff" />
        </View>
        <TouchableOpacity
          style={styles.icons}
          onPress={() => {
            navigation.navigate("Snap");
          }}
        >
          <FontAwesome name="camera" size={100} color="#fff" />
        </TouchableOpacity>
      </View>
      <Text style={styles.text}>Envie de personnaliser ton expérience ?</Text>
      <TouchableOpacity style={styles.createProfilButton}>
        <Text style={styles.text}>Crée ton profil ici !</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.coinsButton}>
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
    marginTop: 180,
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
