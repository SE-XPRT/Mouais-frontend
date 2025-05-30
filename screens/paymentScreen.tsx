import React from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import {
  useRoute,
  RouteProp,
  useNavigation,
  NavigationProp,
} from "@react-navigation/native";
import { FontAwesome } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { SafeAreaView } from "react-native-safe-area-context";
import { colors } from "../theme/colors";

// Types de navigation pour le stack Dashboard
export type DashboardStackParamList = {
  DashboardHome: undefined;
  subscribe: undefined;
  payment: { subscriptionLabel: string };
};

// Types de navigation pour le stack principal
export type RootStackParamList = {
  payment: { subscriptionLabel: string };
};

type PaymentScreenRouteProp = RouteProp<DashboardStackParamList, "payment">;

// Composant principal de l'écran de paiement
const PaymentScreen = () => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const route = useRoute<PaymentScreenRouteProp>();
  const { subscriptionLabel } = route.params;

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.container}>
        {/* Titre */}
        <Text style={styles.title}>Choisis un mode de paiement</Text>

        {/* Choix du mode de paiement */}
        <View style={styles.paymentRow}>
          <TouchableOpacity
            style={styles.paymentMethod}
            accessibilityLabel="Payer avec Stripe"
          >
            <Text style={styles.paymentText}>stripe</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.paymentMethod}
            accessibilityLabel="Payer par carte"
          >
            <FontAwesome name="credit-card" size={28} color="#ffffff" />
          </TouchableOpacity>
        </View>

        {/* Saisie des informations de carte */}
        <View style={styles.cardInputRow}>
          <TextInput
            style={styles.input}
            placeholder="143 2485 758 55"
            placeholderTextColor="#888"
            keyboardType="numeric"
          />
          <View style={styles.subInputRow}>
            <TextInput
              style={styles.inputSmall}
              placeholder="MM / DD"
              placeholderTextColor="#888"
            />
            <TextInput
              style={styles.inputSmall}
              placeholder="571"
              placeholderTextColor="#888"
              keyboardType="numeric"
            />
          </View>
        </View>

        {/* Récapitulatif de la commande */}
        <Text style={styles.subtitle}>Voici ta commande :</Text>
        <LinearGradient
          colors={["#ff0084", "#eeeaec"]}
          style={styles.gradientBox}
        >
          <Text style={styles.gradientText}>{subscriptionLabel}</Text>
        </LinearGradient>

        {/* Bouton de validation */}
        <TouchableOpacity style={styles.validateButton}>
          <Text style={styles.validateButtonText}>Valider le paiement</Text>
        </TouchableOpacity>
      </View>
      {/* Bouton retour */}
      <TouchableOpacity
        style={styles.goBackButton}
        onPress={() => navigation.goBack()}
        accessibilityLabel="Retour"
      >
        <Text style={styles.gradientText}>Retour</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

// Styles de l'écran de paiement
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background.main,
    padding: 20,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#ffffff",
    marginBottom: 30,
    textAlign: "center",
    textShadowColor: "#000",
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 4,
  },
  paymentRow: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginBottom: 40,
  },
  paymentMethod: {
    backgroundColor: colors.background.card,
    padding: 20,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOpacity: 0.3,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
  },
  paymentText: {
    color: "#ffffff",
    fontWeight: "bold",
    fontSize: 16,
  },
  cardInputRow: {
    marginBottom: 30,
  },
  input: {
    backgroundColor: colors.specific.white,
    color: "#ffffff",
    borderRadius: 10,
    paddingHorizontal: 15,
    paddingVertical: 10,
    fontSize: 16,
    marginBottom: 20,
  },
  subInputRow: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  inputSmall: {
    backgroundColor: colors.specific.white,
    color: "#ffffff",
    borderRadius: 10,
    paddingHorizontal: 15,
    paddingVertical: 10,
    fontSize: 16,
    width: "48%",
  },
  subtitle: {
    color: "#ffffff",
    marginBottom: 10,
    marginTop: 30,
    fontSize: 16,
  },
  gradientBox: {
    borderRadius: 12,
    padding: 15,
    alignItems: "center",
    marginBottom: 20,
    marginTop: 20,
  },
  gradientText: {
    color: "#2a2e30",
    fontWeight: "bold",
    fontSize: 16,
  },
  validateButton: {
    backgroundColor: colors.specific.green,
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 20,
  },
  validateButtonText: {
    color: "#2a2e30",
    fontWeight: "bold",
    fontSize: 16,
  },
  goBackButton: {
    backgroundColor: "#d395ff",
    paddingVertical: 10,
    paddingHorizontal: 80,
    borderRadius: 10,
    alignItems: "center",
    alignSelf: "center",
    marginTop: 10,
  },
});

export default PaymentScreen;
