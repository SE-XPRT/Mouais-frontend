import React from "react";
import { View, Text, Switch, StyleSheet, Button } from "react-native";
import Slider from "@react-native-community/slider";
import { useSelector, useDispatch } from "react-redux";
import { toggleZone, setTone, FiltersState } from "../reducers/filters";
import Constants from "expo-constants";

const API_URL = Constants.expoConfig?.extra?.API_URL ?? ""; // pour aller chercher l'info dans le fichier app.config.js qui elle va chercher la variable d'environnement.

const Filters = () => {
  const dispatch = useDispatch();

  const filters = useSelector(
    (state: { filters: FiltersState }) => state.filters
  );
  const { zones, tone } = filters;

  const handleToggleZone = (zone: keyof typeof zones) => {
    dispatch(toggleZone(zone));
  };
  // Quand l’utilisateur clique sur une zone, j’envoie cette zone à Redux pour la basculer :
  // zone est une string comme "smile" ou "makeup"
  // keyof typeof zones limite la saisie aux noms précisés dans le slice filters.ts
  // dispatch(toggleZone(zone)) envoie l'action au reducer

  const handleToneChange = (value: number) => {
    dispatch(setTone(value));
  };

  const handleValidation = () => {
    fetch(`${API_URL}/photos/analyze`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ filters: { zones, tone } }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log("🧠 Réponse de l'analyse :", data);
      })
      .catch((error) => {
        console.error("Erreur lors de l'analyse :", error);
      });
  };

  const getToneMsg = () => {
    if (tone < 25) return "Prépare-toi à prendre cher";
    if (tone < 50) return "Un brin piquant";
    if (tone < 75) return "Honnêteté chill";
    return "Douceur et bienveillance";
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Choisis tes zones d'analyse</Text>
      {(Object.keys(zones) as (keyof typeof zones)[]).map((zone) => (
        // Object.keys(zones) retourne un string[] par défaut
        // (keyof typeof zones)[] pour forcer le typage et avoir la bonne autocomplétion des zones (cheveux, smile...)
        <View key={zone} style={styles.option}>
          <Text style={styles.label}>{zone}</Text>
          <Switch
            value={zones[zone]}
            onValueChange={() => handleToggleZone(zone)}
          />
          {/* Ce Switch affiche l’état de la zone, et la change quand on clique dessus. */}
        </View>
      ))}

      <Text style={styles.title}>Niveau de gentillesse</Text>
      <Slider
        minimumValue={0}
        maximumValue={100}
        step={1}
        value={tone}
        onValueChange={handleToneChange}
        style={styles.slider}
      />
      <Text style={styles.toneText}>{getToneMsg()}</Text>
      <Button title="Valider les filtres" onPress={handleValidation} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { padding: 20 },
  title: { fontSize: 18, fontWeight: "bold", marginVertical: 10 },
  option: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginVertical: 5,
  },
  label: { fontSize: 16 },
  slider: { marginVertical: 15 },
  toneText: { textAlign: "center", fontStyle: "italic", marginBottom: 15 },
});

export default Filters;
