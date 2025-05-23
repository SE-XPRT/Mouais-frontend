import React, { useState } from "react";
import { useSelector } from "react-redux";
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
import { useDispatch } from "react-redux";
import { updateToken, updateEmail } from "../reducers/users";
import AsyncStorage from "@react-native-async-storage/async-storage";
import FilterModal from "./ModalFilter";

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
  const dispatch = useDispatch();
  const [showPersonalize, setShowPersonalize] = useState(false);
  const [showFiltersModal, setShowFiltersModal] = useState(false);

  const openMenu = () => {
    // Handle menu opening
    console.log("Menu opened");
    setShowPersonalize((prev) => !prev);
  };

  const openFilters = () => {
    setShowFiltersModal(true);
  };

  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  const user = useSelector((state: any) => state.users);
  const token = user.token;
  const photoId = user.photoId;

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
            onPress={openFilters} // Ouverture de la modal
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
            <Text style={{ color: "#fff", fontSize: 16 }}>Mes stats perso</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.Button}
            onPress={() => {
              dispatch(updateToken(""));
              dispatch(updateEmail(""));
              AsyncStorage.removeItem("userData");
              navigation.navigate("Login");
            }}
          >
            <Text style={{ color: "#fff", fontSize: 16 }}>Deconnexion</Text>
          </TouchableOpacity>
        </View>
      )}
      <FilterModal
        visible={showFiltersModal}
        onClose={() => setShowFiltersModal(false)}
        token={token}
        photoId={photoId}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    padding: 16,
    backgroundColor: "#2a2e30",
    alignItems: "center",
    borderBottomWidth: 1,
    borderBottomColor: "rgba(255,255,255,0.1)",
  },
  logo: {
    width: 200,
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
    backgroundColor: accentColor,
    padding: 10,
    borderRadius: 8,
  },
  Button: {
    backgroundColor: accentColor,
    paddingVertical: 16,
    paddingHorizontal: 24,
    borderRadius: 12,
    marginBottom: 14,
    borderWidth: 2,
    borderColor: "rgba(255,255,255,0.25)",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.35,
    shadowRadius: 6,
    elevation: 8,
    alignItems: "center",
    justifyContent: "center",
  },
  menuContainer: {
    gap: 12,
    position: "absolute",
    top: 85,
    width: "92%",
    right: 15,
    backgroundColor: "#25272c",
    borderRadius: 14,
    padding: 24,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.35,
    shadowRadius: 8,
    elevation: 10,
    zIndex: 1000,
    borderWidth: 1.5,
    borderColor: "rgba(255,255,255,0.2)",
  },
});

export default Header;
