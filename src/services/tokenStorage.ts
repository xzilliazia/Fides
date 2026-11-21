import { Platform } from "react-native";
import * as SecureStore from "expo-secure-store";

const TOKEN_STORAGE_KEY = "fides.auth.tokens";

export type StoredTokens = {
  accessToken: string;
  refreshToken: string;
};

function ensureNativePlatform() {
  if (Platform.OS === "web") {
    throw new Error("Secure token storage is available on iOS and Android only.");
  }
}

export async function saveTokens(tokens: StoredTokens): Promise<void> {
  ensureNativePlatform();
  await SecureStore.setItemAsync(TOKEN_STORAGE_KEY, JSON.stringify(tokens));
}

export async function loadTokens(): Promise<StoredTokens | null> {
  ensureNativePlatform();
  const value = await SecureStore.getItemAsync(TOKEN_STORAGE_KEY);
  if (!value) return null;

  const parsed: unknown = JSON.parse(value);
  if (
    typeof parsed !== "object" ||
    parsed === null ||
    typeof (parsed as Record<string, unknown>).accessToken !== "string" ||
    typeof (parsed as Record<string, unknown>).refreshToken !== "string"
  ) {
    throw new Error("Stored token data is invalid. Wipe it and try again.");
  }

  return parsed as StoredTokens;
}

export async function wipeTokens(): Promise<void> {
  ensureNativePlatform();
  await SecureStore.deleteItemAsync(TOKEN_STORAGE_KEY);
}
