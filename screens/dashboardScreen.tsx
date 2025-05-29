import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Pressable,
  Image,
} from "react-native";
import {
  useRoute,
  RouteProp,
  useNavigation,
  NavigationProp,
} from "@react-navigation/native";
import _FontAwesome from "@react-native-vector-icons/fontawesome";
const FontAwesome = _FontAwesome as React.ElementType;
import Constants from "expo-constants";
import { useSelector } from "react-redux";
import { colors } from "../theme/colors";
import { UserState } from "../reducers/users";

type RootStackParamList = {
  Dashboard: { token: string };
  subscribe: undefined;
};

type DashboardParams = {
  Dashboard: { token: string };
};
const API_URL = Constants.expoConfig?.extra?.API_URL ?? "";

export default function DashboardScreen() {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const { email, coins, guestCoins } = useSelector(
    (state: { users: UserState & { value: any } }) => state.users.value
  );
  const route = useRoute<RouteProp<DashboardParams, "Dashboard">>();
  const token = route.params?.token;
  const isGuest = email === "";
  const currentCoins = isGuest ? guestCoins : coins;
  // Récupérer le pseudo depuis le store Redux
  const storedPseudo = useSelector(
    (state: { users: { value: { pseudo: string } } }) =>
      state.users.value.pseudo
  );

  const [averageScore, setAverageScore] = useState<number | null>(null);
  const [bestScore, setBestScore] = useState<number | null>(null);
  const [badgeNames, setBadgeNames] = useState<string[]>([]);
  const [photo, setPhoto] = useState<string | null>(null);

  useEffect(() => {
    if (!token) return;

    fetch(`${API_URL}/dashboard/${token}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.result) {
          setAverageScore(data.averageScore);
          setBestScore(data.bestScore);
          setBadgeNames(data.badgeNames);
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
        Salut <Text style={styles.userName}>{storedPseudo || "toi"}</Text>, prêt
        à tester ton <Text style={styles.aura}>aura</Text> ?
      </Text>

      <View style={styles.cardGrid}>
        <View style={styles.cardWrapper}>
          <View style={styles.card}>
            <FontAwesome name="trophy" size={40} color="#29ffc6" />
            <Text style={styles.cardText}>Tes badges {badgeNames.length}</Text>
          </View>

          <View style={styles.card}>
            <FontAwesome name="thumbs-up" size={40} color="#ffac25" />
            <Text style={styles.cardText}>
              Ton score moyen
              {averageScore !== null ? averageScore.toFixed(2) : ""}
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
              Ton best score
              {bestScore !== null ? bestScore : ""}
            </Text>
          </View>
        </View>

        <Pressable
          onPress={() => {
            // Action à définir ici si besoin
          }}
          style={({ pressed }) => [
            styles.pinkButton,
            pressed && styles.buttonPressed,
          ]}
        >
          <Text style={styles.buttonText}>GAGNE DES COINS</Text>
        </Pressable>

        <Pressable
          onPress={() => navigation.navigate("subscribe")}
          style={({ pressed }) => [
            styles.greenButton,
            pressed && styles.buttonPressed,
          ]}
        >
          <Text style={styles.buttonText}> BUY PREMIUM </Text>
        </Pressable>

        <Pressable
          style={({ pressed }) => [
            styles.coinInfo,
            pressed && styles.buttonPressed,
          ]}
        >
          <Text style={styles.buttonText2}>
            Il te reste {currentCoins} {isGuest ? "/ 3 " : ""}coins
          </Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.background.main,
    alignItems: "center",
    paddingTop: 120,
    paddingBottom: 120,
  },
  greetings: {
    color: colors.text.primary,
    fontSize: 22,
    fontFamily: "Fredoka One",
    marginBottom: 30,
    textAlign: "center",
    paddingHorizontal: 20,
  },
  userName: {
    fontFamily: "Fredoka One",
    fontWeight: "bold",
    color: colors.text.primary,
  },
  aura: {
    color: colors.primary.light,
    fontWeight: "bold",
    fontFamily: "Fredoka One",
  },
  cardGrid: {
    backgroundColor: "#1e1e1e",
    borderRadius: 24,
    paddingVertical: 30,
    paddingHorizontal: 20,
    width: "90%",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: -6, height: -6 },
    shadowOpacity: 0.6,
    shadowRadius: 10,
    elevation: 10,
  },
  cardWrapper: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    width: "100%",
    marginBottom: 20,
  },
  card: {
    backgroundColor: colors.specific.gray.dark,
    width: "48%",
    height: 120,
    marginBottom: 15,
    borderRadius: 24,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: -4, height: -4 },
    shadowOpacity: 0.4,
    shadowRadius: 8,
    elevation: 8,
  },
  cardText: {
    color: "#ffffff",
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
    width: "80%",
    backgroundColor: "#29ffc6",
    paddingVertical: 12,
    paddingHorizontal: 40,
    borderRadius: 10,
    marginVertical: 10,
    alignItems: "center",
  },
  greenButton: {
    width: "80%",
    backgroundColor: "#29ffc6",
    paddingVertical: 12,
    paddingHorizontal: 40,
    borderRadius: 10,
    marginVertical: 10,
    alignItems: "center",
  },
  buttonText: {
    color: "#2a2e30",
    fontWeight: "bold",
    fontFamily: "Playpen Sans",
  },
  buttonText2: {
    color: colors.primary.light,
    fontWeight: "bold",
    fontFamily: "Playpen Sans",
  },
  coinInfo: {
    marginTop: 20,
    paddingVertical: 12,
    paddingHorizontal: 40,
    borderRadius: 9999,
    backgroundColor: "#2a2a2a",
    fontFamily: "Playpen Sans",
    color: "#8b43f1", // même violet que les autres boutons
    textAlign: "center",
    fontWeight: "bold",
    shadowColor: "#000",
    shadowOffset: { width: 4, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 6,
  },

  buttonPressed: {
    transform: [{ translateY: 2 }],
    shadowOffset: { width: 2, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 2,
  },
});
