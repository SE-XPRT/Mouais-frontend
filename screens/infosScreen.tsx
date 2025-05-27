import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  Dimensions,
  TextInput,
  ScrollView,
  Alert,
} from "react-native";
import _FontAwesome from "@react-native-vector-icons/fontawesome";
import { useSelector, useDispatch } from "react-redux";
import Constants from "expo-constants";
import { useNavigation } from "@react-navigation/native";
import { NavigationProp } from "@react-navigation/native";
import { LinearGradient } from "expo-linear-gradient";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { updatePseudo, logout } from "../reducers/users";
import ModalNewsletter from "../components/ModalNewsletter";
const FontAwesome = _FontAwesome as React.ElementType;
const backgroundColor = "#1a1a1f";
const textColor = "#fff";
const accentColor = "#8b43f1";
const accentGradient: [string, string] = ["#8b43f1", "#d395ff"];
const cardBg = "#2a2a30";
const cardBorder = "#3a3a40";
const labelColor = "#a0a0a0";
const valueColor = "#ffffff";
const dangerColor = "#ff4757";
const screenHeight = Dimensions.get("window").height;
const API_URL = Constants.expoConfig?.extra?.API_URL ?? "";
type RootStackParamList = {
  Login: undefined;
};

export default function InfosScreen() {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const dispatch = useDispatch();
  const email = useSelector(
    (state: { users: { value: { email: string } } }) => state.users.value.email
  );
  const token = useSelector(
    (state: { users: { value: { token: string } } }) => state.users.value.token
  );
  const storedPseudo = useSelector(
    (state: { users: { value: { pseudo: string } } }) =>
      state.users.value.pseudo
  );
  const [editMode, setEditMode] = useState(false);
  const [userData, setUserData] = useState({
    email: email,
    pseudo: storedPseudo,
  });
  const [editStyle, setEditStyle] = useState({
    backgroundColor: "#fff",
  });
  const [tempPseudo, setTempPseudo] = useState(storedPseudo);
  const [isLoading, setIsLoading] = useState(false);
  const [showNewsletter, setShowNewsletter] = useState(false);

  // Mettre à jour userData et tempPseudo quand storedPseudo change
  useEffect(() => {
    setUserData((prevData) => ({
      ...prevData,
      pseudo: storedPseudo,
    }));
    setTempPseudo(storedPseudo);
  }, [storedPseudo]);

  // Charger les données depuis le backend uniquement si nécessaire
  const loadUserData = async () => {
    // Si on a déjà un pseudo dans le store, pas besoin de charger depuis le backend
    if (storedPseudo) {
      return;
    }

    try {
      setIsLoading(true);
      const response = await fetch(`${API_URL}/users/get?token=${token}`);
      const data = await response.json();

      if (data.result) {
        const newPseudo = data.pseudo || "";
        dispatch(updatePseudo(newPseudo));
      }
    } catch (error) {
      console.error("Erreur lors du chargement des données:", error);
    } finally {
      setIsLoading(false);
    }
  };

  // Charger les données au démarrage seulement si nécessaire
  useEffect(() => {
    if (!storedPseudo) {
      loadUserData();
    }
  }, []);

  const saveUserData = async () => {
    try {
      if (tempPseudo && tempPseudo !== storedPseudo) {
        const response = await fetch(`${API_URL}/users/updatePseudo`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          body: JSON.stringify({
            token: token,
            pseudo: tempPseudo.trim(),
          }),
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();

        if (data.result) {
          // Mettre à jour le pseudo dans le store Redux (qui le sauvegarde dans AsyncStorage)
          dispatch(updatePseudo(tempPseudo.trim()));
          setEditMode(false);
          Alert.alert("Succès", "Pseudo mis à jour avec succès");
        } else {
          Alert.alert(
            "Erreur",
            data.error || "Impossible de mettre à jour le pseudo"
          );
          setTempPseudo(storedPseudo);
        }
      } else {
        setEditMode(false);
      }
    } catch (error) {
      console.error("Erreur lors de la sauvegarde des données:", error);
      Alert.alert(
        "Erreur",
        "Une erreur est survenue lors de la mise à jour du pseudo"
      );
      setTempPseudo(storedPseudo);
    }
  };

  const cancelEdit = () => {
    setTempPseudo(storedPseudo); // Restaurer le pseudo du store
    setEditMode(false);
  };

  const editTextInput = () => {
    setEditMode(!editMode);
    setEditStyle({
      backgroundColor: editMode ? "rgba(255,255,255,0.05)" : "#ffffff",
    });
  };
  const handleDelete = async () => {
    Alert.alert(
      "Suppression",
      "Voulez-vous vraiment supprimer votre compte ?",
      [
        { text: "Annuler", style: "cancel" },
        {
          text: "Supprimer",
          style: "destructive",
          onPress: async () => {
            try {
              const response = await fetch(`${API_URL}/users/delete`, {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify({
                  token: token,
                }),
              });

              const data = await response.json();

              if (data.result) {
                // Nettoyer le store Redux et AsyncStorage
                dispatch(logout());
                // Rediriger vers la page de login
                navigation.reset({
                  index: 0,
                  routes: [{ name: "Login" }],
                });
              } else {
                Alert.alert(
                  "Erreur",
                  data.error ||
                    "Une erreur est survenue lors de la suppression du compte"
                );
              }
            } catch (error) {
              Alert.alert(
                "Erreur",
                "Une erreur est survenue lors de la suppression du compte"
              );
            }
          },
        },
      ]
    );
  };
  return (
    <ScrollView contentContainerStyle={styles.bg}>
      <LinearGradient
        colors={["#1a1a1f", "#2a2a30"] as [string, string]}
        style={styles.gradientBg}
      >
        <View style={styles.container}>
          <View style={styles.avatarContainer}>
            <LinearGradient
              colors={accentGradient as [string, string]}
              style={styles.avatarGradient}
            >
              <Image
                source={require("../assets/user.png")}
                style={styles.userIcon}
              />
            </LinearGradient>
            <Text style={styles.username}>
              {isLoading ? "Chargement..." : userData.pseudo || "Anonyme"}
            </Text>
          </View>

          <View style={styles.card}>
            <View style={styles.cardHeader}>
              <Text style={styles.cardTitle}>Mes informations</Text>
              <TouchableOpacity
                style={styles.editButton}
                onPress={() => editTextInput()}
              >
                <FontAwesome name="edit" size={20} color={accentColor} />
              </TouchableOpacity>
            </View>

            <View style={styles.infoContainer}>
              <View style={styles.infoRow}>
                <Text style={styles.label}>Pseudo</Text>
                <TextInput
                  style={[
                    styles.value,
                    editMode
                      ? { backgroundColor: "#ffffff" }
                      : { backgroundColor: "rgba(255,255,255,0.05)" },
                  ]}
                  editable={editMode}
                  placeholder={
                    userData.pseudo
                      ? "Modifier votre pseudo"
                      : "Choisissez un pseudo"
                  }
                  placeholderTextColor={labelColor}
                  value={tempPseudo}
                  onChangeText={setTempPseudo}
                />
              </View>

              <View style={styles.infoRow}>
                <Text style={styles.label}>Email</Text>
                <TextInput
                  style={[
                    styles.value,
                    editMode
                      ? { backgroundColor: "#ffffff" }
                      : { backgroundColor: "rgba(255,255,255,0.05)" },
                  ]}
                  editable={false}
                  value={userData.email}
                />
              </View>

              {editMode && (
                <View style={styles.editButtonsContainer}>
                  <TouchableOpacity
                    style={[styles.editActionButton, styles.cancelButton]}
                    onPress={cancelEdit}
                  >
                    <Text style={styles.editActionButtonText}>Annuler</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={[styles.editActionButton, styles.validateButton]}
                    onPress={saveUserData}
                  >
                    <Text style={styles.editActionButtonText}>Valider</Text>
                  </TouchableOpacity>
                </View>
              )}
            </View>

            <TouchableOpacity
              style={styles.deleteButton}
              onPress={() => handleDelete()}
            >
              <FontAwesome
                name="trash"
                size={16}
                color="#fff"
                style={styles.deleteIcon}
              />
              <Text style={styles.deleteButtonText}>Supprimer mon compte</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.ButtonContainer}>
            <TouchableOpacity style={styles.actionButton}>
              <LinearGradient
                colors={accentGradient as [string, string]}
                style={styles.gradientButton}
              >
                <FontAwesome
                  name="credit-card"
                  size={20}
                  color="#fff"
                  style={styles.buttonIcon}
                />
                <Text style={styles.actionButtonText}>
                  Mes informations de paiement
                </Text>
              </LinearGradient>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.actionButton}
              onPress={() => setShowNewsletter(true)}
            >
              <LinearGradient
                colors={accentGradient as [string, string]}
                style={styles.gradientButton}
              >
                <FontAwesome
                  name="envelope"
                  size={20}
                  color="#fff"
                  style={styles.buttonIcon}
                />
                <Text style={styles.actionButtonText}>Newsletter</Text>
                <ModalNewsletter
                  visible={showNewsletter}
                  onClose={() => setShowNewsletter(false)}
                />
              </LinearGradient>
            </TouchableOpacity>
          </View>
        </View>
      </LinearGradient>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  bg: {
    backgroundColor: backgroundColor,
  },
  gradientBg: {
    paddingBottom: 40,
  },
  container: {
    alignItems: "center",
    padding: 20,
    paddingTop: 60,
  },
  avatarContainer: {
    alignItems: "center",
    marginBottom: 30,
  },
  avatarGradient: {
    padding: 3,
    borderRadius: 60,
    marginBottom: 15,
  },
  userIcon: {
    width: 110,
    height: 110,
    borderRadius: 55,
    backgroundColor: cardBg,
  },
  username: {
    fontSize: 24,
    color: textColor,
    fontWeight: "bold",
    letterSpacing: 1.2,
    textShadowColor: "rgba(0,0,0,0.3)",
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 4,
  },
  card: {
    width: "100%",
    borderRadius: 20,
    padding: 24,
    backgroundColor: cardBg,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.2,
    shadowRadius: 16,
    elevation: 8,
    borderWidth: 1,
    borderColor: cardBorder,
    marginBottom: 30,
  },
  cardHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 20,
    paddingBottom: 15,
    borderBottomWidth: 1,
    borderBottomColor: cardBorder,
  },
  cardTitle: {
    fontSize: 22,
    fontWeight: "bold",
    color: textColor,
    letterSpacing: 0.5,
  },
  editButton: {
    padding: 8,
    borderRadius: 12,
    backgroundColor: "rgba(139, 67, 241, 0.1)",
  },
  infoContainer: {
    gap: 16,
  },
  infoRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
  },
  label: {
    fontSize: 16,
    color: labelColor,
    width: 90,
    fontWeight: "600",
  },
  value: {
    flex: 1,
    fontSize: 16,
    color: "#000000",
    fontWeight: "500",
    paddingVertical: 12,
    paddingHorizontal: 16,
    backgroundColor: "#ffffff",
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "rgba(0,0,0,0.1)",
  },
  deleteButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(255,71,87,0.1)",
    paddingVertical: 12,
    borderRadius: 12,
    marginTop: 20,
    borderWidth: 1,
    borderColor: "rgba(255,71,87,0.2)",
  },
  deleteIcon: {
    marginRight: 8,
  },
  deleteButtonText: {
    color: dangerColor,
    fontSize: 16,
    fontWeight: "600",
  },
  ButtonContainer: {
    width: "100%",
    gap: 16,
  },
  actionButton: {
    width: "100%",
    borderRadius: 16,
    overflow: "hidden",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 5,
  },
  gradientButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 16,
    paddingHorizontal: 24,
  },
  buttonIcon: {
    marginRight: 12,
  },
  actionButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
  editButtonsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 20,
    gap: 10,
  },
  editActionButton: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: "center",
  },
  cancelButton: {
    backgroundColor: "#666",
  },
  validateButton: {
    backgroundColor: accentColor,
  },
  editActionButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
});
