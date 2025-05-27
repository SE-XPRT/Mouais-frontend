import React, { useState, useEffect, useRef } from "react";
import {
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
import { CameraView, CameraType, FlashMode, Camera } from "expo-camera";
import _FontAwesome from "@react-native-vector-icons/fontawesome";
const FontAwesome = _FontAwesome as React.ElementType;
import { useIsFocused } from "@react-navigation/native";
import { useNavigation, NavigationProp } from "@react-navigation/native";
import ModalRating from "../components/ModalRating";
import { useSelector } from "react-redux";

type RootStackParamList = {
  TabNavigator: undefined;
  EndCreditScreen: undefined;

};

export default function SnapScreen() {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const isFocused = useIsFocused();
  const cameraRef = useRef<CameraView | null>(null);

  const [hasPermission, setHasPermission] = useState(false);
  const [facing, setFacing] = useState<CameraType>("back");
  const [flashStatus, setFlashStatus] = useState<FlashMode>("off");
  const [modalVisible, setModalVisible] = useState(false);
  const [capturedUri, setCapturedUri] = useState<string>("");

  const token = useSelector((state: any) => state.users?.value?.token || "invité");
  const  { coins, guestCoins } = useSelector((state: any) => state.users.value);
  const isGuest = token === "invité";
  const currentCoins = isGuest ? guestCoins : coins;

  useEffect(() => {
    (async () => {
      const result = await Camera.requestCameraPermissionsAsync();
      setHasPermission(result?.status === "granted");
    })();
  }, []);

  if (!hasPermission || !isFocused) return <View />;

  const toggleCameraFacing = () => {
    setFacing((prev) => (prev === "back" ? "front" : "back"));
  };

  const toggleFlashStatus = () => {
    setFlashStatus((prev) => (prev === "off" ? "on" : "off"));
  };

  const takePicture = async () => { 
    if (currentCoins <= 0) {
      navigation.reset({
        index: 0,
        routes: [{ name: "EndCreditScreen" }],
      });
      return;
    }

    const photo = await cameraRef.current?.takePictureAsync({ quality: 0.3 });
    if (photo?.uri) {
      setCapturedUri(photo.uri);
      setModalVisible(true);
    }
  };

  return (
    <>
      <CameraView
        style={styles.camera}
        facing={facing}
        flash={flashStatus}
        ref={(ref: any) => (cameraRef.current = ref)}
      >
        <TouchableOpacity
          style={[styles.settingButton, styles.flashButton]}
          onPress={toggleFlashStatus}
        >
          <FontAwesome name="flash" size={25} color={flashStatus === "on" ? "#e8be4b" : "white"} />
        </TouchableOpacity>

        <View style={styles.controlRow}>
          <TouchableOpacity onPress={() => navigation.navigate("TabNavigator")}>
            <FontAwesome name="chevron-left" size={35} color="white" />
          </TouchableOpacity>

          <TouchableOpacity style={styles.snapButton} onPress={takePicture} />

          <TouchableOpacity style={styles.settingButton} onPress={toggleCameraFacing}>
            <FontAwesome name="rotate-right" size={35} color="white" />
          </TouchableOpacity>
        </View>
      </CameraView>

      <ModalRating
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        imageUri={capturedUri}
        token={token}
      />
    </>
  );
}

const styles = StyleSheet.create({
  camera: { flex: 1, justifyContent: "flex-end" },
  settingButton: {
    width: 40,
    aspectRatio: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  controlRow: {
    position: "absolute",
    bottom: 60,
    left: 0,
    right: 0,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 40,
    marginBottom: 20,
  },
  flashButton: {
    position: "absolute",
    top: 50,
    right: 30,
  },
  snapButton: {
    width: 95,
    aspectRatio: 1,
    borderRadius: 50,
    backgroundColor: "rgba(255, 255, 255, 0.3)",
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 5,
    borderColor: "rgba(255, 255, 255, 0.5)",
  },
});
