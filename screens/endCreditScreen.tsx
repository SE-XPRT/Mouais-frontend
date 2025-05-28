import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { FontAwesome } from "@expo/vector-icons";
import { colors } from "../theme/colors";
// Typage des routes disponibles dans ce stack
type DashboardStackParamList = {
  subscribe: undefined;
  endCredit: undefined;
};

// Composant principal de la page
const EndCreditScreen = () => {
  const navigation = useNavigation<NavigationProp<DashboardStackParamList>>();

  return (
    // Conteneur principal avec fond sombre
    <View style={styles.container}>
      {/* Titre de fin en gras */}
      <Text style={styles.title}>T'as tout donné BG !</Text>

      {/* Message explicatif */}
      <Text style={styles.message}>
        Tu as utilisé tes 3 BG coins gratuits !{"\n"}
        Recharge-les ou choisis ton abonnement pour continuer à glow-up !
      </Text>

      {/* Bloc bouton */}
      <View style={styles.buttonContainer}>
        {/* Bouton : Aller à la page d'abonnement */}
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate("subscribe")}
        >
          <FontAwesome name="credit-card" size={16} color="#ffffff" />
          <Text style={styles.buttonText}> Abonne toi</Text>
        </TouchableOpacity>
        {/* Bouton retour */}
        <TouchableOpacity
          style={styles.validateButton}
          onPress={() => navigation.goBack()}
          accessibilityLabel="Retour"
        >
          <Text style={styles.gradientText}>Retour</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default EndCreditScreen;

// Styles adaptés à ta charte graphique (identiques à subscriptionScreen)
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background.card, // fond sombre
    padding: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    color: "#ffffff",
    fontWeight: "bold",
    fontSize: 20,
    marginBottom: 15,
    textAlign: "center",
  },
  message: {
    color: "#d395ff", // violet clair
    fontSize: 16,
    textAlign: "center",
    marginBottom: 30,
  },
  buttonContainer: {
    width: "100%",
    gap: 15,
  },
  button: {
    flexDirection: "row",
    backgroundColor: "#3a3f42", // fond bouton foncé
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
  },
  buttonText: {
    color: "#ffffff",
    fontWeight: "600",
    fontSize: 16,
  },
  validateButtonText: {
    color: "#2a2e30",
    fontWeight: "bold",
    fontSize: 16,
  },
  validateButton: {
    backgroundColor: colors.specific.green,
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 10,
  },
  gradientText: {
    color: "#2a2e30",
    fontWeight: "bold",
    fontSize: 16,
  },
});
