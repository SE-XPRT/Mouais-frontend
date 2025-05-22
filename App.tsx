import { StatusBar } from "expo-status-bar";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import _FontAwesome from "@react-native-vector-icons/fontawesome";
const FontAwesome = _FontAwesome as React.ElementType;
import { StyleSheet, Text, View } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import Header from "./components/Header";
import DashboardScreen from "./screens/dashboardScreen";
import SnapScreen from "./screens/snapscreen";
import TakePicScreen from "./screens/takePicScreen";
import InfosScreen from "./screens/infosScreen";
import LoginScreen from "./screens/loginScreen";
import UploadedPhotoScreen from "./screens/uploadedPhotoScreen";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { configureStore } from "@reduxjs/toolkit";
import { Provider } from "react-redux";
import users from "./reducers/users";
import filters from "./reducers/filters";

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const store = configureStore({
  reducer: {
    users,
    filters,
  },
});
const TabNavigator = () => {
  return (
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
        component={DashboardScreen}
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
              style={[
                styles.iconPic,
                { borderWidth: 2, borderColor: gradientColors2[0] },
              ]}
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
};
export default function App() {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen name="Snap" component={SnapScreen} />
          <Stack.Screen
            name="TakePic"
            component={TakePicScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen name="UploadedPhoto" component={UploadedPhotoScreen} />
          <Stack.Screen name="TabNavigator" component={TabNavigator} />
          <Stack.Screen name="Home" component={DashboardScreen} />
          <Stack.Screen
            name="Infos"
            component={InfosScreen}
            options={{ headerShown: false }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}
//all colors
const backgroundColor = "#2a2e30";
const textColor = "#ffffff";

//linear gradient colors
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
