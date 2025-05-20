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
import FontAwesome from "@react-native-vector-icons/fontawesome";

//Définition du composant principal
const LoginScreen: React.FC = () => {
  //stockage de l'email
  const [email, setEmail] = useState("");
  //stockage du mot de passe
  const [password, setPassword] = useState("");
  //fonction qui sera appellée quand on clique sur "connexion"
  const handleSignin = async () => {
    //envoi d'une requete POST au back
    //console.log("Connexion en cours...");
    console.log(email, password);
    const response = await fetch("http://localhost:3000/users/signin", {
      method: "POST", // Méthode HTTP
      headers: {
        "Content-Type": "application/json", // On précise qu'on envoie du JSON
      },
      body: JSON.stringify({
        email,
        password, // On envoie les données
      }),
    });
    // On récupère la réponse du back
    const data = await response.json();

    // Si la réponse est OK
    if (data.result) {
      Alert.alert("Connexion réussie ✅", `Token: ${data.token}`);
    } else {
      // Sinon, afficher l'erreur retournée par le backend
      Alert.alert("Erreur ❌", data.error);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Logo */}
      <View style={styles.logoContainer}>
        <View style={styles.logoCircle}>
          <Text style={styles.logoText}>
            <Image style={styles.logo} source={require("../assets/logo.png")} />
          </Text>
        </View>
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
          placeholder="Email"
          placeholderTextColor="#ccc"
          style={styles.input}
          value={email}
          onChangeText={setEmail}
        />
        <TextInput
          placeholder="Password"
          placeholderTextColor="#ccc"
          secureTextEntry
          style={styles.input}
          value={password}
          onChangeText={setPassword}
        />
        <TouchableOpacity style={styles.loginButton} onPress={handleSignin}>
          <Text style={styles.loginButtonText}>C’est parti ! ➤</Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity>
        <Text style={styles.forgotPassword}>Forgot Password?</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.signupButton}>
        <Text style={styles.signupButtonText}>
          Pas encore de compte ? Inscris toi vite !
        </Text>
      </TouchableOpacity>

      <Text style={styles.guestMode}>Commencer en mode invité</Text>
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
  logoContainer: {
    alignItems: "center",
    marginBottom: 20,
  },
  logoCircle: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderColor: "#aaa",
    borderWidth: 1,
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
    fontWeight: "bold",
    fontSize: 22,
  },
  socialRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 20,
    paddingHorizontal: 20,
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
    borderColor: "#aaa",
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontSize: 14,
    marginBottom: 10,
    color: "#fff",
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
