import React from "react";
import { Modal, View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { toggleZone, setTone } from "../reducers/filters";
import Constants from "expo-constants";
import Slider from "@react-native-community/slider";
import type { RootState } from "../App"; // Type global du store Redux

const API_URL = Constants.expoConfig?.extra?.API_URL ?? "";
// pour aller chercher l'info dans le fichier app.config.js qui elle va chercher la variable d'environnement.

type FilterModalProps = {
  // Création du type FilterModalProps avec 2 props
  visible: boolean; // Pour afficher ou cacher la modale
  onClose: () => void; // Fonction qui ne prend rien en paramètre et ne retourne rien (à appeler quand on veut fermer la modale)
  token: string;
  photoId: string;
};

const FilterModal = ({
  visible,
  onClose,
  token,
  photoId,
}: FilterModalProps) => {
  const dispatch = useDispatch();
  const filters = useSelector((state: RootState) => state.filters);

  // Récupération de la liste des zones à partir de l'état Redux,
  // en forçant TypeScript à comprendre que ce sont les clés de filters.zones
  const zonesList = Object.keys(filters.zones) as Array<
    keyof typeof filters.zones
  >;

  // État local pour afficher/cacher la liste des zones à filtrer
  const [zonesOpen, setZonesOpen] = React.useState(false);

  // Fonction qui envoie les filtres au backend via POST
  const handleAnalyze = async () => {
    console.log("Bouton Appliquer cliqué");
    try {
      console.log(API_URL);
      const response = await fetch(`${API_URL}/photos/analyze`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          token,
          photoId,
          filters: {
            zones: filters.zones,
            tone: filters.tone,
          },
        }),
      });

      const data = await response.json();
      console.log("Réponse backend :", data);
    } catch (error) {
      console.error("Erreur lors de l'analyse :", error);
    } finally {
      console.log("onClose called");
      onClose(); // Toujours fermer la modale, succès ou échec
    }
  };

  return (
    <Modal visible={visible} animationType="slide" transparent>
      <View style={styles.overlay}>
        <View style={styles.modalContainer}>
          <TouchableOpacity style={styles.closeButton} onPress={onClose}>
            <Text style={styles.closeButtonText}>×</Text>
          </TouchableOpacity>
          <Text style={styles.title}>Filtres</Text>
          {/* Dans le rendu, on affiche un toggle pour afficher ou non les zones */}
          <Text style={styles.label} onPress={() => setZonesOpen(!zonesOpen)}>
            Que veux-tu qu’on juge ? {zonesOpen ? "▲" : "▼"}
          </Text>
          {/* Si zonesOpen est true, on map sur toutes les zones,
    et pour chacune, on affiche un checkbox "customisé" */}
          {zonesOpen && (
            <View style={styles.zonesList}>
              {zonesList.map((zone) => (
                <View key={zone} style={styles.checkboxContainer}>
                  <TouchableOpacity
                    style={[
                      styles.neumorphicCheckbox,
                      filters.zones[zone] && { backgroundColor: "#8B43F1" },
                    ]}
                    onPress={() => dispatch(toggleZone(zone))} // toggle dans Redux
                  >
                    {/* Si la zone est sélectionnée, afficher un ✔ */}
                    {filters.zones[zone] && (
                      <Text style={{ color: "#fff" }}>✔</Text>
                    )}
                  </TouchableOpacity>
                  <Text style={styles.checkboxLabel}>
                    {zone.charAt(0).toUpperCase() + zone.slice(1)}
                  </Text>
                </View>
              ))}
            </View>
          )}
          <Text style={styles.label}>Degré de gentillesse</Text>
          <View style={styles.sliderWrapper}>
            <Text style={styles.sliderLabel}>Sois cash</Text>
            <View style={styles.sliderContainer}>
              <Slider
                style={styles.slider}
                minimumValue={0}
                maximumValue={100}
                step={1}
                value={filters.tone}
                onValueChange={(value) => dispatch(setTone(value))}
                // Quand le user bouge le slider, on envoie l'info à Redux via l'action setTone.
                // On dispatche dans dans Redux pour stocker ça et l'envoyer au backend
                minimumTrackTintColor="#8B43F1"
                maximumTrackTintColor="#555"
                thumbTintColor="#fff"
              />
            </View>
            <Text style={styles.sliderLabel}>Sois gentil steuplé !</Text>
          </View>
          <TouchableOpacity style={styles.applyButton} onPress={handleAnalyze}>
            <Text style={styles.applyText}>Appliquer</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};
export default FilterModal;

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "#000000aa",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContainer: {
    width: "90%",
    backgroundColor: "#1e1e1e",
    borderRadius: 24,
    padding: 24,
    shadowColor: "#000",
    shadowOffset: { width: -6, height: -6 }, // L'ombre se projette vers le haut et la gauche
    shadowOpacity: 0.6,
    shadowRadius: 10, // Flou de l'ombre
    elevation: 10, // Effet d'élévation (pour Android uniquement)
  },
  closeButton: {
    position: "absolute",
    top: 10,
    right: 10,
    zIndex: 1, // Comme des calques : le plus élevé passe sur les autres éléments
    width: 32,
    height: 32,
    alignItems: "center",
    justifyContent: "center",
  },
  closeButtonText: {
    color: "#fff",
    fontSize: 24,
    lineHeight: 24, // Définit la hauteur entre les lignes du texte
  },
  title: {
    fontSize: 26,
    color: "#fff",
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 20,
  },
  label: {
    fontSize: 18,
    color: "#fff",
    marginTop: 10,
    marginBottom: 6,
  },
  zonesList: {
    marginBottom: 10,
  },
  checkboxContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 6,
  },
  checkboxLabel: {
    color: "#fff",
    marginLeft: 8,
    fontSize: 16,
  },
  zoneItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderColor: "#444",
  },
  zoneSelected: {
    backgroundColor: "#8a2be2",
  },
  zoneText: {
    color: "#fff",
    fontSize: 16,
  },
  neumorphicCheckbox: {
    width: 36,
    height: 36,
    borderRadius: 18,
    margin: 6,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#1e1e1e",
    shadowColor: "#000",
    shadowOffset: { width: -2, height: -2 },
    shadowOpacity: 0.4,
    shadowRadius: 4,
    elevation: 4,
  },

  sliderContainer: {
    width: 160,
    height: 50,
    borderRadius: 20,
    backgroundColor: "#1e1e1e",
    shadowColor: "#000",
    shadowOffset: { width: -2, height: -2 },
    shadowOpacity: 0.5,
    shadowRadius: 6,
    justifyContent: "center",
    elevation: 6,
    paddingHorizontal: 10,
  },
  slider: {
    height: 40,
    width: "100%",
  },
  sliderWrapper: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 10,
    justifyContent: "center",
  },
  sliderLabel: {
    color: "#fff",
    fontSize: 12,
    width: 70,
    textAlign: "center",
  },
  applyButton: {
    backgroundColor: "#2a2a2a",
    borderRadius: 20,
    marginTop: 20,
    paddingVertical: 12,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 4, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 6,
  },
  applyText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
});
