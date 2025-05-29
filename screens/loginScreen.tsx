import React, { useState, useEffect } from "react";
import { Animated, Easing } from "react-native";
import { useRef } from "react";
import { LinearGradient } from "expo-linear-gradient";

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
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import _FontAwesome from "@react-native-vector-icons/fontawesome";
import Constants from "expo-constants";
import { useDispatch } from "react-redux";
import {
  updateToken,
  updateEmail,
  logout,
  actualizeCoins,
  UserState,
  updatePseudo,
} from "../reducers/users";
import { useSelector } from "react-redux";
type RootStackParamList = {
  TabNavigator: undefined;
};

const API_URL = Constants.expoConfig?.extra?.API_URL ?? "";
console.log(API_URL);

const FontAwesome = _FontAwesome as React.ElementType;

const LoginScreen: React.FC = () => {
  const titleAnim = useRef(new Animated.Value(0)).current;
  const glowAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(titleAnim, {
      toValue: 1,
      duration: 800,
      useNativeDriver: true,
    }).start();
    Animated.loop(
      Animated.sequence([
        Animated.timing(glowAnim, {
          toValue: 1,
          duration: 800,
          useNativeDriver: false,
        }),
        Animated.timing(glowAnim, {
          toValue: 0,
          duration: 800,
          useNativeDriver: false,
        }),
      ])
    ).start();
  }, []);

  const dispatch = useDispatch();
  interface RootState {
    users: {
      email: {
        values: string;
      };
    };
  }
  const coins = useSelector(
    (state: { users: UserState }) => state.users.value.coins
  );
  const emailData = useSelector((state: any) => state.users.value.email);
  const tokenData = useSelector((state: any) => state.users.value.token);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [signinOrSignup, setSigninOrSignup] = useState<"signin" | "signup">(
    "signin"
  );
  const pressAnim = useRef(new Animated.Value(1)).current;
  const switchAnim = useRef(new Animated.Value(1)).current;
  const guestAnim = useRef(new Animated.Value(1)).current;

  const [loading, setLoading] = useState(false);

  const animatePressIn = () => {
    Animated.spring(pressAnim, {
      toValue: 0.95, // bouton légèrement plus petit
      useNativeDriver: true,
    }).start();
  };

  const animatePressOut = () => {
    Animated.spring(pressAnim, {
      toValue: 1, // retour à la taille normale
      friction: 3, // rebond plus ou moins souple
      tension: 100,
      useNativeDriver: true,
    }).start();
  };
  const animateSwitchPressIn = () => {
    Animated.spring(switchAnim, {
      toValue: 0.95,
      useNativeDriver: true,
    }).start();
  };

  const animateSwitchPressOut = () => {
    Animated.spring(switchAnim, {
      toValue: 1,
      friction: 3,
      tension: 100,
      useNativeDriver: true,
    }).start();
  };

  const animateGuestPressIn = () => {
    Animated.spring(guestAnim, {
      toValue: 0.95,
      useNativeDriver: true,
    }).start();
  };

  const animateGuestPressOut = () => {
    Animated.spring(guestAnim, {
      toValue: 1,
      friction: 3,
      tension: 100,
      useNativeDriver: true,
    }).start();
  };

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
    setEmailError("");
    setPasswordError("");
  };

  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  const token = useSelector((state: any) => state.users.value.token);

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
          coins,
        }),
      });

      if (!response.ok) {
        throw new Error("Erreur réseau ou serveur");
      }

      const data = await response.json();

      if (data.result) {
        dispatch(updateToken(data.token));
        dispatch(updateEmail(email));
        dispatch(actualizeCoins(data.coins));
        dispatch(updatePseudo(data.pseudo || "Anonyme"));
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

  return (
    <LinearGradient
      colors={["#171717", "#242424"]}
      style={styles.container}
      start={{ x: 0.1, y: 0.1 }}
      end={{ x: 1, y: 1 }}
    >
      {/* Logo */}
      <View style={styles.logoContainer}>
        <Text style={styles.logoText}>
          <Image style={styles.logo} source={require("../assets/logo.png")} />
        </Text>

        <Animated.Text
          style={[
            styles.title,
            {
              textShadowRadius: glowAnim.interpolate({
                inputRange: [0, 1],
                outputRange: [20, 50],
              }),
              textShadowColor: glowAnim.interpolate({
                inputRange: [0, 1],
                outputRange: ["#29ffc644", "#29ffc6ff"],
              }),
            },
          ]}
        >
          Connecte-toi viiite !
        </Animated.Text>
      </View>

      {/* Social Icons */}
      <View style={styles.socialRow}>
        <View style={styles.iconCircle}>
          <FontAwesome name="apple" size={24} color="#40a0ed" />
        </View>
        <View style={styles.iconCircle}>
          <FontAwesome name="google" size={24} color="#e34133" />
        </View>
        <View style={styles.iconCircle}>
          <FontAwesome name="instagram" size={24} color="#7864cc" />
        </View>
        <View style={styles.iconCircle}>
          <FontAwesome name="facebook" size={24} color="#3d4eaf" />
        </View>
      </View>

      <Text style={styles.subtitle}>
        {signinOrSignup === "signin"
          ? "Ou avec ton email si tu préfères !"
          : "Crée ton compte avec ton email !"}
      </Text>

      <View style={styles.form}>
        <View style={styles.inputWrapper}>
          <FontAwesome
            name="envelope"
            size={18}
            color="#aaa"
            style={styles.inputIcon}
          />
          <TextInput
            placeholder="Entrez votre email"
            placeholderTextColor="#999999"
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

        <View style={styles.inputWrapper}>
          <FontAwesome
            name="lock"
            size={24}
            color="#aaa"
            style={styles.inputIcon}
          />
          <TextInput
            placeholder="Entrez votre mot de passe"
            placeholderTextColor="#999999"
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
          <Animated.View style={{ transform: [{ scale: pressAnim }] }}>
            <TouchableOpacity
              style={styles.loginButton}
              onPressIn={animatePressIn}
              onPressOut={() => {
                animatePressOut();
                handleSignin();
              }}
              activeOpacity={1}
            >
              {loading ? (
                <Text style={styles.loginButtonText}>⏳</Text>
              ) : (
                <Text style={styles.loginButtonText}>
                  {signinOrSignup === "signin" ? "Se connecter" : "S'inscrire"}{" "}
                  ➤
                </Text>
              )}
            </TouchableOpacity>
          </Animated.View>
        </View>

        <Animated.View style={{ transform: [{ scale: switchAnim }] }}>
          <TouchableOpacity
            style={styles.signupButton}
            onPressIn={animateSwitchPressIn}
            onPressOut={() => {
              animateSwitchPressOut();
              changeAuthentification();
            }}
            activeOpacity={1}
          >
            <Text style={styles.signupButtonText}>
              {signinOrSignup === "signin"
                ? "Pas encore de compte ? Crée-en un !"
                : "Déjà un compte ? Connecte-toi !"}
            </Text>
          </TouchableOpacity>
        </Animated.View>
      </View>
      <Animated.View style={{ transform: [{ scale: guestAnim }] }}>
        <TouchableOpacity
          onPressIn={animateGuestPressIn}
          onPressOut={() => {
            animateGuestPressOut();
            navigation.reset({
              index: 0,
              routes: [{ name: "TabNavigator" }],
            });
          }}
          activeOpacity={1}
        >
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <FontAwesome
              name="user"
              size={16}
              color="#ffffff"
              style={{ marginRight: 6, marginTop: 15 }}
            />
            <Text style={styles.guestMode}>Ou commence en mode Incognito</Text>
          </View>
        </TouchableOpacity>
      </Animated.View>
    </LinearGradient>
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
    fontSize: 28,
    textAlign: "center",
    textShadowColor: "#ffffff",
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 12,
    marginBottom: 20,
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
    color: "#ffffff",
    borderRadius: 12,
    paddingVertical: 6,
    paddingHorizontal: 15,
    fontSize: 16,
    width: "100%",
    height: 50,
  },
  loginButton: {
    backgroundColor: "#29ffc6",
    paddingVertical: 12,
    paddingHorizontal: 40,
    borderRadius: 10,
    alignSelf: "center",
    marginTop: 20,
    minWidth: "95%",
    maxWidth: "95%",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 4,
  },
  loginButtonText: {
    color: "#2a2e30",
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
    paddingVertical: 12,
    paddingHorizontal: 40,
    borderRadius: 10,
    minWidth: "95%",
    maxWidth: "95%",
    alignSelf: "center",
    textAlign: "center",
    marginTop: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 4,
  },
  signupButtonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
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
  iconCircle: {
    backgroundColor: "#2a2e30",
    borderRadius: 40,
    width: 55,
    height: 55,
    alignItems: "center",
    justifyContent: "center",
    marginHorizontal: 5,
    shadowColor: "#000",
    shadowOffset: { width: 2, height: 2 },
    shadowOpacity: 0.6,
    shadowRadius: 6,
    elevation: 8,
  },
  socialRow: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    marginVertical: 20,
  },
  inputWrapper: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#2a2e30",
    borderRadius: 20,
    paddingHorizontal: 15,
    paddingVertical: 6,
    marginBottom: 10,
    shadowColor: "#000",
    shadowOffset: { width: 2, height: 2 },
    shadowOpacity: 0.5,
    shadowRadius: 6,
    elevation: 6,
  },
  inputIcon: {
    marginLeft: 10,
  },
});

export default LoginScreen;
