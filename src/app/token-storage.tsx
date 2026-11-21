import { useState } from "react";
import {
  ActivityIndicator,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { useRouter } from "expo-router";
import PrimaryButton from "../components/PrimaryButton";
import { COLORS, SIZES } from "../constants/theme";
import { loadTokens, saveTokens, wipeTokens } from "../services/tokenStorage";
import type { StoredTokens } from "../services/tokenStorage";

export default function TokenStorageScreen() {
  const router = useRouter();
  const [accessToken, setAccessToken] = useState("");
  const [refreshToken, setRefreshToken] = useState("");
  const [message, setMessage] = useState("");
  const [busy, setBusy] = useState(false);
  const [loadedTokens, setLoadedTokens] = useState<StoredTokens | null>(null);

  const run = async (action: () => Promise<void>) => {
    setBusy(true);
    setMessage("");
    try {
      await action();
    } catch (error) {
      setMessage(error instanceof Error ? error.message : "Something went wrong.");
    } finally {
      setBusy(false);
    }
  };

  const handleSave = () =>
    run(async () => {
      if (!accessToken.trim() || !refreshToken.trim()) {
        throw new Error("Enter both tokens before saving.");
      }
      await saveTokens({ accessToken: accessToken.trim(), refreshToken: refreshToken.trim() });
      setLoadedTokens({ accessToken: accessToken.trim(), refreshToken: refreshToken.trim() });
      setMessage("Tokens saved securely on this device.");
    });

  const handleLoad = () =>
    run(async () => {
      const tokens = await loadTokens();
      if (!tokens) {
        setAccessToken("");
        setRefreshToken("");
        setLoadedTokens(null);
        setMessage("No saved tokens found.");
        return;
      }
      setAccessToken(tokens.accessToken);
      setRefreshToken(tokens.refreshToken);
      setLoadedTokens(tokens);
      setMessage("Tokens loaded from secure storage.");
    });

  const handleWipe = () =>
    run(async () => {
      await wipeTokens();
      setAccessToken("");
      setRefreshToken("");
      setLoadedTokens(null);
      setMessage("Saved tokens wiped.");
    });

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.content} keyboardShouldPersistTaps="handled">
        <Text style={styles.back} onPress={() => router.back()}>‹ Back</Text>
        <Text style={styles.title}>Secure Token Storage</Text>
        <Text style={styles.subtitle}>Save and manage tokens on this device.</Text>

        <Text style={styles.label}>Access token</Text>
        <TextInput
          value={accessToken}
          onChangeText={setAccessToken}
          placeholder="Enter access token"
          placeholderTextColor={COLORS.textHint}
          autoCapitalize="none"
          autoCorrect={false}
          style={styles.input}
        />
        <Text style={styles.label}>Refresh token</Text>
        <TextInput
          value={refreshToken}
          onChangeText={setRefreshToken}
          placeholder="Enter refresh token"
          placeholderTextColor={COLORS.textHint}
          autoCapitalize="none"
          autoCorrect={false}
          style={styles.input}
        />

        {busy ? <ActivityIndicator color={COLORS.primary} style={styles.spinner} /> : null}
        <View style={styles.actions}>
          <PrimaryButton title="Save tokens" onPress={handleSave} disabled={busy} />
          <PrimaryButton title="Load tokens" onPress={handleLoad} disabled={busy} />
          <PrimaryButton title="Wipe tokens" onPress={handleWipe} disabled={busy} />
        </View>
        {loadedTokens ? (
          <View style={styles.tokenResult}>
            <Text style={styles.resultTitle}>Current stored tokens</Text>
            <Text style={styles.resultLabel}>Access token</Text>
            <Text selectable style={styles.tokenValue}>{loadedTokens.accessToken}</Text>
            <Text style={styles.resultLabel}>Refresh token</Text>
            <Text selectable style={styles.tokenValue}>{loadedTokens.refreshToken}</Text>
          </View>
        ) : null}
        {message ? <Text style={styles.message}>{message}</Text> : null}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.background },
  content: { padding: 24, flexGrow: 1 },
  back: { color: COLORS.primary, fontSize: 16, marginBottom: 24 },
  title: { color: COLORS.textPrimary, fontSize: 24, fontWeight: "bold", textAlign: "center" },
  subtitle: { color: COLORS.textSecondary, textAlign: "center", marginTop: 8, marginBottom: 28 },
  label: { color: COLORS.textPrimary, fontWeight: "600", marginBottom: 8, marginTop: 12 },
  input: {
    height: 50,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: SIZES.radius,
    paddingHorizontal: 12,
    color: COLORS.textPrimary,
    backgroundColor: COLORS.card,
  },
  actions: { gap: 12, marginTop: 24 },
  spinner: { marginTop: 20 },
  tokenResult: {
    marginTop: 24,
    padding: 16,
    borderRadius: SIZES.radius,
    backgroundColor: COLORS.card,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  resultTitle: { color: COLORS.textPrimary, fontWeight: "700", marginBottom: 8 },
  resultLabel: { color: COLORS.textSecondary, fontSize: 12, marginTop: 8 },
  tokenValue: { color: COLORS.textPrimary, fontSize: 13, marginTop: 4 },
  message: { color: COLORS.textSecondary, textAlign: "center", marginTop: 18 },
});
