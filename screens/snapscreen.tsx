import React, { useState, useEffect, useRef } from "react";
import {
  StyleSheet,
  TouchableOpacity,
  View,
  Text,
} from "react-native";
import { CameraView, CameraType, FlashMode, Camera } from "expo-camera";
import { useDispatch } from "react-redux";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import { useIsFocused } from "@react-navigation/native";

export default function SnapScreen() {
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

    return (

    )
}
