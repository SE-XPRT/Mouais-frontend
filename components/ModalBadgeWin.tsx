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
import _FontAwesome from "@react-native-vector-icons/fontawesome";
const FontAwesome = _FontAwesome as React.ElementType;

import ModalBadges from "./ModalBadges";

type SimpleModalProps = {
  visible: boolean;
  onClose: () => void;
};

type Badge = {
  name: string;
  iconName: string;
};

type ModalBadgeProps = {
  visible: boolean; // Détermine si la modale est visible
  onClose: () => void; // Fonction appelée quand on ferme la modale
  message?: string; // Message affiché dans la modale (optionnel)
  badge: Badge | null;
};
const ModalBadge: React.FC<ModalBadgeProps> = ({
  visible,
  onClose,
  message = "Tu as débloqué un badge ! 🎉", // Message par défaut
  badge,
}) => {
  const scaleAnim = useRef(new Animated.Value(0)).current; // Valeur animée pour effet scale
  const [showModal, setShowModal] = useState(visible); // État interne pour l'affichage réel
  const [confettiShot, setConfettiShot] = useState(false); // Contrôle des confettis (1 seule fois)

  // Nouvel état pour afficher la modale des badges
  const [showBadgesModal, setShowBadgesModal] = useState(false);

  useEffect(() => {
    // Fonction pour jouer un son lors de l'ouverture
    console.log("MODAL VISIBLE :", visible);
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
  if (!showModal) {
    console.log("ModalBadge retourne null (donc non affichée)");
    return null;
  }
  return (
    <>
      <Modal transparent animationType="fade" visible={showModal}>
        <View style={styles.overlay}>
          {!confettiShot && (
            <ConfettiCannon
              count={80}
              origin={{ x: 200, y: 0 }}
              fadeOut
              explosionSpeed={300}
              onAnimationEnd={() => setConfettiShot(true)}
            />
          )}

          <Animated.View
            style={[
              styles.modalContainer,
              { transform: [{ scale: scaleAnim }] },
            ]}
          >
            <TouchableOpacity style={styles.closeButton} onPress={onClose}>
              <FontAwesome name="close" size={20} color="#8b43f1" />
            </TouchableOpacity>

            <Text style={styles.title}>Bravo BG !</Text>

            <FontAwesome
              name={badge?.iconName || "trophy"}
              size={40}
              color="#29ffc6"
              style={styles.icon}
            />

            <Text style={styles.description}>
              GG tu viens de débloquer le badge {"\n"}
              {badge ? `"${badge.name}"` : "Glow Babe"}
            </Text>

            <TouchableOpacity onPress={() => setShowBadgesModal(true)}>
              <Text style={styles.link}>Voir tous mes badges</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.eyeButton}
              onPress={() => setShowBadgesModal(true)}
            >
              <FontAwesome name="eye" size={28} color="#ff0084" />
            </TouchableOpacity>
          </Animated.View>
        </View>
      </Modal>

      <ModalBadges
        visible={showBadgesModal}
        onClose={() => setShowBadgesModal(false)}
      />
    </>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContainer: {
    width: "80%",
    backgroundColor: "#ffffff",
    borderRadius: 20,
    padding: 25,
    alignItems: "center",
    position: "relative",
    // Neumorphisme light shadow
    shadowColor: "#ffffff",
    shadowOffset: { width: -6, height: -6 },
    shadowOpacity: 1,
    shadowRadius: 6,
  },
  closeButton: {
    position: "absolute",
    top: 15,
    right: 15,
    zIndex: 1,
    // Neumorphisme button shadows
    shadowColor: "#ffffff",
    shadowOffset: { width: -3, height: -3 },
    shadowOpacity: 1,
    shadowRadius: 3,

    elevation: 5,

    padding: 8,
    borderRadius: 30,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#2a2e30",
    marginBottom: 15,
  },
  iconWrapper: {
    backgroundColor: "#e0e0e0",
    borderRadius: 40,
    padding: 15,

    // Neumorphisme icon wrapper shadows
    shadowColor: "#ffffff",
    shadowOffset: { width: -5, height: -5 },
    shadowOpacity: 1,
    shadowRadius: 6,

    elevation: 8,
    marginBottom: 20,
  },
  icon: {
    marginBottom: 15,
  },
  description: {
    fontSize: 16,
    textAlign: "center",
    color: "#2a2e30",
    marginBottom: 10,
  },
  link: {
    fontStyle: "italic",
    color: "#2a2e30",
    marginTop: 20,
    marginBottom: 5,
  },
  eyeButton: {
    marginTop: 5,
  },
});

export default ModalBadge;
