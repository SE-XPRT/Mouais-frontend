import React, { useEffect } from "react";
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
import type { RootState } from "../App"; // Type global du store Redux

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

  useEffect(() => {
    const fetchData = async () => {
      if (!token) return;

      dispatch(setLoading(true));
      try {
        const response = await fetch(`${API_URL}/records/${token}`);
        console.log("API_URL ==>", API_URL);

        const data = await response.json();

        // Nouveau record créé automatiquement
        if (response.status === 201) {
          console.log("🎉 Nouveau record créé automatiquement !");
        }

        dispatch(setRecords(data));
      } catch (error: any) {
        console.log("Erreur fetch records ==>", error);
        dispatch(setError(error.message || "Erreur inconnue"));
      } finally {
        dispatch(setLoading(false));
      }
    };

    if (visible) fetchData();
  }, [visible, token]);

  return (
    <Modal visible={visible} animationType="slide" transparent>
      <View style={styles.overlay}>
        <View style={styles.modalContainer}>
          <Text style={styles.title}>Tes records</Text>

          {loading ? (
            <ActivityIndicator size="large" color="#8b43f1" />
          ) : error ? (
            <Text style={styles.errorText}>Erreur : {error}</Text>
          ) : (
            <>
              <Text>Photos prises : {photosTaken}</Text>
              <Text>Note moyenne : {averageRate}</Text>
              <Text>Moyenne photos/jour : {averagePhotosPerDay}</Text>
            </>
          )}

          <TouchableOpacity style={styles.button} onPress={onClose}>
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
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContainer: {
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 10,
    width: "80%",
    alignItems: "center",
  },
  title: {
    fontSize: 20,
    marginBottom: 20,
    fontWeight: "bold",
  },
  errorText: {
    color: "red",
    marginBottom: 10,
  },
  button: {
    marginTop: 20,
    padding: 10,
    backgroundColor: "#8b43f1",
    borderRadius: 5,
  },
  buttonText: {
    color: "#fff",
  },
});
