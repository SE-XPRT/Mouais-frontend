import React, { useState } from "react";
import {
  View,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import { useRoute, useNavigation } from "@react-navigation/native";
import ModalRating from "../components/ModalRating";

type UploadedPhotoScreenRouteProp = {
  params?: {
    imageUri?: string;
    token?: string;
  };
};

export default function UploadedPhotoScreen() {
  const route = useRoute() as UploadedPhotoScreenRouteProp;
  const navigation = useNavigation();
  const imageUri = route.params?.imageUri;
  const token = route.params?.token || "1"; // ← ici, on récupère le token, ou valeur par défaut "1"

  const [modalVisible, setModalVisible] = useState(true);

  return (
    <View style={styles.container}>
      {imageUri && (
        <ModalRating
          visible={modalVisible}
          onClose={() => setModalVisible(false)}
          imageUri={imageUri}
          token={token}
        />
      )}
      {imageUri ? (
        <Image source={{ uri: imageUri }} style={styles.image} />
      ) : (
        <Text style={styles.text}>Aucune image sélectionnée.</Text>
      )}
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.goBack()}
      >
        <Text style={styles.buttonText}>Retour</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#2a2e30",
  },
  image: {
    width: Dimensions.get("window").width - 40,
    height: Dimensions.get("window").height - 200,
    borderRadius: 20,
    marginBottom: 30,
  },
  text: {
    color: "#fff",
    fontSize: 18,
    marginBottom: 30,
  },
  button: {
    backgroundColor: "#ffac25",
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 8,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
});
