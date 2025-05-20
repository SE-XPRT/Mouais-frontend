import React from "react";
import { StyleSheet, Text, View, Image } from "react-native";
// import userIcon from "../assets/user.png";
const backgroundColor = "#2a2e30";
const textColor = "#ffffff";

//linear gradient colors
const gradientColors = ["#8b43f1", "#d395ff"];
const gradientColors2 = ["#eeeaec", "#ff0084"];
export default function InfosScreen() {
  return (
    <View style={styles.container}>
      <Image source={require("../assets/user.png")} style={styles.userIcon} />
      <Text style={styles.text}>[Nom d'utilisateur]</Text>
      <View style={styles.container2}>
        <Text style={styles.section}>Mes informations</Text>
        <Text style={styles.section}>Mes informations de paiement</Text>
        <Text style={styles.section}>Confidentialité</Text>
        <Text style={styles.section}>Newsletter</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#2a2e30",
    alignItems: "center",
  },
  container2: {
    flex: 1,
    backgroundColor: "#2a2e30",
    alignItems: "flex-start",
    flexDirection: "column",
    justifyContent: "space-around",
  },
  text: {
    fontSize: 20,
    color: "#ffffff",
  },
  section: {
    fontSize: 20,
    color: textColor,
    backgroundColor: backgroundColor,
  },
  userIcon: {
    borderRadius: 50,
    borderWidth: 2,
    borderColor: textColor,
    backgroundColor: gradientColors[0],
    width: 80,
    height: 80,
    marginTop: "13%",
  },
});
