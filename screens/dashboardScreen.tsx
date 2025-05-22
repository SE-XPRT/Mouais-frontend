import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View, TouchableOpacity, Image } from "react-native";
import { useRoute, RouteProp, useNavigation } from "@react-navigation/native";
import _FontAwesome from "@react-native-vector-icons/fontawesome";
import Constants from "expo-constants";
const FontAwesome = _FontAwesome as React.ElementType;

type DashboardParams = {
  Dashboard: { token: string };
};
const API_URL = Constants.expoConfig?.extra?.API_URL ?? "";

export default function DashboardScreen() {
  const navigation = useNavigation();
  const route = useRoute<RouteProp<DashboardParams, "Dashboard">>();
  const token = route.params?.token; // récupération du token depuis la route GET/ dashboard/:token A REMPLACER PAR LE REDUCER UNE FOIS TERMINE

  const [userName, setUserName] = useState("");
  const [averageScore, setAverageScore] = useState<number | null>(null);
  const [bestScore, setBestScore] = useState<number | null>(null);
  const [badgeNames, setBadgeNames] = useState<string[]>([]);
  const [coins, setCoins] = useState<number>(0);
  const [photo, setPhoto] = useState<string | null>(null);

  useEffect(() => {
    if (!token) return;

    fetch(`${API_URL}/dashboard/${token}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.result) {
          setUserName(data.userName);
          setAverageScore(data.averageScore);
          setBestScore(data.bestScore);
          setBadgeNames(data.badgeNames);
          setCoins(data.coins);
        }
      })
      .catch((err) => console.error("Erreur dashboard:", err));
  }, [token]);

  // fetch(`${API_URL}/photos/${token}`)
  //   .then((res) => res.json())
  //   .then((data) => {
  //     if (data.result && data.photo?.url) {
  //       setPhoto(data.photo.url);
  //     }
  //   });

  return (
    <View style={styles.container}>
      <Text style={styles.greetings}>
        Salut <Text style={styles.userName}>{userName || "toi"}</Text>, prêt à
        tester ton <Text style={styles.aura}>aura</Text> ?
      </Text>

      <View style={styles.cardGrid}>
        <View style={styles.cardWrapper}>
          <View style={styles.card}>
            <FontAwesome name="trophy" size={40} color="#29ffc6" />
            <Text style={styles.cardText}>
              Tes badges ({badgeNames.length})
            </Text>
          </View>

          <View style={styles.card}>
            <FontAwesome name="thumbs-up" size={40} color="#ffac25" />
            <Text style={styles.cardText}>
              Ton score moyen
              {averageScore !== null ? averageScore.toFixed(2) : "-"}
            </Text>
          </View>

          <View style={styles.card}>
            <FontAwesome name="image" size={40} color="#8b43f1" />
            <Text style={styles.cardText}>Ta best photo</Text>
            {photo ? (
              <Image source={{ uri: photo }} style={styles.image} />
            ) : (
              <Text style={styles.cardText}>Chargement de la photo...</Text>
            )}
          </View>

          <View style={styles.card}>
            <FontAwesome name="star" size={40} color="#ff0084" />
            <Text style={styles.cardText}>
              Ta best score
              {bestScore !== null ? bestScore : "-"}
            </Text>
          </View>
        </View>

        <TouchableOpacity style={styles.pinkButton}>
          <Text style={styles.buttonText}>Gagne des coins</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.greenButton}>
          <Text style={styles.buttonText}>BUY PREMIUM</Text>
        </TouchableOpacity>

        <Text style={styles.coinInfo}>Il te reste {coins} coins</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#2a2e30",
    alignItems: "center",
    paddingTop: 120,
    paddingBottom: 120,
  },
  greetings: {
    color: "#fff",
    fontSize: 22,
    fontFamily: "Fredoka One",
    marginBottom: 30,
    textAlign: "center",
    paddingHorizontal: 20,
  },
  userName: {
    fontFamily: "Fredoka One",
    fontWeight: "bold",
    color: "#fff",
  },
  aura: {
    color: "#E7C6FF",
    fontWeight: "bold",
    fontFamily: "Fredoka One",
  },
  cardGrid: {
    backgroundColor: "#fff",
    borderRadius: 20,
    paddingVertical: 30,
    paddingHorizontal: 20,
    width: "90%",
    alignItems: "center",
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 10,
    elevation: 0,
    borderBottomWidth: 4,
    borderRightWidth: 4,
    borderColor: "#d1d9e6",
  },
  cardWrapper: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    width: "100%",
    marginBottom: 20,
  },
  card: {
    backgroundColor: "#fff",
    width: "48%",
    height: 120,
    marginBottom: 15,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",

    shadowColor: "#000",
    shadowOpacity: 0.4,
    shadowRadius: 6,
    shadowOffset: {
      width: 0,
      height: 4,
    },
    elevation: 2,
  },
  cardText: {
    color: "black",
    fontSize: 14,
    marginTop: 10,
    textAlign: "center",
    fontFamily: "Playpen Sans",
  },
  image: {
    width: "100%",
    height: 200,
    borderRadius: 12,
    marginTop: 8,
  },
  pinkButton: {
    backgroundColor: "#ff0084",
    paddingVertical: 10,
    paddingHorizontal: 50,
    borderRadius: 10,
    marginTop: 20,
    borderBottomWidth: 4,
    borderRightWidth: 4,
    borderColor: "#b3005c",
  },
  greenButton: {
    backgroundColor: "#29ffc6",
    paddingVertical: 10,
    paddingHorizontal: 50,
    borderRadius: 10,
    marginTop: 10,
    borderBottomWidth: 4,
    borderRightWidth: 4,
    borderColor: "#1fb198",
  },
  buttonText: {
    color: "#000",
    fontWeight: "bold",
    fontFamily: "Playpen Sans",
  },
  coinInfo: {
    marginTop: 20,
    paddingVertical: 8,
    paddingHorizontal: 20,
    borderRadius: 50,
    backgroundColor: "#fff",
    fontFamily: "Playpen Sans",
    color: "#333",
    textAlign: "center",
    shadowColor: "#000",
    shadowOffset: { width: -2, height: -2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 4,
  },
});
