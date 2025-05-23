// DashboardStack.tsx
import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import DashboardScreen from "./dashboardScreen";
import SubscriptionScreen from "./subscriptionScreen";

const Stack = createNativeStackNavigator();

const DashboardStack = () => (
  <Stack.Navigator>
    <Stack.Screen
      name="DashboardHome"
      component={DashboardScreen}
      options={{ headerShown: false }}
    />
    <Stack.Screen
      name="subscribe"
      component={SubscriptionScreen}
      options={{ headerShown: false }}
    />
  </Stack.Navigator>
);

export default DashboardStack;
