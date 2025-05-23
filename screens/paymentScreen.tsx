import React from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { useRoute, RouteProp } from "@react-navigation/native";
import { FontAwesome } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { SafeAreaView } from "react-native-safe-area-context";

// Définition des types de routes pour le Stack imbriqué
export type DashboardStackParamList = {
  DashboardHome: undefined;
  subscribe: undefined;
  payment: { subscriptionLabel: string }; // Reçoit le texte de l'abonnement sélectionné
};

type PaymentScreenRouteProp = RouteProp<DashboardStackParamList, "payment">;

// Déclaration du composant PaymentScreen
const PaymentScreen = () => {
  // Récupération du paramètre passé via navigation
  const route = useRoute<PaymentScreenRouteProp>();
  const { subscriptionLabel } = route.params;

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.container}>
        {/* Titre principal */}
        <Text style={styles.title}>Choisis un mode de paiement</Text>

        {/* Modes de paiement : Stripe ou Carte */}
        <View style={styles.paymentRow}>
          <TouchableOpacity style={styles.paymentMethod}>
            <Text style={styles.paymentText}>stripe</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.paymentMethod}>
            <FontAwesome name="credit-card" size={28} color="#ffffff" />
          </TouchableOpacity>
        </View>

        {/* Entrée pour numéro de carte + infos complémentaires */}
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

        {/* Récapitulatif de la commande avec dégradé */}
        <Text style={styles.subtitle}>Voici ta commande :</Text>
        <LinearGradient
          colors={["#ff0084", "#eeeaec"]}
          style={styles.gradientBox}
        >
          <Text style={styles.gradientText}>{subscriptionLabel}</Text>
        </LinearGradient>

        {/* Bouton de validation du paiement */}
        <TouchableOpacity style={styles.validateButton}>
          <Text style={styles.validateButtonText}>Valider le paiement</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

// Styles de la page de paiement
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#2a2e30",
    padding: 20,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#ffffff",
    marginBottom: 20,
    textAlign: "center",
    textShadowColor: "#000",
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 4,
  },
  paymentRow: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginBottom: 20,
  },
  paymentMethod: {
    backgroundColor: "#3a3f42",
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
    marginBottom: 20,
  },
  input: {
    backgroundColor: "#3a3f42",
    color: "#ffffff",
    borderRadius: 10,
    paddingHorizontal: 15,
    paddingVertical: 10,
    fontSize: 16,
    marginBottom: 10,
  },
  subInputRow: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  inputSmall: {
    backgroundColor: "#3a3f42",
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
    fontSize: 16,
  },
  gradientBox: {
    borderRadius: 12,
    padding: 15,
    alignItems: "center",
    marginBottom: 20,
  },
  gradientText: {
    color: "#2a2e30",
    fontWeight: "bold",
    fontSize: 16,
  },
  validateButton: {
    backgroundColor: "#29ffc6",
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: "center",
  },
  validateButtonText: {
    color: "#2a2e30",
    fontWeight: "bold",
    fontSize: 16,
  },
});

// Export du composant pour utilisation dans la navigation
export default PaymentScreen;
