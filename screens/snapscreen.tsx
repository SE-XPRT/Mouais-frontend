import React, { useState, useEffect, useRef } from "react";
import {
  StyleSheet,
  TouchableOpacity,
  View,
  Text,
  SafeAreaView,
} from "react-native";
import { CameraView, CameraType, FlashMode, Camera } from "expo-camera";
import { useDispatch } from "react-redux";
import _FontAwesome from "@react-native-vector-icons/fontawesome";
const FontAwesome = _FontAwesome as React.ElementType;
import { useIsFocused } from "@react-navigation/native";
import { useNavigation, NavigationProp } from "@react-navigation/native";
import Constants from "expo-constants";
const API_URL = Constants.expoConfig?.extra?.API_URL ?? "";

type RootStackParamList = {
  TabNavigator: undefined;
};

export default function SnapScreen() {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const isFocused = useIsFocused();

  const cameraRef = useRef<CameraView | null>(null);

  const [hasPermission, setHasPermission] = useState(false);
  const [facing, setFacing] = useState<CameraType>("back");
  const [flashStatus, setFlashStatus] = useState<FlashMode>("off");

  useEffect(() => {
    (async () => {
      const result = await Camera.requestCameraPermissionsAsync();
      setHasPermission(result && result?.status === "granted");
    })();
  }, []);

  if (!hasPermission || !isFocused) {
    return <View />;
  }

  const toggleCameraFacing = () => {
    setFacing((current: CameraType) => (current === "back" ? "front" : "back"));
  };

  const toggleFlashStatus = () => {
    setFlashStatus((current: FlashMode) => (current === "off" ? "on" : "off"));
  };

  const takePicture = async () => {
    const photo: any = await cameraRef.current?.takePictureAsync({
      quality: 0.3,
    });
    if(photo) {
    await fetch(`${API_URL}/photos/upload`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          imageUrl: photo.uri,
          userToken: "1",
        }),
    })

    } 
  };

  return (
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
        <FontAwesome
          name="flash"
          size={25}
          color={flashStatus === "on" ? "#e8be4b" : "white"}
        />
      </TouchableOpacity>
      <View
        style={{
          position: "absolute",
          bottom: 60,
          left: 0,
          right: 0,
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center",
          gap: 40,
          marginBottom: 20,
        }}
      >
        <TouchableOpacity onPress={() => navigation.navigate("TabNavigator")}>
          <FontAwesome name="chevron-left" size={35} color="white" />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.snapButton}
          onPress={takePicture}
        ></TouchableOpacity>
        <TouchableOpacity
          style={styles.settingButton}
          onPress={toggleCameraFacing}
        >
          <FontAwesome name="rotate-right" size={35} color="white" />
        </TouchableOpacity>
      </View>
    </CameraView>
  );
}

const styles = StyleSheet.create({
  camera: {
    flex: 1,
    justifyContent: "flex-end",
  },
  settingButton: {
    width: 40,
    aspectRatio: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  snapContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "flex-end",
    marginBottom: 100,
    gap: 50,
  },
  facingButton: {
    position: "absolute",
    right: "20%",
    bottom: "14.5%",
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
    shadowColor: "rgba(0, 0, 0, 0.5)",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.5,
    shadowRadius: 3.84,
  },
});
