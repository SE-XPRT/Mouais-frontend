import React, { useEffect, useRef, useState } from "react";
import {
  Modal,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Animated,
} from "react-native";
import ConfettiCannon from "react-native-confetti-cannon";
import { Audio } from "expo-av";
type SimpleModalProps = {
  visible: boolean;
  onClose: () => void;
};
type ModalBadgeProps = {
  visible: boolean; // Détermine si la modale est visible
  onClose: () => void; // Fonction appelée quand on ferme la modale
  message?: string; // Message affiché dans la modale (optionnel)
};
const ModalBadge: React.FC<ModalBadgeProps> = ({
  visible,
  onClose,
  message = "Tu as débloqué un badge ! 🎉", // Message par défaut
}) => {
  const scaleAnim = useRef(new Animated.Value(0)).current; // Valeur animée pour effet scale
  const [showModal, setShowModal] = useState(visible); // État interne pour l'affichage réel
  const [confettiShot, setConfettiShot] = useState(false); // Contrôle des confettis (1 seule fois)
  useEffect(() => {
    // Fonction pour jouer un son lors de l'ouverture
    const playSound = async () => {
      try {
        const { sound } = await Audio.Sound.createAsync(
          require("../assets/badge-coin-win.mp3") // fichier son
        );
        await sound.playAsync();
      } catch (err) {
        console.log("Erreur lors de la lecture du son :", err);
      }
    };

    if (visible) {
      setShowModal(true); // Affiche la modale
      setConfettiShot(false); // Réactive les confettis

      // Animation de zoom avant
      Animated.spring(scaleAnim, {
        toValue: 1,
        useNativeDriver: true,
        friction: 5,
        tension: 100,
      }).start();

      playSound(); // 🔊 Joue le son
    } else {
      // Animation de zoom arrière
      Animated.spring(scaleAnim, {
        toValue: 0,
        useNativeDriver: true,
        friction: 5,
        tension: 100,
      }).start(() => setShowModal(false)); // Cache la modale après l'animation
    }
  }, [visible]);

  // Ne rend rien si la modale est fermée
  if (!showModal) return null;
  return (
    <Modal transparent animationType="fade" visible={showModal}>
      <View style={styles.overlay}>
        {/* 🎉 Confettis une seule fois */}
        {!confettiShot && (
          <ConfettiCannon
            count={80}
            origin={{ x: 200, y: 0 }}
            fadeOut
            explosionSpeed={300}
            onAnimationEnd={() => setConfettiShot(true)}
          />
        )}

        {/* Contenu animé avec effet scale */}
        <Animated.View
          style={[styles.modalContainer, { transform: [{ scale: scaleAnim }] }]}
        >
          <Text style={styles.message}>{message}</Text>

          <TouchableOpacity style={styles.button} onPress={onClose}>
            <Text style={styles.buttonText}>Fermer</Text>
          </TouchableOpacity>
        </Animated.View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)", // Fond noir semi-transparent
    justifyContent: "center",
    alignItems: "center",
  },
  modalContainer: {
    width: "80%",
    backgroundColor: "#fff",
    borderRadius: 15,
    padding: 20,
    alignItems: "center",
  },
  message: {
    fontSize: 18,
    textAlign: "center",
    marginBottom: 20,
  },
  button: {
    backgroundColor: "#333",
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 8,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
  },
});

export default ModalBadge;
