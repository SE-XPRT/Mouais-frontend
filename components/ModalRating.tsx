import { useState } from "react";
import {
  Text,
  View,
  Modal,
  Dimensions,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from "react-native";
import AppButton from "./AppButton";
import _FontAwesome from "@react-native-vector-icons/fontawesome";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faCoins } from "@fortawesome/free-solid-svg-icons";
const FontAwesome = _FontAwesome as React.ElementType;

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
          <ScrollView contentContainerStyle={styles.modalContent}>
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
            <View style={styles.buttonContainer}>
              <AppButton
                title="Retante ta chance"
                color="#d395ff"
                textColor="#fff"
              />
              <AppButton title="Conseils" color="#FF0084" textColor="#fff" />
            </View>
            <View style={styles.coinsLeft}>
              <FontAwesomeIcon icon={faCoins} size={30} color="#000" />
              <Text style={styles.coinsLeftText}>Il te reste 2 coins</Text>
            </View>
            <View style={styles.adviceContainer}>
                <Text style={styles.adviceTitle}>
                    Détails :
                </Text>
              <Text style={styles.adviceText}>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
                do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                Ut enim ad minim veniam, quis nostrud exercitation ullamco
                laboris nisi ut aliquip ex ea commodo consequat. Duis aute
                irure dolor in reprehenderit in voluptate velit esse cillum
                dolore eu fugiat nulla pariatur. Excepteur sint occaecat
                cupidatat non proident, sunt in culpa qui officia deserunt
                mollit anim id est laborum.
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
                do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                Ut enim ad minim veniam, quis nostrud exercitation ullamco
                laboris nisi ut aliquip ex ea commodo consequat. Duis aute
                irure dolor in reprehenderit in voluptate velit esse cillum
                dolore eu fugiat nulla pariatur. Excepteur sint occaecat
                cupidatat non proident, sunt in culpa qui officia deserunt
                mollit anim id est laborum.
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
                do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                Ut enim ad minim veniam, quis nostrud exercitation ullamco
                laboris nisi ut aliquip ex ea commodo consequat. Duis aute
                irure dolor in reprehenderit in voluptate velit esse cillum
                dolore eu fugiat nulla pariatur. Excepteur sint occaecat
                cupidatat non proident, sunt in culpa qui officia deserunt
                mollit anim id est laborum.
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
                do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                Ut enim ad minim veniam, quis nostrud exercitation ullamco
                laboris nisi ut aliquip ex ea commodo consequat. Duis aute
                irure dolor in reprehenderit in voluptate velit esse cillum
                dolore eu fugiat nulla pariatur. Excepteur sint occaecat
                cupidatat non proident, sunt in culpa qui officia deserunt
                mollit anim id est laborum.
               
                </Text>
            </View>
          </ScrollView>
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
  modalContent: {
    alignItems: "center",
    justifyContent: "center",
    paddingBottom: 40,
  },
  closeModal: {
    position: "absolute",
    top: 10,
    right: 10,
  },
  ratingContainer: {
    position: "absolute",
    top: 40,
    left: 0,
    flexDirection: "row",
    justifyContent: "center",
    marginBottom: 20,
    gap: 3,
  },
  gaugesContainer: {
    marginTop: 150,
    width: "95%",
    gap: 30,
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
    width: "60%",
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
  buttonContainer: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-around",
    gap: 10,
    marginTop: 50,
  },
  coinsLeft: {
    width: "80%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 30,
    gap: 10,
    borderWidth: 1,
    padding: 10,
    borderRadius: 20,
  },
  coinsLeftText: {
    fontSize: 20,
  },
  adviceContainer: {
    width: "95%",
    borderWidth: 2,
    padding: 10,
    borderRadius: 20,
    marginTop: 20,
    backgroundColor: "#eee",
    alignItems: "center",
    justifyContent: "center",
    gap: 10,
    borderColor: "#2a2e30",
  },
  adviceText: {
    fontSize: 20,
    textAlign: "center",
  },
  adviceTitle:{
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 10,
  }
});
