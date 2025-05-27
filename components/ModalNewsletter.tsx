import React from "react";
import {
  Modal,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";

interface Props {
  visible: boolean;
  onClose: () => void;
}

const NewsletterModal: React.FC<Props> = ({ visible, onClose }) => {
  return (
    <Modal visible={visible} animationType="slide" transparent>
      <View style={styles.overlay}>
        <LinearGradient
          colors={["#f7a3cc", "#d395ff"]}
          style={styles.container}
        >
          <Image
            source={require("../assets/lips.png")}
            style={styles.lipsImage}
          />
          {/* Close Button */}
          <TouchableOpacity style={styles.closeButton} onPress={onClose}>
            <Text style={styles.closeText}>✕</Text>
          </TouchableOpacity>

          {/* Title */}
          <Text style={styles.title}>
            GET SOME
            {"\n"}
            <Text style={styles.strikeThrough}>NUDES</Text>
            <Text> NEWS</Text>
          </Text>

          {/* Subtitle */}
          <Text style={styles.subtitle}>
            Stay tuned! Pour être dans toutes les confidences de ta Squadra
            préférée, c’est par ici ! Promis, on ne va pas te harceler mais
            simplement te partager nos meilleures actus.
          </Text>

          {/* Email input */}
          <View style={styles.inputRow}>
            <TextInput
              placeholder="Email"
              placeholderTextColor="#999"
              style={styles.input}
              keyboardType="email-address"
            />
            <TouchableOpacity style={styles.button}>
              <Text style={styles.buttonText}>ENVOYER</Text>
            </TouchableOpacity>
          </View>
        </LinearGradient>
      </View>
    </Modal>
  );
};

export default NewsletterModal;

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.4)",
    justifyContent: "center",
    alignItems: "center",
  },
  container: {
    width: "95%", // Avant : "90%"
    height: "75%", // Ajouté pour donner plus de hauteur
    backgroundColor: "#f7a3cc", // (à supprimer si tu utilises le LinearGradient)
    borderRadius: 30, // Plus de courbure pour l’esthétique
    padding: 30, // Un peu plus d’espace intérieur
    alignItems: "center",
    justifyContent: "center",
  },
  closeButton: {
    position: "absolute",
    top: 10,
    right: 10,
    zIndex: 1, // ✅ pour qu’il reste cliquable au-dessus de l'image
  },
  closeText: {
    fontSize: 24,
    color: "#fff",
  },
  title: {
    textAlign: "center",
    fontSize: 28,
    fontWeight: "bold",
    color: "#fff",
    marginBottom: 20,
    lineHeight: 32,
  },
  strikeThrough: {
    textDecorationLine: "line-through",
    color: "#fff",
  },
  subtitle: {
    fontSize: 14,
    color: "#fff",
    textAlign: "center",
    marginBottom: 20,
  },
  inputRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  input: {
    backgroundColor: "#fff",
    paddingHorizontal: 10,
    paddingVertical: 10,
    borderRadius: 8,
    flex: 1,
  },
  button: {
    backgroundColor: "#f7b6dd",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
  },
  buttonText: {
    fontWeight: "bold",
    color: "#fff",
  },
  lipsImage: {
    position: "absolute",
    top: 40, // 🔽 descend un peu pour libérer le bouton ✕
    right: 10,
    width: 140, // 🔍 un peu plus large
    height: 140,
    resizeMode: "contain",
    zIndex: 0, // 👈 derrière les éléments interactifs
  },
});
