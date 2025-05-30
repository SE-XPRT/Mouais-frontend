import React from "react";
import {
  Modal,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
} from "react-native";
import { useSelector } from "react-redux";
import _FontAwesome from "@react-native-vector-icons/fontawesome";
const FontAwesome = _FontAwesome as React.ElementType;

type Badge = {
  id: number;
  title: string;
  iconName: string;
};

type ModalBadgesProps = {
  visible: boolean;
  onClose: () => void;
};

const allBadges: Badge[] = [
  { id: 1, title: "Baby BG", iconName: "compass" },
  { id: 2, title: "BG in progress", iconName: "camera" },
  { id: 3, title: "Mouais addict", iconName: "thumbs-up" },
  { id: 4, title: "BG forever", iconName: "trophy" },
];

const ModalBadges: React.FC<ModalBadgesProps> = ({ visible, onClose }) => {
  const userBadges = [1, 2]; // badges débloqués pour test

  const renderBadge = ({ item }: { item: Badge }) => {
    const isUnlocked = userBadges.includes(item.id);
    return (
      <View style={styles.badgeContainer}>
        <View
          style={[styles.iconWrapper, !isUnlocked && styles.iconWrapperLocked]}
        >
          <FontAwesome
            name={item.iconName}
            size={60}
            color={isUnlocked ? "#8b43f1" : "#ccc"}
          />
          {!isUnlocked && (
            <View style={styles.lockOverlay}>
              <FontAwesome name="lock" size={20} color="#999" />
            </View>
          )}
        </View>
        <Text style={[styles.badgeTitle, !isUnlocked && styles.lockedText]}>
          {item.title}
        </Text>
      </View>
    );
  };

  return (
    <Modal visible={visible} animationType="slide" transparent>
      <View style={styles.modalBackground}>
        <View style={styles.modalContent}>
          <Text style={styles.title}>🎖️ Mes Badges</Text>
          <FlatList
            data={allBadges}
            keyExtractor={(item) => item.id.toString()}
            renderItem={renderBadge}
            numColumns={2}
            contentContainerStyle={{ gap: 20 }}
          />
          <TouchableOpacity onPress={onClose} style={styles.closeButton}>
            <Text style={styles.closeText}>Fermer</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalBackground: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.6)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContent: {
    width: "90%",
    backgroundColor: "#e0e0e0",
    padding: 20,
    borderRadius: 16,
    maxHeight: "85%",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 16,
    color: "#333",
    textAlign: "center",
  },
  badgeContainer: {
    alignItems: "center",
    margin: 10,
    width: "45%",
  },
  iconWrapper: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: "#e0e0e0",
    justifyContent: "center",
    alignItems: "center",
    // Ombres pour l'effet "surélevé"
    shadowColor: "#fff",
    shadowOffset: { width: -6, height: -6 },
    shadowOpacity: 1,
    shadowRadius: 6,
    elevation: 6,
    borderWidth: 1,
    borderColor: "#d1d9e6",
  },
  iconWrapperLocked: {
    backgroundColor: "#d3d3d3",
    shadowColor: "#a3a3a3",
    shadowOffset: { width: 6, height: 6 },
    shadowOpacity: 1,
    shadowRadius: 6,
    elevation: 6,
    borderColor: "#a1a1a1",
  },
  lockOverlay: {
    position: "absolute",
    top: 6,
    right: 6,
    backgroundColor: "rgba(255,255,255,0.7)",
    borderRadius: 10,
    padding: 2,
  },
  badgeTitle: {
    fontSize: 14,
    color: "#333",
    textAlign: "center",
    marginTop: 8,
  },
  lockedText: {
    color: "#888",
  },
  closeButton: {
    marginTop: 16,
    backgroundColor: "#8b43f1",
    paddingVertical: 12,
    borderRadius: 12,
    alignItems: "center",
  },
  closeText: {
    color: "#fff",
    fontSize: 16,
  },
});

export default ModalBadges;
