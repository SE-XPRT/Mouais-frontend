import { StyleSheet, Text, View } from "react-native";
import { useNavigation } from "@react-navigation/native";
export default function DashboardScreen() {
  const navigation = useNavigation({ navigation });

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Dashboard</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    fontSize: 24,
    fontWeight: "bold",
  },
});
