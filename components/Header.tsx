import React from "react";
import { View, Text, StyleSheet, Image } from "react-native";
import FontAwesome from "react-native-vector-icons/FontAwesome";

const Header: React.FC = () => {
  return (
    <View style={styles.header}>
      <Image style={styles.logo} source={require("../assets/logo.png")} />
      <FontAwesome style={styles.menu} name="bars" size={40} color="#fff" />
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    padding: 16,
    backgroundColor: "#2a2e30",
    alignItems: "center",
  },
  logo: {
    width: 100,
    height: 100,
    marginBottom: 20,
    position: "absolute",
    top: 25,
  },
  menu: {
    position: "absolute",
    right: 16,
    top: 50,
    color: "#fff",
  },
});

export default Header;
