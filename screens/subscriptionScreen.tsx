import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from "react-native";
import { FontAwesome } from "@expo/vector-icons"; // Librairie d'icônes
import { LinearGradient } from "expo-linear-gradient"; // Composant pour créer un dégradé
import { SafeAreaView } from "react-native-safe-area-context";
// Liste des abonnements disponibles
const options = [
  { label: "10 coins / jour - 0,99 €", icon: "child" },
  { label: "20 coins / jour - 1,99 €", icon: "heart" },
  { label: "30 coins / jour - 2,99 €", icon: "medal" },
  { label: "50 coins / jour - 5,99 €", icon: "trophy" },
];

const SubscriptionScreen = () => {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.container}>
        <Text style={styles.title}>Choisis ton abonnement</Text>

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

        {/* Boutons action */}
        <View style={styles.actions}>
          <TouchableOpacity style={styles.circleButton}>
            <FontAwesome name="arrow-left" size={24} color="#d395ff" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.circleButton}>
            <FontAwesome name="check" size={24} color="#d395ff" />
          </TouchableOpacity>
        </View>

        {/* Bouton principal */}
        <TouchableOpacity style={styles.applyButton}>
          <Text style={styles.applyText}>Appliquer</Text>
        </TouchableOpacity>

        {/* Footer navigation */}
        <View style={styles.footer}>
          <FontAwesome name="user" size={24} color="#ffffff" />
          <FontAwesome name="home" size={24} color="#ffffff" />
          <FontAwesome name="sliders" size={24} color="#ffffff" />
        </View>
      </View>
    </SafeAreaView>
  );
};

// 🎨 Styles mis à jour
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#2a2e30",
    padding: 20,
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
    backgroundColor: "#3a3f42", // fond sombre
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
  actions: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: 20,
    marginBottom: 10,
  },
  circleButton: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: "#3a3f42",
    justifyContent: "center",
    alignItems: "center",
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
  footer: {
    flexDirection: "row",
    justifyContent: "space-around",
    paddingVertical: 12,
    borderTopWidth: 1,
    borderTopColor: "#444",
  },
});

export default SubscriptionScreen;
