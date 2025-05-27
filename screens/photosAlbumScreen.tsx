import React, { useEffect } from "react";
import { View, Text, StyleSheet, Alert } from "react-native";
import Constants from "expo-constants";
import AsyncStorage from "@react-native-async-storage/async-storage";

const API_URL = Constants.expoConfig?.extra?.API_URL ?? "";

export default function PhotosAlbumScreen() {
  useEffect(() => {
    const fetchPhotos = async () => {
      try {
        const token = await AsyncStorage.getItem("token");

        if (!token) {
          Alert.alert("Erreur", "Utilisateur non connecté");
          return;
        }

        const response = await fetch(`${API_URL}/photos`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });

        if (!response.ok) {
          throw new Error("Erreur lors de la récupération des photos");
        }

        const data = await response.json();
        console.log("Photos récupérées:", data);
      } catch (error: any) {
        console.error("Erreur:", error.message);
        Alert.alert("Erreur", error.message);
      }
    };

    fetchPhotos();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Album photo</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#2a2e30",
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    fontSize: 24,
    color: "#fff",
    fontWeight: "bold",
  },
});
