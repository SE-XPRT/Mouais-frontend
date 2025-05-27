import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Alert,
  FlatList,
  Image,
  Dimensions,
  Modal,
  TouchableOpacity,
  TouchableWithoutFeedback,
} from "react-native";
import Constants from "expo-constants";
import AsyncStorage from "@react-native-async-storage/async-storage";
import _FontAwesome from "@react-native-vector-icons/fontawesome";

const FontAwesome = _FontAwesome as React.ElementType;

const API_URL = Constants.expoConfig?.extra?.API_URL ?? "";
const screenWidth = Dimensions.get("window").width;

export default function PhotosAlbumScreen() {
  const [photos, setPhotos] = useState<any[]>([]);
  const [selectedPhoto, setSelectedPhoto] = useState<string | null>(null);

  useEffect(() => {
    const fetchPhotos = async () => {
      try {
        const token = await AsyncStorage.getItem("userToken");

        if (!token) {
          Alert.alert("Erreur", "Utilisateur non connecté");
          return;
        }

        const url = `${API_URL}/photos?token=${token}`;
        const response = await fetch(url);

        if (!response.ok) {
          const raw = await response.text();
          throw new Error("Erreur lors de la récupération des photos");
        }

        const data = await response.json();
        setPhotos(data.photos);
      } catch (error: any) {
        Alert.alert("Erreur", error.message);
      }
    };

    fetchPhotos();
  }, []);

  const handleShowAnalysis = (photo: any) => {
    console.log("Analyse :", photo.analyse);
  };

  const handleDelete = async (photoId: string) => {
  try {
    const response = await fetch(`${API_URL}/photos/${photoId}`, {
      method: "DELETE",
    });

    if (!response.ok) {
      const raw = await response.text();
      throw new Error("Échec de la suppression de la photo");
    }

    const result = await response.json();
    console.log(result.message);

    setPhotos((prev) => prev.filter((photo) => photo._id !== photoId));
  } catch (error: any) {
    Alert.alert("Erreur", error.message);
  }
};


  const renderItem = ({ item }: { item: any }) => (
    <View style={styles.photoContainer}>
      <Image
        source={{ uri: item.imageUrl }}
        style={styles.photo}
        resizeMode="cover"
      />
      <View style={styles.iconRow}>
        <TouchableOpacity onPress={() => handleShowAnalysis(item)}>
          <FontAwesome name="file-text" size={24} color="#fff" style={styles.icon} />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setSelectedPhoto(item.imageUrl)}>
          <FontAwesome name="eye" size={24} color="#fff" style={styles.icon} />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => handleDelete(item._id)}>
          <FontAwesome name="trash" size={24} color="#fff" style={styles.icon} />
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      {photos.length === 0 ? (
        <Text style={styles.title}>Aucune photo trouvée</Text>
      ) : (
        <View style={styles.container}>
          <Text style={styles.title}>Album Photos</Text>

          <FlatList
            data={photos}
            keyExtractor={(item) => item._id}
            renderItem={renderItem}
            contentContainerStyle={styles.list}
            style={{ borderRadius: 12, overflow: "hidden" }}
          />
        </View>
      )}

      <Modal visible={!!selectedPhoto} transparent>
        <TouchableWithoutFeedback onPress={() => setSelectedPhoto(null)}>
          <View style={styles.modalOverlay}>
            <Image
              source={{ uri: selectedPhoto! }}
              style={styles.fullscreenImage}
              resizeMode="contain"
            />
          </View>
        </TouchableWithoutFeedback>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#2a2e30",
    padding: 10,
  },
  title: {
    fontSize: 40,
    color: "#fff",
    textAlign: "center",
    marginTop: 80,
    marginBottom: 40,
  },
  list: {
    paddingBottom: 20,
  },
  photoContainer: {
    marginBottom: 15,
    alignItems: "center",
  },
  photo: {
    width: screenWidth - 40,
    height: 250,
    borderRadius: 12,
  },
  iconRow: {
    position: "absolute",
    bottom: 10,
    left: 0,
    right: 0,
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.5)",
    paddingVertical: 8,
    borderBottomLeftRadius: 12,
    borderBottomRightRadius: 12,
  },
  icon: {
    paddingHorizontal: 10,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.95)",
    justifyContent: "center",
    alignItems: "center",
  },
  fullscreenImage: {
    width: "100%",
    height: "100%",
  },
});
