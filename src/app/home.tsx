import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import {
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { COLORS, SIZES } from "../constants/theme";
import { useAuth } from "../context/AuthContext";

export default function HomeScreen() {
  const router = useRouter();
  const { session } = useAuth();
  const metadataName = [
    session?.user.user_metadata?.full_name,
    session?.user.user_metadata?.name,
  ].find(
    (value): value is string =>
      typeof value === "string" && value.trim().length > 0,
  );
  const emailName = session?.user.email?.split("@")[0]?.replace(/[._-]+/g, " ").trim();
  const displayName = metadataName?.trim() || emailName || "Pengguna";

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.topBar}>
          <Image
            source={require("../../assets/images/logo-fides.png")}
            style={styles.logo}
            resizeMode="contain"
            accessibilityLabel="Fides"
          />
        </View>

        <View style={styles.hero}>
          <View style={styles.greetingRow}>
            <View style={styles.avatar}>
              <Ionicons name="person" size={27} color={COLORS.primary} />
            </View>
            <Text style={styles.greeting}>Halo, {displayName}!</Text>
          </View>
        </View>

        <View style={styles.contentBody}>
          <View style={styles.searchBox}>
            <Ionicons name="search" size={24} color={COLORS.textPrimary} />
            <TextInput
              style={styles.searchInput}
              placeholder="Cari ruangan lab atau alat portable..."
              placeholderTextColor={COLORS.textSecondary}
              editable={false}
              accessibilityLabel="Pencarian ruangan lab atau alat portable"
            />
          </View>

          <TouchableOpacity
            style={styles.tokenButton}
            onPress={() => router.push("/token-storage")}
            accessibilityRole="button"
          >
            <View style={styles.tokenIcon}>
              <Ionicons name="shield-checkmark-outline" size={22} color={COLORS.primary} />
            </View>
            <Text style={styles.tokenButtonText}>Secure Token Storage</Text>
            <Ionicons name="chevron-forward" size={20} color={COLORS.icon} />
          </TouchableOpacity>
        </View>
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
    paddingBottom: 24,
  },
  topBar: {
    height: 68,
    paddingHorizontal: 24,
    justifyContent: "center",
    backgroundColor: COLORS.card,
  },
  logo: {
    width: 42,
    height: 42,
  },
  hero: {
    minHeight: 190,
    paddingHorizontal: 24,
    paddingTop: 32,
    paddingBottom: 64,
    justifyContent: "center",
    backgroundColor: COLORS.primary,
    borderBottomLeftRadius: 36,
    borderBottomRightRadius: 36,
  },
  greetingRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  avatar: {
    width: 56,
    height: 56,
    marginRight: 14,
    borderRadius: 28,
    backgroundColor: COLORS.card,
    alignItems: "center",
    justifyContent: "center",
  },
  greeting: {
    flex: 1,
    color: COLORS.card,
    fontSize: 23,
    fontWeight: "700",
  },
  contentBody: {
    paddingHorizontal: 24,
    marginTop: -28,
  },
  searchBox: {
    minHeight: 58,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    backgroundColor: COLORS.card,
    borderWidth: 1,
    borderColor: COLORS.primary,
    borderRadius: SIZES.cardRadius,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.1,
    shadowRadius: 7,
    elevation: 3,
  },
  searchInput: {
    flex: 1,
    marginLeft: 12,
    paddingVertical: 12,
    color: COLORS.textPrimary,
    fontSize: 15,
  },
  tokenButton: {
    minHeight: 64,
    flexDirection: "row",
    alignItems: "center",
    marginTop: 18,
    paddingHorizontal: 16,
    backgroundColor: COLORS.card,
    borderRadius: SIZES.cardRadius,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  tokenIcon: {
    width: 40,
    height: 40,
    marginRight: 12,
    borderRadius: 20,
    backgroundColor: "#EAF2FF",
    alignItems: "center",
    justifyContent: "center",
  },
  tokenButtonText: {
    flex: 1,
    color: COLORS.textPrimary,
    fontSize: 15,
    fontWeight: "600",
  },
});
