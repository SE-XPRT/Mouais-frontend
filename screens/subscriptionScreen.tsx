// screens/subscriptionScreen.tsx
import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation, NavigationProp } from "@react-navigation/native";
import { DashboardStackParamList } from "./paymentScreen"; // Import des types de routes
import { colors } from "../theme/colors";
// Liste des abonnements disponibles
const options = [
  { label: "10 coins - 0,99 €", icon: "child" },
  { label: "20 coins - 1,99 €", icon: "heart" },
  { label: "30 coins - 2,99 €", icon: "bullseye" },
  { label: "50 coins - 5,99 €", icon: "trophy" },
];

const SubscriptionScreen = () => {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null); // Suivi de l'option choisie
  const navigation = useNavigation<NavigationProp<DashboardStackParamList>>(); // Accès à la navigation typée

  // Fonction déclenchée lors du clic sur "Appliquer"
  const handleApply = () => {
    if (selectedIndex !== null) {
      const selected = options[selectedIndex];
      navigation.navigate("payment", { subscriptionLabel: selected.label }); // Envoie le label sélectionné à la page payment
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.container}>
        <Text style={styles.title}>Choisis ta formule</Text>

        {/* Liste des options d'abonnement */}
        <ScrollView contentContainerStyle={styles.optionList}>
          {options.map((opt, index) => {
            const selected = selectedIndex === index;

            return (
              <TouchableOpacity
                key={index}
                onPress={() => setSelectedIndex(index)}
              >
                {selected ? (
                  <LinearGradient
                    colors={["#8B43F1", "#D395FF"]}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 0 }}
                    style={styles.optionRow}
                  >
                    <Text style={[styles.optionText, { color: "#ffffff" }]}>
                      {opt.label}
                    </Text>
                    <View
                      style={[
                        styles.iconContainer,
                        { backgroundColor: "#ffffff20" },
                      ]}
                    >
                      <FontAwesome
                        name={opt.icon as any}
                        size={24}
                        color="#ffffff"
                      />
                    </View>
                  </LinearGradient>
                ) : (
                  <View style={[styles.optionRow, styles.optionRowUnselected]}>
                    <Text style={[styles.optionText, { color: "#d395ff" }]}>
                      {opt.label}
                    </Text>
                    <View style={styles.iconContainer}>
                      <FontAwesome
                        name={opt.icon as any}
                        size={24}
                        color="#d395ff"
                      />
                    </View>
                  </View>
                )}
              </TouchableOpacity>
            );
          })}
        </ScrollView>

        {/* Bouton principal "Appliquer" qui déclenche handleApply */}
        <TouchableOpacity style={styles.applyButton} onPress={handleApply}>
          <Text style={styles.applyText}>Appliquer</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

// Styles de la page
const styles = StyleSheet.create({
  container: {
    paddingTop: 40,
    flex: 1,
    backgroundColor: colors.background.main,
    padding: 20,
    display: "flex",
    justifyContent: "flex-start",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#ffffff",
    marginBottom: 20,
  },
  optionList: {
    paddingBottom: 30,
  },
  optionRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 12,
    paddingHorizontal: 15,
    marginBottom: 12,
    borderRadius: 12,
  },
  optionRowUnselected: {
    backgroundColor: colors.background.cardLight,
    borderWidth: 1,
    borderColor: "#d395ff",
  },
  optionText: {
    fontSize: 16,
    fontStyle: "italic",
    flex: 1,
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 8,
    backgroundColor: "#2a2e30",
    justifyContent: "center",
    alignItems: "center",
    marginLeft: 12,
  },
  applyButton: {
    backgroundColor: "#29ffc6",
    paddingVertical: 12,
    paddingHorizontal: 40,
    borderRadius: 10,
    alignSelf: "center",
    marginVertical: 10,
  },
  applyText: {
    color: "#2a2e30",
    fontWeight: "bold",
    fontSize: 16,
  },
});

export default SubscriptionScreen;
