import { Ionicons } from "@expo/vector-icons";
import { useRouter, type Href } from "expo-router";
import { useState } from "react";
import {
  ActivityIndicator,
  Image,
  ImageBackground,
  KeyboardAvoidingView,
  Modal,
  Platform,
  ScrollView,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import CustomInput from "../components/CustomInput";
import PrimaryButton from "../components/PrimaryButton";
import { COLORS, SIZES } from "../constants/theme";
import { useAuth } from "../context/AuthContext";

const quickLinks: {
  id: string;
  title: string;
  description: string;
  icon: keyof typeof Ionicons.glyphMap;
  href: Href;
  requiresSession?: boolean;
}[] = [
  {
    id: "reservation-guide",
    title: "Reservation guide",
    description: "How to reserve laboratory equipment",
    icon: "calendar-outline",
    href: "/reservation-guide",
  },
  {
    id: "contact-fo",
    title: "Contact Front Office",
    description: "Get help from the laboratory team",
    icon: "chatbubble-ellipses-outline",
    href: "/contact-fo",
  },
  {
    id: "token-storage",
    title: "Secure token storage",
    description: "Learn how session tokens are stored",
    icon: "shield-checkmark-outline",
    href: "/token-storage",
    requiresSession: true,
  },
];

export default function LoginScreen() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [remindMe, setRemindMe] = useState(false);
  const [signupOpen, setSignupOpen] = useState(false);
  const [signupEmail, setSignupEmail] = useState("");
  const [signupPassword, setSignupPassword] = useState("");
  const [busy, setBusy] = useState(false);
  const [notice, setNotice] = useState("");
  const [noticeIsError, setNoticeIsError] = useState(false);
  const { session, loading: authLoading, configError, signIn, signUp, signOut } = useAuth();

  const handleLogin = async () => {
    setNotice("");
    if (!email.trim() || !password) {
      setNotice("Enter your email and password.");
      setNoticeIsError(true);
      return;
    }
    setBusy(true);
    try {
      await signIn(email.trim(), password);
      setNotice("Login succeed");
      setNoticeIsError(false);
    } catch (error) {
      setNotice(error instanceof Error ? error.message : "Could not sign in.");
      setNoticeIsError(true);
    } finally {
      setBusy(false);
    }
  };

  const handleSignup = async () => {
    setNotice("");
    if (!signupEmail.trim() || !signupPassword) {
      setNotice("Enter an email and password to create an account.");
      setNoticeIsError(true);
      return;
    }
    if (signupPassword.length < 6) {
      setNotice("Password must be at least 6 characters.");
      setNoticeIsError(true);
      return;
    }
    setBusy(true);
    try {
      const { needsEmailConfirmation } = await signUp(signupEmail.trim(), signupPassword);
      setSignupOpen(false);
      setSignupPassword("");
      setNotice(needsEmailConfirmation
        ? "Account created. Check your email to confirm it before signing in."
        : "Account created and signed in.");
      setNoticeIsError(false);
    } catch (error) {
      setNotice(error instanceof Error ? error.message : "Could not create the account.");
      setNoticeIsError(true);
    } finally {
      setBusy(false);
    }
  };

  const handleSignout = async () => {
    setBusy(true);
    setNotice("");
    try {
      await signOut();
      setNotice("Signed out.");
      setNoticeIsError(false);
    } catch (error) {
      setNotice(error instanceof Error ? error.message : "Could not sign out.");
      setNoticeIsError(true);
    } finally {
      setBusy(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        keyboardShouldPersistTaps="handled"
      >
        <View style={styles.headerWrapper}>
          <ImageBackground
            source={require("../../assets/images/lab-bg.jpg")}
            style={styles.topBackground}
            imageStyle={styles.backgroundImage}
          >
            <View style={styles.overlay}>
              <View style={styles.logoContainer}>
                <Image
                  source={require("../../assets/images/logo-fides.png")}
                  style={styles.logoImage}
                  resizeMode="contain"
                />
                <Text style={styles.logoText}>Fides</Text>
              </View>
            </View>
          </ImageBackground>
        </View>

        <View style={styles.cardContainer}>
          <Text style={styles.title}>Welcome</Text>
          <Text style={styles.subtitle}>
            Sign in to continue with equipment and laboratory reservations
          </Text>

          <CustomInput
            label="Email Address / NIM"
            iconName="mail-outline"
            placeholder="nama@student.kampus.ac.id"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
            autoCorrect={false}
          />

          <CustomInput
            label="Password / PIC"
            iconName="lock-closed-outline"
            placeholder="••••••••"
            value={password}
            onChangeText={setPassword}
            isPassword
            autoCapitalize="none"
            autoCorrect={false}
          />

          <View style={styles.optionsContainer}>
            <TouchableOpacity
              style={styles.checkboxContainer}
              onPress={() => setRemindMe(!remindMe)}
              accessibilityRole="checkbox"
              accessibilityState={{ checked: remindMe }}
            >
              <Ionicons
                name={remindMe ? "checkbox" : "square-outline"}
                size={20}
                color={remindMe ? COLORS.primary : COLORS.icon}
              />
              <Text style={styles.remindMeText}>Remind me</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => router.push("/contact-fo")}
              accessibilityRole="link"
            >
              <Text style={styles.forgotText}>Forgot password?</Text>
            </TouchableOpacity>
          </View>

          {authLoading ? (
            <ActivityIndicator color={COLORS.primary} style={styles.authLoading} />
          ) : session ? (
            <View>
              <Text style={styles.signedInText}>Signed in as {session.user.email}</Text>
              <PrimaryButton title="Sign out" onPress={handleSignout} isLoading={busy} />
            </View>
          ) : (
            <>
              <PrimaryButton title="Sign in" onPress={handleLogin} isLoading={busy} />
              <TouchableOpacity
                style={styles.signupLink}
                onPress={() => { setNotice(""); setSignupOpen(true); }}
                accessibilityRole="button"
              >
                <Text style={styles.signupLinkText}>
                  Don&apos;t have an account? <Text style={styles.signupLinkEmphasis}>Sign up</Text>
                </Text>
              </TouchableOpacity>
            </>
          )}
          {configError ? <Text style={styles.errorText}>{configError}</Text> : null}
          {notice ? (
            <Text style={noticeIsError ? styles.errorText : styles.successText}>{notice}</Text>
          ) : null}

          <View style={styles.helpSection}>
            <Text style={styles.helpHeading}>Help &amp; resources</Text>
            {quickLinks
              .filter((link) => !link.requiresSession || session)
              .map((link) => (
                <TouchableOpacity
                  key={link.id}
                  style={styles.helpLink}
                  onPress={() => router.push(link.href)}
                  accessibilityRole="link"
                >
                  <View style={styles.helpIconContainer}>
                    <Ionicons name={link.icon} size={19} color={COLORS.primary} />
                  </View>
                  <View style={styles.helpLinkText}>
                    <Text style={styles.helpLinkTitle}>{link.title}</Text>
                    <Text style={styles.helpLinkDescription}>{link.description}</Text>
                  </View>
                  <Ionicons name="chevron-forward" size={18} color={COLORS.icon} />
                </TouchableOpacity>
              ))}
          </View>
        </View>

        <Text style={styles.footerText}>Informatics Laboratory © 2026</Text>
      </ScrollView>

      <Modal
        visible={signupOpen}
        transparent
        animationType="fade"
        onRequestClose={() => setSignupOpen(false)}
      >
        <KeyboardAvoidingView
          style={styles.modalBackdrop}
          behavior={Platform.OS === "ios" ? "padding" : undefined}
        >
          <ScrollView
            contentContainerStyle={styles.modalScrollContent}
            keyboardShouldPersistTaps="handled"
          >
            <View style={styles.modalCard}>
              <Text style={styles.modalTitle}>Create account</Text>
              <Text style={styles.modalSubtitle}>
                Use your email address to create a Fides account.
              </Text>
              <CustomInput
                label="Email address"
                iconName="mail-outline"
                placeholder="you@example.com"
                value={signupEmail}
                onChangeText={setSignupEmail}
                keyboardType="email-address"
                autoCapitalize="none"
                autoCorrect={false}
              />
              <CustomInput
                label="Password"
                iconName="lock-closed-outline"
                placeholder="At least 6 characters"
                value={signupPassword}
                onChangeText={setSignupPassword}
                isPassword
                autoCapitalize="none"
                autoCorrect={false}
              />
              {notice && noticeIsError ? <Text style={styles.errorText}>{notice}</Text> : null}
              <PrimaryButton title="Sign up" onPress={handleSignup} isLoading={busy} />
              <TouchableOpacity
                style={styles.cancelButton}
                onPress={() => setSignupOpen(false)}
                disabled={busy}
                accessibilityRole="button"
              >
                <Text style={styles.cancelText}>Cancel</Text>
              </TouchableOpacity>
            </View>
          </ScrollView>
        </KeyboardAvoidingView>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  scrollContent: {
    flexGrow: 1,
    paddingBottom: 20,
  },
  headerWrapper: {
    height: 300,
    width: "100%",
    overflow: "hidden",
    borderBottomLeftRadius: 40,
    borderBottomRightRadius: 40,
  },
  topBackground: {
    width: "100%",
    height: "100%",
    justifyContent: "center",
  },
  backgroundImage: {
    resizeMode: "cover",
  },
  overlay: {
    position: "absolute",
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: COLORS.overlay,
    alignItems: "center",
    paddingTop: 60,
  },
  logoContainer: {
    alignItems: "center",
    flexDirection: "column",
  },
  logoImage: {
    width: 90,
    height: 90,
    marginBottom: 10,
  },
  logoText: {
    fontFamily: "MontserratAlternates_600SemiBold",
    fontSize: 48,
    color: COLORS.card,
    letterSpacing: -0.85,
  },
  cardContainer: {
    backgroundColor: COLORS.card,
    marginHorizontal: 20,
    marginTop: -68,
    borderRadius: SIZES.cardRadius,
    padding: 24,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: COLORS.textPrimary,
    textAlign: "center",
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 14,
    color: COLORS.textSecondary,
    textAlign: "center",
    marginBottom: 24,
    lineHeight: 20,
  },
  optionsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
    minHeight: 40,
  },
  checkboxContainer: {
    flexDirection: "row",
    alignItems: "center",
    minHeight: 44,
    paddingRight: 8,
  },
  remindMeText: {
    marginLeft: 8,
    fontSize: 14,
    color: COLORS.textSecondary,
  },
  forgotText: {
    fontSize: 14,
    color: COLORS.primary,
    fontWeight: "600",
  },
  footerText: {
    textAlign: "center",
    color: COLORS.icon,
    fontSize: 12,
    marginTop: 20,
  },
  signupLink: {
    alignSelf: "center",
    paddingVertical: 16,
    minHeight: 48,
    justifyContent: "center",
  },
  signupLinkText: { color: COLORS.textSecondary, fontSize: 14 },
  signupLinkEmphasis: { color: COLORS.primary, fontWeight: "700" },
  authLoading: { marginVertical: 16 },
  signedInText: { color: COLORS.textSecondary, textAlign: "center", marginBottom: 12 },
  successText: { color: "#188038", textAlign: "center", marginTop: 12 },
  errorText: { color: "#B3261E", textAlign: "center", marginTop: 12 },
  helpSection: {
    marginTop: 8,
    paddingTop: 18,
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: COLORS.border,
  },
  helpHeading: {
    color: COLORS.textPrimary,
    fontSize: 15,
    fontWeight: "700",
    marginBottom: 8,
  },
  helpLink: {
    minHeight: 64,
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 10,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: COLORS.border,
  },
  helpIconContainer: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: "#EAF2FF",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 12,
  },
  helpLinkText: {
    flex: 1,
    paddingRight: 8,
  },
  helpLinkTitle: {
    color: COLORS.textPrimary,
    fontSize: 14,
    fontWeight: "600",
  },
  helpLinkDescription: {
    color: COLORS.textSecondary,
    fontSize: 12,
    marginTop: 3,
  },
  modalBackdrop: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "rgba(0,0,0,0.45)",
  },
  modalScrollContent: {
    flexGrow: 1,
    justifyContent: "center",
    padding: 24,
  },
  modalCard: {
    backgroundColor: COLORS.card,
    borderRadius: SIZES.cardRadius,
    padding: 24,
  },
  modalTitle: {
    color: COLORS.textPrimary,
    fontSize: 22,
    fontWeight: "bold",
    textAlign: "center",
  },
  modalSubtitle: {
    color: COLORS.textSecondary,
    fontSize: 14,
    lineHeight: 20,
    textAlign: "center",
    marginTop: 8,
    marginBottom: 20,
  },
  cancelButton: {
    alignItems: "center",
    justifyContent: "center",
    minHeight: 48,
    marginTop: 4,
  },
  cancelText: { color: COLORS.textSecondary, fontWeight: "600" },
});
