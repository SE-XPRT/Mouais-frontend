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
          <View style={styles.titleWrapper}>
            <Text style={styles.title}>GET SOME</Text>

            <View style={styles.nudesWrapper}>
              <Text style={styles.nudesText}>NUDES</Text>
              <View style={styles.strike}></View>
            </View>

            <Text style={styles.title}> NEWS</Text>
          </View>

          {/* Subtitle */}
          <Text style={styles.subtitle}>
            Stay tuned! Pour être dans toutes les confidences de ton app
            préférée, c’est par ici ! Promis, on ne va pas te harceler mais
            simplement te partager nos meilleures actus pour être BG ! Mouais,
            convaincu.e ?
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
    width: "95%",
    height: "75%",
    backgroundColor: "#f7a3cc",
    borderRadius: 30,
    padding: 30,
    alignItems: "center",
    justifyContent: "center",
  },
  closeButton: {
    position: "absolute",
    top: 10,
    right: 10,
    zIndex: 1,
  },
  closeText: {
    fontSize: 24,
    color: "#fff",
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#fff",
    textAlign: "center",
    marginBottom: 10,
    lineHeight: 32,
  },
  strikeThrough: {
    textDecorationLine: "line-through",
    color: "#fff",
  },
  subtitle: {
    fontSize: 20,
    color: "#fff",
    textAlign: "center",
    marginBottom: 50,
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
    top: 40,
    right: 10,
    width: 140,
    height: 140,
    resizeMode: "contain",
  },
  titleWrapper: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
  },

  nudesWrapper: {
    position: "relative",
    marginHorizontal: 5,
  },

  nudesText: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#fff",
  },

  strike: {
    position: "absolute",
    top: 17,
    left: -4,
    width: "110%",
    height: 7,
    backgroundColor: "#DE7AB8",
    transform: [{ rotate: "10deg" }], 
    borderRadius: 5,
  },
});
