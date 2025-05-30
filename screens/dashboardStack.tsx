import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import DashboardScreen from "./dashboardScreen";
import SubscriptionScreen from "./subscriptionScreen";
import PaymentScreen from "./paymentScreen";
import EndCreditScreen from "./endCreditScreen";
import PhotosAlbumScreen from "./photosAlbumScreen";

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
    <Stack.Screen
      name="payment"
      component={PaymentScreen}
      options={{ headerShown: false }}
    />
    <Stack.Screen
      name="endCredit"
      component={EndCreditScreen}
      options={{ headerShown: false }}
    />
    <Stack.Screen
      name="PhotosAlbum"
      component={PhotosAlbumScreen}
      options={{ headerShown: false }}
    />
  </Stack.Navigator>
);

export default DashboardStack;
