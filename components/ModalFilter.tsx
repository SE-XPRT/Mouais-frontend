import React, { useRef } from "react";
import { Modal, View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { toggleZone, setTone } from "../reducers/filters";
import Constants from "expo-constants";
import Slider from "@react-native-community/slider";
import ModalBadge from "./ModalBadgeWin";
import type { RootState } from "../store";
import { Button } from "react-native";
import { setHasWonFilterBadge } from "../reducers/badges";

const API_URL = Constants.expoConfig?.extra?.API_URL ?? "";

type FilterModalProps = {
  visible: boolean;
  onClose: () => void;
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
  const hasWonFilterBadge = useSelector(
    (state: RootState) => state.badges.hasWonFilterBadge
  );

  const [badge, setBadge] = React.useState<null | {
    name: string;
    iconName: string;
  }>(null);
  const [badgeModalVisible, setBadgeModalVisible] = React.useState(false);
  // État local pour afficher/cacher la liste des zones à filtrer
  const [zonesOpen, setZonesOpen] = React.useState(false);

  const alreadyClickedRef = useRef(false);

  // Récupération de la liste des zones à partir de l'état Redux,
  const zonesList = Object.keys(filters.zones) as Array<
    keyof typeof filters.zones
  >;

  // Fonction qui envoie les filtres au backend via POST
  const handleAnalyze = async () => {
    try {
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

      if (!alreadyClickedRef.current && !hasWonFilterBadge) {
        alreadyClickedRef.current = true;

        setBadge({
          name: "Filtre Queen",
          iconName: "fire",
        });

        setBadgeModalVisible(true);
        dispatch(setHasWonFilterBadge(true));

        setTimeout(() => {
          setBadgeModalVisible(false); // Ferme d’abord la modal badge
          setTimeout(onClose, 500); // Puis ferme la modal principale après un petit délai
        }, 5500);
      } else {
        onClose();
      }
    } catch (error) {
      console.error("Erreur lors de l'analyse :", error);
      onClose();
    }
  };

  return (
    <Modal visible={visible} animationType="slide" transparent>
      <View style={styles.overlay}>
        {/* WRAPPER DU BOUTON DE TEST */}
        <View style={{ marginTop: 40, alignItems: "center" }}>
          <Button
            title="Reset Badge Test"
            onPress={() => {
              dispatch(setHasWonFilterBadge(false));
              alert("Redux badge reset !");
            }}
          />
        </View>
        <View style={styles.modalContainer}>
          <TouchableOpacity style={styles.closeButton} onPress={onClose}>
            <Text style={styles.closeButtonText}>×</Text>
          </TouchableOpacity>
          <Text style={styles.title}>💜 Mes filtres</Text>
          <Text style={styles.label} onPress={() => setZonesOpen(!zonesOpen)}>
            👉 Que veux-tu qu’on juge ? {zonesOpen ? "▲" : "▼"}
          </Text>
          {zonesOpen && (
            <View style={styles.zonesList}>
              {zonesList.map((zone) => (
                <View key={zone} style={styles.checkboxContainer}>
                  <TouchableOpacity
                    style={[
                      styles.neumorphicCheckbox,
                      filters.zones[zone] && { backgroundColor: "#8B43F1" },
                    ]}
                    onPress={() => dispatch(toggleZone(zone))}
                  >
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
          <Text style={styles.label}>👉 Degré de gentillesse</Text>
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
                minimumTrackTintColor="#8B43F1"
                maximumTrackTintColor="#555"
                thumbTintColor="#8B43F1"
              />
            </View>
            <Text style={styles.sliderLabel}>Sois gentil steuplé !</Text>
          </View>
          <TouchableOpacity style={styles.applyButton} onPress={handleAnalyze}>
            <Text style={styles.applyText}>Appliquer</Text>
          </TouchableOpacity>
        </View>
      </View>
      {badgeModalVisible && (
        <ModalBadge
          visible={badgeModalVisible}
          onClose={() => setBadgeModalVisible(false)}
          badge={badge}
        />
      )}
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
    shadowOffset: { width: -6, height: -6 },
    shadowOpacity: 0.6,
    shadowRadius: 10,
    elevation: 10,
  },
  closeButton: {
    position: "absolute",
    top: 10,
    right: 10,
    zIndex: 1,
    width: 32,
    height: 32,
    alignItems: "center",
    justifyContent: "center",
  },
  closeButtonText: {
    color: "#fff",
    fontSize: 24,
    lineHeight: 24,
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
    marginTop: 30,
    marginBottom: 20,
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
    backgroundColor: "#8B43F1",
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
