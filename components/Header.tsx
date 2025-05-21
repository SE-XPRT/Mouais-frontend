import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  Button,
  Dimensions,
} from "react-native";
import _FontAwesome from "@react-native-vector-icons/fontawesome";
import { useNavigation } from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";

type RootStackParamList = {
  Login: undefined;
  // Ajoutez ici d'autres routes si nécessaire
};
const screenHeight = Dimensions.get("window").height;
const backgroundColor = "#2a2a30"; // couleur sombre corrigée
const textColor = "#fff";
const accentColor = "#8b43f1";
const cardBg = "#fff";
const cardBorder = "#e0e0e0";
const labelColor = "#888";
const valueColor = "#232526";
const FontAwesome = _FontAwesome as React.ElementType;
const Header: React.FC = () => {
  const [showPersonalize, setShowPersonalize] = React.useState(false);

  const openMenu = () => {
    // Handle menu opening
    console.log("Menu opened");
    setShowPersonalize((prev) => !prev);
  };
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  return (
    <View style={styles.header}>
      <Image style={styles.logo} source={require("../assets/logo.png")} />

      <FontAwesome
        style={styles.menu}
        name="bars"
        size={40}
        color="#fff"
        onPress={openMenu}
      />

      {/* Dropdown menu */}
      {showPersonalize && (
        <View style={styles.menuContainer}>
          <Text style={{ fontSize: 20, color: "#fff", marginBottom: 8 }}>
            Bienvenue !
          </Text>

          <TouchableOpacity
            style={styles.Button}
            onPress={() => {
              console.log("Button clicked");
            }}
          >
            <Text style={{ color: "#fff", fontSize: 16 }}>Mon Compte</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.Button}
            onPress={() => {
              console.log("Button clicked");
            }}
          >
            <Text style={{ color: "#fff", fontSize: 16 }}>
              Mes notifications
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.Button}
            onPress={() => {
              console.log("Button clicked");
            }}
          >
            <Text style={{ color: "#fff", fontSize: 16 }}>
              Mes filtres & favoris
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.Button}
            onPress={() => {
              console.log("Button clicked");
            }}
          >
            <Text style={{ color: "#fff", fontSize: 16 }}>
              Mon album photos
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.Button}
            onPress={() => {
              console.log("Button clicked");
            }}
          >
            <Text style={{ color: "#fff", fontSize: 16 }}>Mes badges</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.Button}
            onPress={() => {
              console.log("Button clicked");
            }}
          >
            <Text style={{ color: "#fff", fontSize: 16 }}>Mes badges</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.Button}
            onPress={() => {
              navigation.navigate("Login");
            }}
          >
            <Text style={{ color: "#fff", fontSize: 16 }}>Deconnexion</Text>
          </TouchableOpacity>
        </View>
      )}
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
  Button: {
    backgroundColor: accentColor,
    padding: 10,
    borderRadius: 5,
    marginBottom: 8,
  },
  menuContainer: {
    gap: 20,
    height: screenHeight,
    position: "absolute",
    top: 100,
    width: "100%",
    right: 16,
    backgroundColor: "#333",
    borderRadius: 8,
    padding: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
    zIndex: 10,
  },
});

export default Header;
