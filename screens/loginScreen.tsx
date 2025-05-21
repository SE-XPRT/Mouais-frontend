import React, { useState } from "react";

import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  StyleSheet,
  SafeAreaView,
  Alert,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import _FontAwesome from "@react-native-vector-icons/fontawesome";
import Constants from "expo-constants";

type RootStackParamList = {
  TabNavigator: undefined;
  // ajoutez ici d'autres routes si nécessaire
}; 

const API_URL = Constants.expoConfig?.extra?.API_URL ?? "";

const FontAwesome = _FontAwesome as React.ElementType;

//Définition du composant principal
const LoginScreen: React.FC = () => {
  const [placeholderEmail, setPlaceholderEmail] =
    useState("Entrez votre email");
  const [placeholderPassword, setPlaceholderPassword] = useState(
    "Entrez votre mot de passe"
  );
  const [signinOrSignup, setSigninOrSignup] = useState<"signin" | "signup">(
    "signin"
  );

  const changeAuthentification = () => {
    if (signinOrSignup === "signin") {
      setSigninOrSignup("signup");
      setPlaceholderEmail("Entrez votre email(inscription)");
      setPlaceholderPassword("Entrez votre mot de passe (inscription)");
    } else {
      setSigninOrSignup("signin");
      setPlaceholderEmail("Entrez votre email (connexion)");
      setPlaceholderPassword("Entrez votre mot de passe (connexion)");
    }
  };
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  //stockage de l'email
  const [email, setEmail] = useState("");
  //stockage du mot de passe
  const [password, setPassword] = useState("");
  //fonction qui sera appellée quand on clique sur "connexion"
  const handleSignin = async () => {
    //envoi d'une requete POST au back
    //console.log("Connexion en cours...");
    console.log(email, password);
    try {
      const response = await fetch(
        `${API_URL}/users/${signinOrSignup}`,
        {
          method: "POST", // Méthode HTTP
          headers: {
            "Content-Type": "application/json", // On précise qu'on envoie du JSON
          },
          body: JSON.stringify({
            email,
            password,
          }), // On envoie l'email et le mot de passe
        }
      );
      console.log(response);

      if (!response.ok) {
        throw new Error("Erreur réseau ou serveur");
      }

      // On récupère la réponse du back
      const data = await response.json();

      // Si la réponse est OK
      if (data.result) {
        // Alert.alert("Connexion réussie ✅", `Token: ${data.token}`);
        navigation.reset({
          index: 0,
          routes: [{ name: "TabNavigator" }],
        });
      } else {
        // Sinon, afficher l'erreur retournée par le backend
        // Alert.alert("Erreur ❌", data.error);
        setEmail("");
        setPassword("");
        setPlaceholderEmail("Moauis ressaie ton email");
        setPlaceholderPassword("Et ton mot de passe aussi !");
      }
    } catch (error: any) {
      // Alert.alert(
      //   "Erreur de connexion",
      //   error.message || "Une erreur est survenue."
      // );
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

      <Text style={styles.subtitle}>ou connecte-toi avec ton email !</Text>

      {/* Email Login */}
      <View style={styles.form}>
        <TextInput
          placeholder={placeholderEmail}
          placeholderTextColor="#333"
          style={styles.input}
          value={email}
          onChangeText={setEmail}
        />
        <TextInput
          placeholder={placeholderPassword}
          placeholderTextColor="#333"
          secureTextEntry
          style={styles.input}
          value={password}
          onChangeText={setPassword}
        />
        <View style={{ marginTop: 10 }}>
          <TouchableOpacity
            style={styles.loginButton}
            onPress={() => handleSignin()}
          >
            <Text style={styles.loginButtonText}>C’est parti ! ➤</Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity>
          <Text style={styles.forgotPassword}>Forgot Password?</Text>
        </TouchableOpacity>

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
});

export default LoginScreen;
