import React, { useEffect, useRef, useState } from "react"; // Hooks React
import {
  Modal,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Animated,
} from "react-native"; // Composants de base React Native
import { FontAwesome } from "@expo/vector-icons"; // Icônes FontAwesome
import ConfettiCannon from "react-native-confetti-cannon"; // 🎉 Bibliothèque de confettis
import { Audio } from "expo-av"; // 🔊 Pour jouer un effet sonore

// Props que le composant attend
type BadgeUnlockModalProps = {
  visible: boolean; // Afficher ou non la modale
  badgeName: string; // Nom du badge à afficher
  onClose: () => void; // Fonction de fermeture
  onViewBadges: () => void; // Fonction pour voir tous les badges
};

const BadgeUnlockModal: React.FC<BadgeUnlockModalProps> = ({
  visible,
  badgeName,
  onClose,
  onViewBadges,
}) => {
  const scaleAnim = useRef(new Animated.Value(0)).current; // Valeur animée pour effet de "scale"
  const [showModal, setShowModal] = useState(visible); // État local pour contrôler l'affichage interne
  const [confettiShot, setConfettiShot] = useState(false); // Pour éviter de rejouer les confettis à chaque re-render

  // Effet déclenché à chaque changement de "visible"
  useEffect(() => {
    // Fonction pour jouer un son à l'ouverture
    const playSound = async () => {
      try {
        const { sound } = await Audio.Sound.createAsync(
          require("../assets/badge-coin-win.mp3") // fichier son
        );
        await sound.playAsync(); // Démarre le son
      } catch (error) {
        console.log("Erreur lors de la lecture du son :", error); // Erreur si le son échoue
      }
    };

    if (visible) {
      setShowModal(true); // Affiche la modale
      setConfettiShot(false); // Réinitialise les confettis pour qu’ils soient relancés

      // Animation "scale" quand la modale apparaît
      Animated.spring(scaleAnim, {
        toValue: 1, // Échelle finale = 1 (taille normale)
        useNativeDriver: true,
        friction: 5,
        tension: 100,
      }).start();

      playSound(); // 🔊 Lance le son
    } else {
      // Animation inverse quand la modale se ferme
      Animated.spring(scaleAnim, {
        toValue: 0, // Réduit l’échelle à 0
        useNativeDriver: true,
        friction: 5,
        tension: 100,
      }).start(() => {
        setShowModal(false); // Cache la modale après animation
      });
    }
  }, [visible]);

  // Si la modale n'est pas visible, on ne rend rien
  if (!showModal) return null;

  return (
    <Modal transparent animationType="fade" visible={showModal}>
      <View style={styles.overlay}>
        {/* 🎉 Confettis : une seule fois au montage */}
        {!confettiShot && (
          <ConfettiCannon
            count={100} // Nombre de confettis
            origin={{ x: 200, y: 0 }} // Origine du tir
            fadeOut // Les confettis disparaissent
            explosionSpeed={350} // Vitesse d’explosion
            onAnimationEnd={() => setConfettiShot(true)} // Ne pas relancer
          />
        )}

        {/* Contenu animé avec effet "scale" */}
        <Animated.View
          style={[styles.modalContainer, { transform: [{ scale: scaleAnim }] }]}
        >
          {/* Bouton pour fermer */}
          <TouchableOpacity style={styles.closeButton} onPress={onClose}>
            <FontAwesome name="close" size={22} color="#000" />
          </TouchableOpacity>

          {/* Titre principal */}
          <Text style={styles.title}>Bravo BG !</Text>

          {/* Icône de badge */}
          <FontAwesome
            name="certificate"
            size={60}
            color="#000"
            style={styles.badgeIcon}
          />

          {/* Message avec nom du badge */}
          <Text style={styles.message}>
            GG tu viens de débloquer le badge{"\n"}
            <Text style={styles.badgeName}>"{badgeName}"</Text>
          </Text>

          {/* Bouton pour voir tous les badges */}
          <TouchableOpacity style={styles.viewButton} onPress={onViewBadges}>
            <FontAwesome name="eye" size={24} color="#000" />
            <Text style={styles.viewText}>Voir tous mes badges</Text>
          </TouchableOpacity>
        </Animated.View>
      </View>
    </Modal>
  );
};

export default BadgeUnlockModal; // Export du composant pour l’utiliser ailleurs

// Feuille de style
const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)", // Fond sombre semi-transparent
    justifyContent: "center",
    alignItems: "center",
  },
  modalContainer: {
    width: "80%",
    backgroundColor: "#fff",
    borderRadius: 20,
    padding: 20,
    alignItems: "center",
    position: "relative",
  },
  closeButton: {
    position: "absolute",
    top: 10,
    right: 10,
    padding: 5,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  badgeIcon: {
    marginVertical: 10,
  },
  message: {
    fontSize: 16,
    textAlign: "center",
    marginVertical: 10,
  },
  badgeName: {
    fontWeight: "bold",
    fontStyle: "italic",
  },
  viewButton: {
    marginTop: 20,
    flexDirection: "row",
    alignItems: "center",
  },
  viewText: {
    fontSize: 16,
    marginLeft: 8,
    fontStyle: "italic",
  },
});
