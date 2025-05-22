import { useState } from "react";
import {
  Text,
  View,
  Modal,
  Dimensions,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import _FontAwesome from "@react-native-vector-icons/fontawesome";
const FontAwesome = _FontAwesome as React.ElementType;

// ProgressBar réutilisable
function ProgressBar({ percent }: { percent: number }) {
  return (
    <View style={styles.progressBarBackground}>
      <View style={[styles.progressBarFill, { width: `${percent * 100}%` }]} />
    </View>
  );
}

export default function ModalRating() {
  const [modalVisible, setModalVisible] = useState(true);
  const rating = [];
  for (let i = 0; i < 3; i++) {
    rating.push(<FontAwesome key={i} name="star" size={30} color="#ffac25" />);
  }
  for (let i = 0; i < 2; i++) {
    rating.push(
      <FontAwesome key={i + 7} name="star" size={30} color="#2a2e30" />
    );
  }
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={modalVisible}
      onRequestClose={() => {
        setModalVisible(false);
        console.log("Modal has been closed.");
      }}
    >
      <View style={styles.overlay}>
        <View style={styles.modal}>
          <TouchableOpacity
            style={styles.closeModal}
            onPress={() => {
              setModalVisible(!modalVisible);
            }}
          >
            <FontAwesome name="times" size={30} color="#000" />
          </TouchableOpacity>
          <View style={styles.ratingContainer}>{rating}</View>
          <View style={styles.gaugesContainer}>
            <View style={styles.gauge}>
              <Text style={styles.gaugeText}>Style</Text>
              <ProgressBar percent={0.7} />
            </View>
            <View style={styles.gauge}>
              <Text style={styles.gaugeText}>Sourire</Text>
              <ProgressBar percent={0.9} />
            </View>
            <View style={styles.gauge}>
              <Text style={styles.gaugeText}>Maquillage</Text>
              <ProgressBar percent={0.3} />
            </View>
            <View style={styles.gauge}>
              <Text style={styles.gaugeText}>Glow</Text>
              <ProgressBar percent={0.5} />
            </View>
          </View>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "center",
  },
  modal: {
    height: Dimensions.get("window").height - 200,
    width: Dimensions.get("window").width,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
    padding: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  closeModal: {
    position: "absolute",
    top: 10,
    right: 10,
  },
  ratingContainer: {
    position: "absolute",
    top: 40,
    left: 30,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
    gap: 3,
  },
  gaugesContainer: {
    width: "100%",
    gap: 30,
    paddingHorizontal: 20,
  },
  gauge: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    gap: 10,
  },
  gaugeBar: {
    width: "60%",
    height: 30,
    backgroundColor: "#ffac25",
    borderRadius: 30,
  },
  fillingBar: {
    width: "30%",
    height: 30,
    backgroundColor: "#2a2e30",
  },
  progressBarBackground: {
    flex: 1,
    maxWidth: "60%",
    height: 40,
    backgroundColor: "#eee",
    borderRadius: 50,
    overflow: "hidden",
  },
  progressBarFill: {
    height: "100%",
    backgroundColor: "#ffac25",
    borderRadius: 50,
  },
  gaugeText: {
    fontSize: 20,
  },
});
