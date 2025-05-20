import { StatusBar } from "expo-status-bar";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import _FontAwesome from "@react-native-vector-icons/fontawesome";
const FontAwesome = _FontAwesome as React.ElementType;
import { StyleSheet, Text, View } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import Header from "./components/Header";
import DashboardScreen from "./screens/dashboardScreen";
import SettingsScreen from "./screens/settingsScreen";
import TakePicScreen from "./screens/takePicScreen";
import InfosScreen from "./screens/infosScreen";
import LoginScreen from "./screens/loginScreen";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const TabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size }) => {
          let iconName = "";

          if (route.name === "Home") {
            iconName = "home";
          } else if (route.name === "Take Picture") {
            iconName = "camera";
          } else if (route.name === "Infos") {
            iconName = "user";
          }

          return <FontAwesome name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: "#2196f3",
        tabBarInactiveTintColor: "#ffffff",
        tabBarStyle: {
          backgroundColor: "#2a2e30",
          borderTopWidth: 0,
          elevation: 0,
          shadowColor: "transparent",
        },
        headerShown: false,
      })}
    >
      <Tab.Screen name="Home" component={DashboardScreen} />
      <Tab.Screen
        name="Take Picture"
        component={TakePicScreen}
        options={{
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

      <Tab.Screen name="Infos" component={InfosScreen} />
    </Tab.Navigator>
  );
};
export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ header: () => <Header /> }}>
        <Stack.Screen name="TabNavigator" component={TabNavigator} />
        <Stack.Screen name="Home" component={DashboardScreen} />
        <Stack.Screen name="Settings" component={SettingsScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
//all colors
const backgroundColor = "#2a2e30";
const textColor = "#ffffff";

//linear gradient colors
const gradientColors = ["#8b43f1", "#d395ff"];
const gradientColors2 = ["#eeeaec", "#ff0084"];

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
