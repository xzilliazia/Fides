import {
  MontserratAlternates_600SemiBold,
  useFonts,
} from "@expo-google-fonts/montserrat-alternates";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useEffect, useRef } from "react";

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
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="login" />
      <Stack.Screen name="reservation-guide" />
      <Stack.Screen name="contact-fo" />
    </Stack>
  );
}
