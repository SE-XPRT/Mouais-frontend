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
  { id: 1, title: "Explorateur", iconName: "compass" },
  { id: 2, title: "Photographe", iconName: "camera" },
  { id: 3, title: "Maître du like", iconName: "thumbs-up" },
  { id: 4, title: "Champion", iconName: "trophy" },
];

const ModalBadges: React.FC<ModalBadgesProps> = ({ visible, onClose }) => {
  const userBadges: number[] = useSelector(
    (state: any) => state.users?.value?.badges ?? []
  );

  const renderBadge = ({ item }: { item: Badge }) => {
    const isUnlocked = userBadges.includes(item.id);
    return (
      <View style={styles.badgeContainer}>
        <FontAwesome
          name={item.iconName}
          size={60}
          color={isUnlocked ? "#8b43f1" : "#ccc"}
          style={!isUnlocked ? styles.lockedBadge : undefined}
        />
        <Text style={[styles.badgeTitle, !isUnlocked && styles.lockedText]}>
          {item.title}
        </Text>
        {!isUnlocked && (
          <FontAwesome
            name="lock"
            size={18}
            color="#999"
            style={styles.lockIcon}
          />
        )}
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
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 16,
    maxHeight: "85%",
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
  lockedBadge: {
    opacity: 0.4,
  },
  badgeTitle: {
    fontSize: 14,
    color: "#333",
    textAlign: "center",
  },
  lockedText: {
    color: "#aaa",
  },
  lockIcon: {
    marginTop: 4,
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
