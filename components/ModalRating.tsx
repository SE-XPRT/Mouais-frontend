import { useState, useEffect } from "react";
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
import Constants from "expo-constants";
import { useDispatch } from "react-redux";
import { updateCoins } from "../reducers/users";

const FontAwesome = _FontAwesome as React.ElementType;
const API_URL = Constants.expoConfig?.extra?.API_URL ?? "";

function ProgressBar({ percent }: { percent: number }) {
  return (
    <View style={styles.progressBarBackground}>
      <View style={[styles.progressBarFill, { width: `${percent * 100}%` }]} />
    </View>
  );
}

function Gauge({ label, value }: { label: string; value: number }) {
  return (
    <View style={styles.gauge}>
      <Text style={styles.gaugeText}>{label}</Text>
      <ProgressBar percent={value} />
    </View>
  );
}

export default function ModalRating({
  visible,
  onClose,
  imageUri,
  token,
}: {
  visible: boolean;
  onClose: () => void;
  imageUri: string;
  token: string;
}) {
  const dispatch = useDispatch();
  const [analysis, setAnalysis] = useState<any>(null);


 useEffect(() => {
  if (visible && imageUri && token) {
    dispatch(updateCoins(-1));
  }
}, [visible]);

  useEffect(() => {
    const fetchAnalysis = async () => {
      try {
        const response = await fetch(`${API_URL}/photos/upload`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ userToken: token, imageUrl: imageUri }),
        });

        const data = await response.json();
        if (data.result) {
          console.log("Réponse du backend :", data.photo);
          setAnalysis(data.photo.analyse[0]);
        }
      } catch (error) {
        console.error("Erreur fetch analyse :", error);
      }
    };

    if (visible && imageUri && token) {
      setAnalysis(null); //
      fetchAnalysis();
    }
  }, [visible, imageUri, token]);

  const generateStars = (score: number) => {
    const stars = [];
    const rounded = Math.round(score * 10);

    for (let i = 0; i < rounded; i++) {
      stars.push(
        <FontAwesome key={`full-${i}`} name="star" size={30} color="#ffac25" />
      );
    }

    for (let i = rounded; i < 10; i++) {
      stars.push(
        <FontAwesome key={`empty-${i}`} name="star" size={30} color="#2a2e30" />
      );
    }

    return stars;
  };

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
    >
      <View style={styles.overlay}>
        <View style={styles.modal}>
          <ScrollView contentContainerStyle={styles.modalContent}>
            <TouchableOpacity style={styles.closeModal} onPress={onClose}>
              <FontAwesome name="times" size={30} color="#000" />
            </TouchableOpacity>

            {analysis ? (
              <>
                <View style={styles.ratingContainer}>
                  {generateStars(analysis.score)}
                </View>
                <View style={styles.gaugesContainer}>
                  <Gauge label="Style" value={analysis.criteria.outfit} />
                  <Gauge label="Sourire" value={analysis.criteria.smile} />
                  <Gauge label="Maquillage" value={analysis.criteria.makeup} />
                  <Gauge label="Cheveux" value={analysis.criteria.cheveux} />
                </View>

                <View style={styles.buttonContainer}>
                  <AppButton
                    title="Retente ta chance"
                    color="#d395ff"
                    textColor="#fff"
                    onPress={onClose}
                  />
                  <AppButton
                    title="Conseils"
                    color="#FF0084"
                    textColor="#fff"
                  />
                </View>

                <View style={styles.coinsLeft}>
                  <FontAwesomeIcon icon={faCoins} size={30} color="#000" />
                  <Text style={styles.coinsLeftText}>Il te reste 2 coins</Text>
                </View>

                <View style={styles.adviceContainer}>
                  <Text style={styles.adviceTitle}>Récapitulatif :</Text>
                  <Text style={styles.adviceText}>
                    {analysis.comment.cheveux}
                  </Text>
                  <Text style={styles.adviceText}>
                    {analysis.comment.smile}
                  </Text>
                  <Text style={styles.adviceText}>
                    {analysis.comment.makeup}
                  </Text>
                  <Text style={styles.adviceText}>
                    {analysis.comment.outfit}
                  </Text>
                </View>
              </>
            ) : (
              <Text style={{ marginTop: 200, fontSize: 18 }}>
                Analyse en cours...
              </Text>
            )}
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
  gaugeText: {
    fontSize: 20,
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
    marginBottom: 20,
  },
  adviceText: {
    fontSize: 20,
    textAlign: "center",
  },
  adviceTitle: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 10,
  },
});
