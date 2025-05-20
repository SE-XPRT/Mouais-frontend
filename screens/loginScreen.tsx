import React from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
} from "react-native";
import FontAwesome from "@react-native-vector-icons/fontawesome";

const LoginScreen: React.FC = () => {
  return (
    <SafeAreaView style={styles.container}>
      {/* Logo */}
      <View style={styles.logoContainer}>
        <View style={styles.logoCircle}>
          <Text style={styles.logoText}>
            <Text>BG{"\n"}METER</Text>
          </Text>
        </View>
        <Text style={styles.title}>Connecte-toi !</Text>
      </View>

      {/* Social Icons */}
      <View style={styles.socialRow}>
        <FontAwesome name="apple" size={28} color="#555" />
        <FontAwesome name="google" size={28} color="#555" />
        <FontAwesome name="instagram" size={28} color="#555" />
        <FontAwesome name="windows" size={28} color="#555" />
        <FontAwesome name="facebook" size={28} color="#555" />
      </View>

      <Text style={styles.subtitle}>ou connecte-toi avec ton email !</Text>

      {/* Email Login */}
      <View style={styles.form}>
        <TextInput placeholder="Email" style={styles.input} />
        <TextInput
          placeholder="Password"
          secureTextEntry
          style={styles.input}
        />
        <TouchableOpacity style={styles.loginButton}>
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
    backgroundColor: "#fff",
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
    color: "#555",
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
  },
  loginButton: {
    backgroundColor: "#555",
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
    color: "#555",
  },
  signupButton: {
    backgroundColor: "#333",
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
    color: "#666",
  },
});

export default LoginScreen;
