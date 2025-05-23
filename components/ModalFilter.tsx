import React from "react";
import { Modal, View, Text, TouchableOpacity, StyleSheet } from "react-native";
import Checkbox from "expo-checkbox";
import { useDispatch, useSelector } from "react-redux";
import { toggleZone, setTone } from "../reducers/filters";
import Constants from "expo-constants";
import Slider from "@react-native-community/slider";
import type { RootState } from "../App";

const API_URL = Constants.expoConfig?.extra?.API_URL ?? "";

type FilterModalProps = {
  visible: boolean;
  onClose: () => void;
};

const FilterModal = ({ visible, onClose }: FilterModalProps) => {
  const dispatch = useDispatch();
  const filters = useSelector((state: RootState) => state.filters);

  const zonesList = Object.keys(filters.zones) as Array<
    keyof typeof filters.zones
  >;

  const [zonesOpen, setZonesOpen] = React.useState(false);

  const handleAnalyze = async () => {
    try {
      const response = await fetch(`${API_URL}/photos/analyze`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          filters: {
            zones: filters.zones,
            tone: filters.tone,
          },
        }),
      });

      const data = await response.json();
      console.log("Réponse backend :", data);

      onClose(); // Fermer la modale après l’envoi
    } catch (error) {
      console.error("Erreur lors de l'analyse :", error);
    }
  };

  return (
    <Modal visible={visible} animationType="slide" transparent>
      <View style={styles.overlay}>
        <View style={styles.modalContainer}>
          <Text style={styles.title}>Filtres</Text>

          <Text style={styles.label} onPress={() => setZonesOpen(!zonesOpen)}>
            Que veux-tu qu’on juge ? {zonesOpen ? "▲" : "▼"}
          </Text>

          {zonesOpen && (
            <View style={styles.zonesList}>
              {zonesList.map((zone) => (
                <View key={zone} style={styles.checkboxContainer}>
                  <Checkbox
                    value={!!filters.zones[zone]}
                    onValueChange={() => dispatch(toggleZone(zone))}
                    color="#D96DFF"
                  />
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
            <Slider
              style={{ flex: 1, height: 40 }}
              minimumValue={0}
              maximumValue={100}
              step={1}
              value={filters.tone}
              onValueChange={(value) => dispatch(setTone(value))}
              minimumTrackTintColor="#D96DFF"
              maximumTrackTintColor="#333"
              thumbTintColor="#FF4FB2"
            />
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
    shadowOffset: { width: -6, height: -6 },
    shadowOpacity: 0.6,
    shadowRadius: 10,
    elevation: 10,
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
