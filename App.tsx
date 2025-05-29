import React from "react";
import { StatusBar } from "expo-status-bar";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import _FontAwesome from "@react-native-vector-icons/fontawesome";
import { StyleSheet, Text, View } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import Header from "./components/Header";
import DashboardScreen from "./screens/dashboardScreen";
import SnapScreen from "./screens/snapscreen";
import TakePicScreen from "./screens/takePicScreen";
import InfosScreen from "./screens/infosScreen";
import LoginScreen from "./screens/loginScreen";
import PaymentScreen from "./screens/paymentScreen";
import SubscriptionScreen from "./screens/subscriptionScreen";
import UploadedPhotoScreen from "./screens/uploadedPhotoScreen";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { store, persistor } from "./store";
import DashboardStack from "./screens/dashboardStack";
import EndCreditScreen from "./screens/endCreditScreen";
import PhotosAlbumScreen from "./screens/photosAlbumScreen";
import BadgeUnlocker from "./components/BadgeUnlocker";

const FontAwesome = _FontAwesome as React.ElementType;
const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const TabNavigator = () => (
  <Tab.Navigator
    screenOptions={{
      tabBarActiveTintColor: "#2196f3",
      tabBarInactiveTintColor: "#ffffff",
      tabBarStyle: {
        backgroundColor: "#2a2e30",
        borderTopWidth: 0,
        elevation: 0,
        shadowColor: "transparent",
      },
    }}
  >
    <Tab.Screen
      name="Home"
      component={DashboardStack}
      options={{
        header: () => <Header />,
        tabBarIcon: ({ color, size }) => (
          <FontAwesome name="home" size={size} color={color} />
        ),
      }}
    />
    <Tab.Screen
      name="Take Picture"
      component={TakePicScreen}
      options={{
        header: () => <Header />,
        tabBarIcon: ({ color, size }) => (
          <LinearGradient
            colors={gradientColors}
            style={[styles.iconPic, { borderWidth: 2, borderColor: gradientColors2[0] }]}
          >
            <FontAwesome name="camera" size={size} color={color} />
          </LinearGradient>
        ),
        tabBarLabel: () => null,
      }}
    />
    <Tab.Screen
      name="Infos"
      component={InfosScreen}
      options={{
        headerShown: false,
        tabBarIcon: ({ color, size }) => (
          <FontAwesome name="user" size={size} color={color} />
        ),
      }}
    />
  </Tab.Navigator>
);

const AppContent = () => (
  <NavigationContainer>
    <Stack.Navigator>
      <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
      <Stack.Screen name="Snap" component={SnapScreen} options={{ headerShown: false }} />
      <Stack.Screen name="TakePic" component={TakePicScreen} options={{ headerShown: false }} />
      <Stack.Screen name="UploadedPhoto" component={UploadedPhotoScreen} options={{ headerShown: false }} />
      <Stack.Screen name="EndCreditScreen" component={EndCreditScreen} options={{ header: () => <Header /> }} />
      <Stack.Screen name="TabNavigator" component={TabNavigator} options={{ headerShown: false }} />
      <Stack.Screen name="subscribe" component={SubscriptionScreen} options={{ header: () => <Header /> }} />
      <Stack.Screen name="Infos" component={InfosScreen} options={{ headerShown: false }} />
      <Stack.Screen name="Payment" component={PaymentScreen} options={{ headerShown: false }} />
    </Stack.Navigator>
  </NavigationContainer>
);

export default function App() {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <AppContent />
        <BadgeUnlocker />
      </PersistGate>
    </Provider>
  );
}

const backgroundColor = "#2a2e30";
const textColor = "#ffffff";
const gradientColors: [string, string] = ["#8b43f1", "#d395ff"];
const gradientColors2: [string, string] = ["#eeeaec", "#ff0084"];

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: backgroundColor,
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    fontSize: 20,
    color: "#333",
  },
  iconPic: {
    borderRadius: 50,
    padding: 15,
    display: "flex",
    width: 60,
    height: 60,
    justifyContent: "center",
    alignItems: "center",
  },
});
