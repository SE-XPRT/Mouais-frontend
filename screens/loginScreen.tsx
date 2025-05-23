import React, { useState, useEffect } from "react";

import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  StyleSheet,
  SafeAreaView,
  Alert,
  Button,
  //Modal,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import _FontAwesome from "@react-native-vector-icons/fontawesome";
import Constants from "expo-constants";
//test modal import à supprimer
//import ModalBadge from "../components/ModalBadge";
import { useDispatch } from "react-redux";
import { updateToken, updateEmail, logout } from "../reducers/users";
import { useSelector } from "react-redux";
type RootStackParamList = {
  TabNavigator: undefined;
  // ajoutez ici d'autres routes si nécessaire
};

const API_URL = Constants.expoConfig?.extra?.API_URL ?? "";

const FontAwesome = _FontAwesome as React.ElementType;

//Définition du composant principal
const LoginScreen: React.FC = () => {
  const dispatch = useDispatch();
  //test modal à supprimer
  //const [modalVisible, setModalVisible] = useState(false);
  // Replace 'RootState' with the actual type of your Redux root state if different
  interface RootState {
    users: {
      email: {
        values: string;
      };
    };
  }
  const emailData = useSelector((state: any) => state.users.value.email);
  const tokenData = useSelector((state: any) => state.users.value.token);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [signinOrSignup, setSigninOrSignup] = useState<"signin" | "signup">(
    "signin"
  );

  // Regex pour la validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const passwordRegex = /^.{5,}$/;

  const validateEmail = (email: string) => {
    if (!email) {
      setEmailError("L'email est requis");
      return false;
    }
    if (!emailRegex.test(email)) {
      setEmailError("Format d'email invalide");
      return false;
    }
    setEmailError("");
    return true;
  };

  const validatePassword = (password: string) => {
    if (!password) {
      setPasswordError("Le mot de passe est requis");
      return false;
    }
    if (!passwordRegex.test(password)) {
      setPasswordError("Le mot de passe doit contenir au moins 5 caractères");
      return false;
    }
    setPasswordError("");
    return true;
  };

  const changeAuthentification = () => {
    setSigninOrSignup(signinOrSignup === "signin" ? "signup" : "signin");
    // Réinitialiser les erreurs lors du changement de mode
    setEmailError("");
    setPasswordError("");
  };

  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  const token = useSelector((state: any) => state.users.value.token);

  // Fonction de déconnexion
  const handleLogout = async () => {
    try {
      // Appeler le backend pour la déconnexion si nécessaire
      if (token) {
        await fetch(`${API_URL}/users/logout`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ token }),
        });
      }
    } catch (error) {
      console.error("Erreur lors de la déconnexion:", error);
    } finally {
      // Nettoyer le store Redux et AsyncStorage
      dispatch(logout());
      // Réinitialiser les états locaux
      setEmail("");
      setPassword("");
      setEmailError("");
      setPasswordError("");
    }
  };

  // Rediriger vers TabNavigator si l'utilisateur est déjà connecté
  useEffect(() => {
    if (token) {
      navigation.reset({
        index: 0,
        routes: [{ name: "TabNavigator" }],
      });
    }
  }, [token]);

  const handleSignin = async () => {
    // Valider les champs avant l'envoi
    const isEmailValid = validateEmail(email);
    const isPasswordValid = validatePassword(password);

    if (!isEmailValid || !isPasswordValid) {
      return;
    }

    try {
      const response = await fetch(`${API_URL}/users/${signinOrSignup}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
        }),
      });

      if (!response.ok) {
        throw new Error("Erreur réseau ou serveur");
      }

      const data = await response.json();

      if (data.result) {
        dispatch(updateToken(data.token));
        dispatch(updateEmail(email));
        navigation.reset({
          index: 0,
          routes: [{ name: "TabNavigator" }],
        });
      } else {
        setEmail("");
        setPassword("");
        Alert.alert("Erreur", data.error || "Erreur de connexion");
      }
    } catch (error: any) {
      Alert.alert(
        "Erreur de connexion",
        error.message || "Une erreur est survenue."
      );
    }
  };
  const handleDelete = async () => {
    try {
      const response = await fetch(`${API_URL}/users/delete${tokenData}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          token: tokenData,
        }),
      });
    } catch (error: any) {
      Alert.alert(
        "Erreur de suppression",
        error.message || "Une erreur est survenue."
      );
    }
  };
  return (
    <SafeAreaView style={styles.container}>
      {/* Logo */}
      <View style={styles.logoContainer}>
        <Text style={styles.logoText}>
          <Image style={styles.logo} source={require("../assets/logo.png")} />
        </Text>

        <Text style={styles.title}>Connecte-toi !</Text>
      </View>

      {/* Social Icons */}
      <View style={styles.socialRow}>
        <FontAwesome name="apple" size={28} color="#40a0ed" />
        <FontAwesome name="google" size={28} color="#e34133" />
        <FontAwesome name="instagram" size={28} color="#7864cc" />
        <FontAwesome name="windows" size={28} color="#40a0ed" />
        <FontAwesome name="facebook" size={28} color="#3d4eaf" />
      </View>

      <Text style={styles.subtitle}>
        {signinOrSignup === "signin"
          ? "Connecte-toi avec ton email !"
          : "Crée ton compte avec ton email !"}
      </Text>

      <View style={styles.form}>
        <View>
          <TextInput
            placeholder="Entrez votre email"
            placeholderTextColor="#333"
            style={[styles.input, emailError ? styles.inputError : null]}
            value={email}
            onChangeText={(text) => {
              setEmail(text);
              if (emailError) validateEmail(text);
            }}
            keyboardType="email-address"
            autoCapitalize="none"
          />
          {emailError ? (
            <Text style={styles.errorText}>{emailError}</Text>
          ) : null}
        </View>

        <View>
          <TextInput
            placeholder="Entrez votre mot de passe"
            placeholderTextColor="#333"
            secureTextEntry
            style={[styles.input, passwordError ? styles.inputError : null]}
            value={password}
            onChangeText={(text) => {
              setPassword(text);
              if (passwordError) validatePassword(text);
            }}
          />
          {passwordError ? (
            <Text style={styles.errorText}>{passwordError}</Text>
          ) : null}
        </View>

        <View style={{ marginTop: 10 }}>
          <TouchableOpacity style={styles.loginButton} onPress={handleSignin}>
            <Text style={styles.loginButtonText}>
              {signinOrSignup === "signin" ? "Se connecter" : "S'inscrire"} ➤
            </Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity
          style={styles.signupButton}
          onPress={changeAuthentification}
        >
          <Text style={styles.signupButtonText}>
            {signinOrSignup === "signin"
              ? "Pas encore de compte ? Crée-en un !"
              : "Déjà un compte ? Connecte-toi !"}
          </Text>
        </TouchableOpacity>
        {/* test modal à supprimer 
        <ModalBadge
          visible={modalVisible}
          onClose={() => setModalVisible(false)}
        />*/}
      </View>
      <Text
        style={styles.guestMode}
        onPress={() => {
          navigation.reset({
            index: 0,
            routes: [{ name: "TabNavigator" }],
          });
        }}
      >
        Commencer en mode invité
      </Text>
      {/* test modal à supprimer 
      <TouchableOpacity onPress={() => setModalVisible(true)}>
        <Text>Ouvrir la modale</Text>
      </TouchableOpacity>*/}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#2a2e30",
    paddingHorizontal: 20,
    justifyContent: "center",
  },
  logo: {
    width: 300,
    height: 100,
    marginBottom: 20,
    position: "absolute",
    top: 25,
    borderRadius: 100,
  },
  logoContainer: {
    alignItems: "center",
    marginBottom: 20,
  },
  logoCircle: {
    width: 100,
    height: 100,

    justifyContent: "center",
    alignItems: "center",
    marginBottom: 10,
  },
  logoText: {
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 20,
  },
  title: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 25,
  },
  socialRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 20,
    paddingHorizontal: 20,
    backgroundColor: "#ffffff",
    padding: 10,
    borderRadius: 10,
    shadowColor: "#ffffff",
    shadowOpacity: 0.25,
    shadowOffset: {
      width: 0,
      height: 2,
    },
  },
  subtitle: {
    textAlign: "center",
    color: "#ffffff",
    fontSize: 14,
    marginBottom: 10,
  },
  form: {
    gap: 10,
  },
  input: {
    backgroundColor: "#e5e2e2", //#e5e2e2
    borderRadius: 5,
    marginBottom: 10,

    marginTop: 10,
    paddingVertical: 12,
    paddingHorizontal: 15,
    fontSize: 16,
    shadowColor: "#000",
    shadowOpacity: 0.4,
    shadowRadius: 6,
    shadowOffset: {
      width: 0,
      height: 4,
    },
    elevation: 6,
  },
  loginButton: {
    backgroundColor: "#ffac25",
    paddingVertical: 12,
    borderRadius: 5,
    alignItems: "center",
  },
  loginButtonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
  forgotPassword: {
    textAlign: "center",
    marginVertical: 10,
    textDecorationLine: "underline",
    color: "#ffffff",
  },
  signupButton: {
    backgroundColor: "#d395ff",
    paddingVertical: 10,
    borderRadius: 5,
    marginTop: 10,
  },
  signupButtonText: {
    color: "#fff",
    fontWeight: "bold",
    textAlign: "center",
    fontSize: 13,
  },
  guestMode: {
    textAlign: "center",
    marginTop: 15,
    fontStyle: "italic",
    color: "#ffffff",
  },
  inputError: {
    borderColor: "#ff4757",
    borderWidth: 1,
  },
  errorText: {
    color: "#ff4757",
    fontSize: 12,
    marginTop: 4,
    marginLeft: 4,
  },
  logoutButton: {
    backgroundColor: "#ff4757",
    paddingVertical: 12,
    borderRadius: 5,
    alignItems: "center",
    marginTop: 10,
  },
  logoutButtonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
  modalButtonText: {
    color: "#fff",
    textAlign: "center",
    marginTop: 20,
    padding: 10,
    backgroundColor: "#8b43f1",
    borderRadius: 8,
  },
});

export default LoginScreen;
