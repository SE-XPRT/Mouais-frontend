import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  Dimensions,
  TextInput,
} from "react-native";
import _FontAwesome from "@react-native-vector-icons/fontawesome";
const FontAwesome = _FontAwesome as React.ElementType;
const backgroundColor = "#2a2a30"; // couleur sombre corrigée
const textColor = "#fff";
const accentColor = "#8b43f1";
const cardBg = "#fff";
const cardBorder = "#e0e0e0";
const labelColor = "#888";
const valueColor = "#232526";
const screenHeight = Dimensions.get("window").height;

export default function InfosScreen() {
  const [editMode, setEditMode] = useState(false);
  const [editStyle, setEditStyle] = useState({
    backgroundColor: "#fff",
  });
  const editTextInput = () => {
    setEditMode(!editMode);
    setEditStyle({
      backgroundColor:
        editStyle.backgroundColor === "#fff" ? "#f0f0f0" : "#fff",
    });
  };
  return (
    <View style={styles.bg}>
      <View style={styles.container}>
        <View style={styles.avatarContainer}>
          <Image
            source={require("../assets/user.png")}
            style={styles.userIcon}
          />
          <Text style={styles.username}>[Nom d'utilisateur]</Text>
        </View>
        <View style={styles.card}>
          <View
            style={{
              alignItems: "center",
              display: "flex",
              justifyContent: "space-between",
              flexDirection: "row",
              marginBottom: 15,
            }}
          >
            <Text style={styles.cardTitle}>Mes informations</Text>
            <FontAwesome
              name="edit"
              size={20}
              color={accentColor}
              onPress={() => editTextInput()}
            />
          </View>

          <View style={styles.infoRow}>
            <Text style={styles.label}>Nom :</Text>
            <TextInput
              style={{
                ...styles.value,
                backgroundColor: editStyle.backgroundColor,
              }}
              editable={editMode}
              placeholder="Nom"
            />
          </View>
          <View style={styles.infoRow}>
            <Text style={styles.label}>Prénom :</Text>
            <TextInput
              style={{
                ...styles.value,
                backgroundColor: editStyle.backgroundColor,
              }}
              editable={editMode}
              placeholder="Prénom"
            />
          </View>
          <View style={styles.infoRow}>
            <Text style={styles.label}>Age</Text>
            <TextInput
              style={{
                ...styles.value,
                backgroundColor: editStyle.backgroundColor,
              }}
              editable={editMode}
              placeholder="Age"
            />
          </View>
          <View style={styles.infoRow}>
            <Text style={styles.label}>Email :</Text>
            <TextInput
              style={{
                ...styles.value,
                backgroundColor: editStyle.backgroundColor,
              }}
              editable={editMode}
              placeholder="Email"
            />
          </View>
        </View>{" "}
        <View style={styles.ButtonContainer}>
          <TouchableOpacity style={styles.Button} onPress={() => {}}>
            <Text style={{ color: "#fff", fontSize: 16 }}>
              Mes informations de paiement
            </Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.Button} onPress={() => {}}>
            <Text style={{ color: "#fff", fontSize: 16 }}>Newsletter</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  bg: {
    flex: 1,
    backgroundColor: backgroundColor,
  },
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 14,
  },
  avatarContainer: {
    alignItems: "center",
    marginBottom: 32,
  },
  userIcon: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderWidth: 3,
    borderColor: "#fff",
    backgroundColor: accentColor,
    marginBottom: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 6,
  },
  username: {
    fontSize: 22,
    color: "#fff",
    fontWeight: "bold",
    letterSpacing: 1,
    textShadowColor: "#0002",
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 4,
  },
  card: {
    height: screenHeight * 0.4,
    width: "100%",
    borderRadius: 20,
    padding: 24,
    backgroundColor: cardBg,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.08,
    shadowRadius: 12,
    elevation: 8,
    borderWidth: 1,
    borderColor: cardBorder,
  },
  cardTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: accentColor,
    marginBottom: 5,
    alignSelf: "center",
    letterSpacing: 1,
  },
  infoRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 14,
  },
  label: {
    fontSize: 16,
    color: labelColor,
    width: 80,
    fontWeight: "600",
  },
  value: {
    fontSize: 16,
    color: valueColor,
    fontWeight: "500",
    flexShrink: 1,
    width: "90%",
    marginRight: 8,
    padding: 5,
    margin: 5,
    borderRadius: 10,
    borderBottomWidth: 1,
    borderRightWidth: 1,
    borderColor: "gray",
    elevation: 3,
  },
  ButtonContainer: {
    marginTop: 20,
    flexDirection: "column",
    gap: 5,
    display: "flex",
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  Button: {
    marginTop: 40,
    backgroundColor: accentColor,
    borderRadius: 8,
    padding: 10,
    width: "80%",
    alignItems: "center",
    justifyContent: "center",
  },
});
