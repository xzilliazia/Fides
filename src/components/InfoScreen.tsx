import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useState } from "react";
import {
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { COLORS, SIZES } from "../constants/theme";

interface InfoScreenProps {
  title: string;
  description: string;
  details: string;
}

export default function InfoScreen({
  title,
  description,
  details,
}: InfoScreenProps) {
  const router = useRouter();
  const [showDetails, setShowDetails] = useState(true);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <TouchableOpacity
          accessibilityRole="button"
          accessibilityLabel="Go back"
          onPress={() => router.back()}
          style={styles.backButton}
        >
          <Ionicons name="arrow-back" size={22} color={COLORS.primary} />
          <Text style={styles.backText}>Back</Text>
        </TouchableOpacity>

        <Text style={styles.title}>{title}</Text>
        <Text style={styles.description}>{description}</Text>

        <TouchableOpacity
          accessibilityRole="button"
          accessibilityState={{ expanded: showDetails }}
          onPress={() => setShowDetails((visible) => !visible)}
          style={styles.detailsToggle}
        >
          <Text style={styles.detailsToggleText}>
            {showDetails ? "Hide details" : "Show details"}
          </Text>
          <Ionicons
            name={showDetails ? "chevron-up" : "chevron-down"}
            size={18}
            color={COLORS.primary}
          />
        </TouchableOpacity>

        {showDetails && <Text style={styles.details}>{details}</Text>}

        <TouchableOpacity
          accessibilityRole="button"
          onPress={() => router.replace("/login")}
          style={styles.loginButton}
        >
          <Text style={styles.loginButtonText}>Return to sign in</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  content: {
    flex: 1,
    margin: 20,
    marginTop: 32,
    padding: 24,
    backgroundColor: COLORS.card,
    borderRadius: SIZES.cardRadius,
  },
  backButton: {
    flexDirection: "row",
    alignItems: "center",
    alignSelf: "flex-start",
    marginBottom: 32,
  },
  backText: {
    marginLeft: 8,
    color: COLORS.primary,
    fontSize: 16,
    fontWeight: "600",
  },
  title: {
    marginBottom: 12,
    color: COLORS.textPrimary,
    fontSize: 24,
    fontWeight: "bold",
  },
  description: {
    color: COLORS.textSecondary,
    fontSize: 16,
    lineHeight: 24,
  },
  detailsToggle: {
    flexDirection: "row",
    alignItems: "center",
    alignSelf: "flex-start",
    marginTop: 24,
  },
  detailsToggleText: {
    marginRight: 8,
    color: COLORS.primary,
    fontSize: 15,
    fontWeight: "600",
  },
  details: {
    marginTop: 12,
    color: COLORS.textSecondary,
    fontSize: 15,
    lineHeight: 24,
  },
  loginButton: {
    marginTop: "auto",
    paddingVertical: 14,
    alignItems: "center",
    backgroundColor: COLORS.primary,
    borderRadius: SIZES.radius,
  },
  loginButtonText: {
    color: COLORS.card,
    fontSize: 16,
    fontWeight: "bold",
  },
});
