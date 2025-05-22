import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  Dimensions,
  TextInput,
  ScrollView,
} from "react-native";
import _FontAwesome from "@react-native-vector-icons/fontawesome";
import { useSelector } from "react-redux";
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
  const email = useSelector((state: any) => state.users.value.email);
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
    <ScrollView contentContainerStyle={styles.bg}>
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
              placeholder={email}
            />
          </View>
        </View>
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
    </ScrollView>
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
    justifyContent: "flex-start",
    padding: 20,
    paddingTop: 60,
  },
  avatarContainer: {
    alignItems: "center",
    marginBottom: 30,
  },
  userIcon: {
    width: 110,
    height: 110,
    borderRadius: 55,
    borderWidth: 3,
    borderColor: "#fff",
    backgroundColor: accentColor,
    marginBottom: 10,
    shadowColor: accentColor,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.4,
    shadowRadius: 12,
    elevation: 10,
  },
  username: {
    fontSize: 24,
    color: "#fff",
    fontWeight: "bold",
    letterSpacing: 1.2,
    textShadowColor: "#0005",
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 4,
  },
  card: {
    width: "100%",
    borderRadius: 20,
    padding: 24,
    backgroundColor: cardBg,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 8,
    borderWidth: 1,
    borderColor: cardBorder,
    marginBottom: 30,
  },
  cardTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: accentColor,
    alignSelf: "center",
    marginBottom: 16,
    letterSpacing: 1,
  },
  infoRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
  },
  label: {
    fontSize: 16,
    color: labelColor,
    width: 90,
    fontWeight: "600",
  },
  value: {
    fontSize: 16,
    color: valueColor,
    fontWeight: "500",
    flex: 1,
    paddingVertical: 8,
    paddingHorizontal: 12,
    backgroundColor: "#f8f8f8",
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#ccc",
  },
  ButtonContainer: {
    width: "100%",
    alignItems: "center",
    gap: 14,
  },
  Button: {
    backgroundColor: accentColor,
    borderRadius: 12,
    paddingVertical: 14,
    paddingHorizontal: 20,
    width: "85%",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
    elevation: 5,
    marginBottom: 10,
  },
});
