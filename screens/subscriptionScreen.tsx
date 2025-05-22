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

// Liste des abonnements disponibles
const options = [
  { label: "10 coins / jour - 0,99 €", icon: "child" },
  { label: "20 coins / jour - 1,99 €", icon: "heart" },
  { label: "30 coins / jour - 2,99 €", icon: "medal" },
  { label: "50 coins / jour - 5,99 €", icon: "trophy" },
];

const SubscriptionScreen = () => {
  // État pour suivre l’option sélectionnée (index dans le tableau)
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  return (
    <View style={styles.container}>
      {/* Titre principal de la page */}
      <Text style={styles.title}>Choisis ton abonnement</Text>

      {/* Liste des options avec défilement si trop longue */}
      <ScrollView contentContainerStyle={styles.optionList}>
        {options.map((opt, index) => {
          const selected = selectedIndex === index;

          return (
            <TouchableOpacity
              key={index}
              onPress={() => setSelectedIndex(index)}
            >
              {/* Si l’option est sélectionnée → on affiche un dégradé */}
              {selected ? (
                <LinearGradient
                  colors={["#8B43F1", "#D395FF"]} // Violet vers rose
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 0 }}
                  style={styles.optionRow}
                >
                  {/* Texte blanc sur fond violet-rose */}
                  <Text style={[styles.optionText, { color: "#ffffff" }]}>
                    {opt.label}
                  </Text>
                  {/* Icône avec fond semi-transparent blanc */}
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
                // Sinon on affiche une ligne classique
                <View style={styles.optionRow}>
                  <Text style={styles.optionText}>{opt.label}</Text>
                  <View style={styles.iconContainer}>
                    <FontAwesome
                      name={opt.icon as any}
                      size={24}
                      color="#2a2e30"
                    />
                  </View>
                </View>
              )}
            </TouchableOpacity>
          );
        })}
      </ScrollView>

      {/* Deux boutons d’action : retour et valider */}
      <View style={styles.actions}>
        <TouchableOpacity style={styles.circleButton}>
          <FontAwesome name="arrow-left" size={24} color="#2a2e30" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.circleButton}>
          <FontAwesome name="check" size={24} color="#2a2e30" />
        </TouchableOpacity>
      </View>

      {/* Bouton BG coins (ex : voir son solde) */}
      <TouchableOpacity style={styles.coinsButton}>
        <Text style={styles.coinsText}>BG coins</Text>
      </TouchableOpacity>

      {/* Barre de navigation en bas avec 3 icônes */}
      <View style={styles.footer}>
        <FontAwesome name="user" size={24} color="#2a2e30" />
        <FontAwesome name="home" size={24} color="#2a2e30" />
        <FontAwesome name="sliders" size={24} color="#2a2e30" />
      </View>
    </View>
  );
};

// 🎨 Styles définis en fonction de ta charte graphique
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff", // Fond blanc
    padding: 20,
    justifyContent: "flex-start",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#2a2e30", // Texte noir graphique
    marginBottom: 20,
  },
  optionList: {
    paddingBottom: 30,
  },
  optionRow: {
    flexDirection: "row", // Texte + icône côte à côte
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 12,
    paddingHorizontal: 15,
    marginBottom: 12,
    borderRadius: 10,
    backgroundColor: "#f5f5f5", // Fond gris clair par défaut
  },
  optionText: {
    fontSize: 16,
    fontStyle: "italic",
    color: "#2a2e30", // Texte noir
    flex: 1,
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 8,
    backgroundColor: "#eaeaea", // Fond gris clair
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
    backgroundColor: "#eaeaea", // Bouton rond clair
    justifyContent: "center",
    alignItems: "center",
  },
  coinsButton: {
    backgroundColor: "#2a2e30", // Fond noir charte
    paddingVertical: 10,
    paddingHorizontal: 25,
    borderRadius: 8,
    alignSelf: "center",
    marginVertical: 10,
  },
  coinsText: {
    color: "#ffffff", // Texte blanc
    fontWeight: "bold",
  },
  footer: {
    flexDirection: "row",
    justifyContent: "space-around",
    paddingVertical: 12,
    borderTopWidth: 1,
    borderTopColor: "#ccc",
  },
});

export default SubscriptionScreen;
