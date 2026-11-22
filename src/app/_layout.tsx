import {
  MontserratAlternates_600SemiBold,
  useFonts,
} from "@expo-google-fonts/montserrat-alternates";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useEffect, useRef } from "react";
import { ActivityIndicator, View } from "react-native";
import { AuthProvider, useAuth } from "../context/AuthContext";

SplashScreen.preventAutoHideAsync();

const minimumSplashDuration = 7000;

export default function RootLayout() {
  const [loaded, error] = useFonts({
    MontserratAlternates_600SemiBold,
  });
  const layoutStartedAt = useRef(Date.now());

  useEffect(() => {
    if (!loaded && !error) {
      return;
    }

    const elapsed = Date.now() - layoutStartedAt.current;
    const remaining = Math.max(0, minimumSplashDuration - elapsed);
    const timeout = setTimeout(() => {
      SplashScreen.hideAsync();
    }, remaining);

    return () => clearTimeout(timeout);
  }, [loaded, error]);

  if (!loaded && !error) {
    return null;
  }

  return (
    <AuthProvider>
      <RootNavigator />
    </AuthProvider>
  );
}

function RootNavigator() {
  const { session, loading } = useAuth();

  if (loading) {
    return (
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <ActivityIndicator />
      </View>
    );
  }

  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="index" />
      <Stack.Screen name="reservation-guide" />
      <Stack.Screen name="contact-fo" />
      <Stack.Protected guard={!!session}>
        <Stack.Screen name="home" />
        <Stack.Screen name="token-storage" />
      </Stack.Protected>
      <Stack.Protected guard={!session}>
        <Stack.Screen name="login" />
      </Stack.Protected>
    </Stack>
  );
}
