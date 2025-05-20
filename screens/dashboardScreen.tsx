import React from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  ScrollView,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import _FontAwesome from "@react-native-vector-icons/fontawesome";
const FontAwesome = _FontAwesome as React.ElementType;

export default function DashboardScreen() {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <Image style={styles.logo} source={require("../assets/logo.png")} />
      <Text style={styles.greetings}>
        Salut Juju, prêt à tester ton <Text style={styles.aura}>aura</Text> ?
      </Text>

      <View style={styles.cardGrid}>
        <TouchableOpacity style={styles.card}>
          <FontAwesome name="web-awesome" size={40} color="#29ffc6" />
          <Text style={styles.cardText}>Tes badges</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.card}>
          <FontAwesome name="thumbs-up" size={40} color="#ffac25" />
          <Text style={styles.cardText}>Ton best score</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.card}>
          <FontAwesome name="images" size={40} color="#8b43f1" />
          <Text style={styles.cardText}>Ta best photo</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.card}>
          <FontAwesome name="bitcoin" size={40} color="#ff0084" />
          <Text style={styles.cardText}>Tes coins</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.pinkButton}>
          <Text style={styles.buttonText}>Gagne des coins</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.greenButton}>
          <Text style={styles.buttonText}>BUY PREMIUM</Text>
        </TouchableOpacity>

        <Text style={styles.coinInfo}> Il te reste 3 coins</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#2a2e30",
    alignItems: "center",
    paddingTop: 60,
  },
  logo: {
    width: 120,
    height: 60,
    resizeMode: "contain",
    marginBottom: 10,
  },
  greetings: {
    color: "#fff",
    fontSize: 18,
    marginBottom: 20,
  },
  aura: {
    color: "#E7C6FF",
    fontWeight: "bold",
  },
  cardGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    marginBottom: 20,
  },
  card: {
    backgroundColor: "#383c40",
    width: 130,
    height: 100,
    margin: 10,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  cardText: {
    color: "#fff",
    fontSize: 14,
    marginTop: 10,
    textAlign: "center",
  },
  pinkButton: {
    backgroundColor: "#ff0084",
    paddingVertical: 10,
    paddingHorizontal: 50,
    borderRadius: 10,
    marginVertical: 10,
  },
  greenButton: {
    backgroundColor: "#29ffc6",
    paddingVertical: 10,
    paddingHorizontal: 50,
    borderRadius: 10,
  },
  buttonText: {
    color: "#000",
    fontWeight: "bold",
  },
  coinInfo: {
    color: "#fff",
    marginTop: 20,
  },
});
