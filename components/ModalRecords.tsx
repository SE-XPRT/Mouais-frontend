import React, { useEffect, useState } from "react";
import {
  Modal,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { setRecords, setLoading, setError } from "../reducers/records";
import Constants from "expo-constants";
import type { RootState } from "../store";

const API_URL = Constants.expoConfig?.extra?.API_URL ?? "";

type ModalRecordsProps = {
  visible: boolean;
  onClose: () => void;
};

export default function ModalRecords({ visible, onClose }: ModalRecordsProps) {
  const dispatch = useDispatch();
  const { photosTaken, averageRate, averagePhotosPerDay, loading, error } =
    useSelector((state: RootState) => state.records);
  const { token } = useSelector((state: RootState) => state.users.value);

  const [isPressed, setIsPressed] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      if (!token) return;

      dispatch(setLoading(true));
      try {
        const response = await fetch(`${API_URL}/records/${token}`);
        const data = await response.json();
        if (response.status === 201) {
          console.log("🎉 Nouveau record créé automatiquement !");
        }
        dispatch(setRecords(data));
      } catch (error: any) {
        dispatch(setError(error.message || "Erreur inconnue"));
      } finally {
        dispatch(setLoading(false));
      }
    };

    if (visible) fetchData();
  }, [visible, token]);

  // ✨ Gestion des valeurs 0 avec emojis
  const displayValue = (value: number, emoji: string) => {
    return value > 0 ? `${value}` : emoji;
  };

  return (
    <Modal visible={visible} animationType="slide" transparent>
      <View style={styles.overlay}>
        <View style={styles.modalContainer}>
          <Text style={styles.title}>💜 Tes stats perso</Text>

          {loading ? (
            <ActivityIndicator size="large" color="#8b43f1" />
          ) : error ? (
            <Text style={styles.errorText}>Erreur : {error}</Text>
          ) : (
            <>
              <View style={styles.card}>
                <Text style={styles.emoji}>📸</Text>
                <Text style={styles.statLabel}>Photos prises</Text>
                <Text style={styles.statValue}>
                  {photosTaken > 0 ? photosTaken : "🚫"}
                </Text>
              </View>

              <View style={styles.card}>
                <Text style={styles.emoji}>⭐</Text>
                <Text style={styles.statLabel}>Note moyenne</Text>
                <Text style={styles.statValue}>
                  {averageRate > 0 ? averageRate.toFixed(2) : "🤷‍♀️"}
                </Text>
              </View>

              <View style={styles.card}>
                <Text style={styles.emoji}>📆</Text>
                <Text style={styles.statLabel}>Moyenne photos/jour</Text>
                <Text style={styles.statValue}>
                  {averagePhotosPerDay > 0
                    ? averagePhotosPerDay.toFixed(2)
                    : "🫠"}
                </Text>
              </View>
            </>
          )}

          <TouchableOpacity
            style={[styles.button, isPressed && styles.buttonPressed]}
            onPressIn={() => setIsPressed(true)}
            onPressOut={() => {
              setIsPressed(false);
              onClose(); // Appelle la fermeture après le relâchement
            }}
            activeOpacity={1}
          >
            <Text style={styles.buttonText}>Fermer</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.4)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContainer: {
    backgroundColor: "#f0f0f3",
    padding: 25,
    borderRadius: 20,
    width: "85%",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 10,
  },
  title: {
    fontSize: 22,
    marginBottom: 30,
    fontWeight: "bold",
    color: "black",
  },
  statsBox: {
    backgroundColor: "#e0e0e0",
    padding: 20,
    borderRadius: 15,
    width: "100%",
    marginBottom: 20,
    shadowColor: "#ffffff",
    shadowOffset: { width: -5, height: -5 },
    shadowOpacity: 1,
    shadowRadius: 8,
  },
  statText: {
    fontSize: 16,
    color: "#444",
    marginBottom: 20,
    textAlign: "left",
  },
  errorText: {
    color: "#ff4444",
    fontWeight: "600",
    marginBottom: 10,
  },
  button: {
    marginTop: 20,
    paddingVertical: 12,
    paddingHorizontal: 30,
    backgroundColor: "#8b43f1",
    borderRadius: 12,
    shadowColor: "#a366f7",
    shadowOffset: { width: -4, height: -4 },
    shadowOpacity: 1,
    shadowRadius: 5,
    elevation: 5,
    alignItems: "center",
    justifyContent: "center",
  },
  buttonPressed: {
    backgroundColor: "#732ed4",
    shadowColor: "#5e22c1",
    shadowOffset: { width: 4, height: 4 },
    shadowOpacity: 0.4,
    shadowRadius: 5,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },

  card: {
    backgroundColor: "#e6e6eb",
    width: "100%",
    borderRadius: 15,
    padding: 16,
    alignItems: "center",
    marginBottom: 20,
    shadowColor: "#fff",
    shadowOffset: { width: -6, height: -6 },
    shadowOpacity: 1,
    shadowRadius: 6,
    elevation: 5,
  },
  emoji: {
    fontSize: 28,
    marginBottom: 8,
  },

  statLabel: {
    fontSize: 16,
    color: "#555",
    marginBottom: 6,
    fontWeight: "600",
  },

  statValue: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#222",
  },
});
