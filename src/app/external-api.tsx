import { useState } from "react";
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import PrimaryButton from "../components/PrimaryButton";
import { COLORS, SIZES } from "../constants/theme";
import { ExternalUser, fetchExternalUser } from "../services/externalUser";

export default function ExternalApiScreen() {
  const [user, setUser] = useState<ExternalUser | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const loadUser = () => {
    setIsLoading(true);
    setError(null);

    fetchExternalUser()
      .then((fetchedUser) => setUser(fetchedUser))
      .catch((reason: unknown) => {
        setError(
          reason instanceof Error ? reason.message : "Unable to load the user.",
        );
      })
      .finally(() => setIsLoading(false));
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.title}>External API fetch</Text>
        <Text style={styles.description}>
          Fetch a user from JSONPlaceholder and store the response in a typed
          object.
        </Text>

        <PrimaryButton
          title="Fetch user"
          onPress={loadUser}
          isLoading={isLoading}
          disabled={isLoading}
        />

        {error && <Text style={styles.error}>{error}</Text>}

        {user && (
          <View style={styles.userCard}>
            <Text style={styles.sectionTitle}>Fetched user object</Text>
            <Text style={styles.field}>ID: {user.id}</Text>
            <Text style={styles.field}>Name: {user.name}</Text>
            <Text style={styles.field}>Email: {user.email}</Text>
            <Text style={styles.field}>Website: {user.website}</Text>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  content: {
    flexGrow: 1,
    justifyContent: "center",
    padding: 24,
  },
  title: {
    marginBottom: 8,
    color: COLORS.textPrimary,
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
  },
  description: {
    marginBottom: 24,
    color: COLORS.textSecondary,
    fontSize: 15,
    lineHeight: 22,
    textAlign: "center",
  },
  userCard: {
    marginTop: 24,
    padding: 20,
    backgroundColor: COLORS.card,
    borderRadius: SIZES.cardRadius,
  },
  sectionTitle: {
    marginBottom: 12,
    color: COLORS.textPrimary,
    fontSize: 18,
    fontWeight: "bold",
  },
  field: {
    marginTop: 6,
    color: COLORS.textSecondary,
    fontSize: 15,
  },
  error: {
    marginTop: 16,
    color: "#B42318",
    fontSize: 14,
    textAlign: "center",
  },
});
