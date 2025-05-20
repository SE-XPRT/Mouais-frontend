import React from "react";
import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";
import _FontAwesome from "@react-native-vector-icons/fontawesome";
const FontAwesome = _FontAwesome as React.ElementType;
const backgroundColor = "#2a2a30"; // couleur sombre corrigée
const textColor = "#fff";
const accentColor = "#8b43f1";
const cardBg = "#fff";
const cardBorder = "#e0e0e0";
const labelColor = "#888";
const valueColor = "#232526";

export default function InfosScreen() {
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
          <Text style={styles.cardTitle}>Mes informations</Text>
          <View style={styles.infoRow}>
            <Text style={styles.label}>Nom :</Text>
            <Text style={styles.value}>[Nom]</Text>
            <FontAwesome
              name="edit"
              size={20}
              color={accentColor}
              style={{ marginLeft: "auto" }}
            />
          </View>
          <View style={styles.infoRow}>
            <Text style={styles.label}>Prénom :</Text>
            <Text style={styles.value}>[Prénom]</Text>
            <FontAwesome
              name="edit"
              size={20}
              color={accentColor}
              style={{ marginLeft: "auto" }}
            />
          </View>
          <View style={styles.infoRow}>
            <Text style={styles.label}>Date de naissance :</Text>
            <Text style={styles.value}>[Date de naissance]</Text>
            <FontAwesome
              name="edit"
              size={20}
              color={accentColor}
              style={{ marginLeft: "auto" }}
            />
          </View>
          <View style={styles.infoRow}>
            <Text style={styles.label}>Email :</Text>
            <Text style={styles.value}>[Email]</Text>
            <FontAwesome
              name="edit"
              size={20}
              color={accentColor}
              style={{ marginLeft: "auto" }}
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
    padding: 24,
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
    marginBottom: 20,
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
    width: 140,
    fontWeight: "600",
  },
  value: {
    fontSize: 16,
    color: valueColor,
    fontWeight: "500",
    flexShrink: 1,
  },
  ButtonContainer: {
    marginTop: 20,
    flexDirection: "column",
    gap: 10,
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
