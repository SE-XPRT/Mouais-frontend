import React from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { useNavigation, NavigationProp } from "@react-navigation/native";
import _FontAwesome from "@react-native-vector-icons/fontawesome";
import * as ImagePicker from "expo-image-picker";
import { useSelector } from "react-redux";
import { updateCoins, UserState } from "../reducers/users";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useDispatch } from "react-redux";
const FontAwesome = _FontAwesome as React.ElementType;

type RootStackParamList = {
  TakePic: undefined;
  Snap: undefined;
  UploadedPhoto: { imageUri: string };
  EndCreditScreen: undefined;
  Home: { screen: string };
};

export default function TakePicScreen() {
  const dispatch = useDispatch();
  const { email, coins, guestCoins } = useSelector(
    (state: { users: UserState & { value: any } }) => state.users.value
  );

  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  const isGuest = email === "";
  const currentCoins = isGuest ? guestCoins : coins;

  const pickImage = async () => {
    if (currentCoins <= 0) {
      navigation.navigate("Home", {
        screen: "endCredit",
      });

      return;
    }

    const permissionResult =
      await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!permissionResult.granted) {
      alert("Permission d'accéder à la galerie refusée !");
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: "images",
      allowsEditing: false,
      quality: 1,
    });

    if (!result.canceled && result.assets.length > 0) {
      navigation.navigate("UploadedPhoto", {
        imageUri: result.assets[0].uri,
      });
    }
  };

  const handleCameraPress = () => {
    if (currentCoins <= 0) {
      navigation.navigate("Home", {
        screen: "endCredit",
      });
    } else {
      navigation.navigate("Snap");
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.iconContainer}>
        <TouchableOpacity style={styles.icons} onPress={pickImage}>
          <FontAwesome name="upload" size={100} color="#fff" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.icons} onPress={handleCameraPress}>
          <FontAwesome name="camera" size={100} color="#fff" />
        </TouchableOpacity>
      </View>

      <Text style={styles.text}>Envie de personnaliser ton expérience ?</Text>

      <TouchableOpacity style={styles.createProfilButton}>
        <Text style={styles.text}>Crée ton profil ici !</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.coinsButton}>
        <Text style={styles.text}>
          Coins : {currentCoins} {isGuest ? "/ 3" : ""}
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => dispatch(updateCoins(3))}
        style={{
          marginTop: 20,
          backgroundColor: "black",
          padding: 10,
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Text style={styles.text}>reset Coins</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "#2a2e30",
  },
  text: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#fff",
    textAlign: "center",
  },
  iconContainer: {
    marginTop: 180,
    marginBottom: 50,
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    width: "100%",
  },
  icons: {
    backgroundColor: "gray",
    borderRadius: 999,
    padding: 40,
    justifyContent: "center",
    alignItems: "center",
  },
  createProfilButton: {
    marginTop: 40,
    backgroundColor: "#d395ff",
    borderRadius: 8,
    padding: 10,
    width: "80%",
    alignItems: "center",
    justifyContent: "center",
  },
  coinsButton: {
    marginTop: 60,
    backgroundColor: "#ffac25",
    borderRadius: 80,
    padding: 5,
    width: "40%",
    alignItems: "center",
    justifyContent: "center",
  },
});
