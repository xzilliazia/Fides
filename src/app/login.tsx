import { Ionicons } from "@expo/vector-icons";
import { useRouter, type Href } from "expo-router";
import { useState } from "react";
import {
  ActivityIndicator,
  Alert,
  Image,
  ImageBackground,
  Modal,
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

const quickLinks = [
  { id: 1, title: "Reservation guide", href: "/reservation-guide" },
  { id: 2, title: "contact Front Office (FO)", href: "/contact-fo" },
  { id: 3, title: "External API fetch demo", href: "/external-api" },
  { id: 4, title: "Secure token storage", href: "/token-storage" },
] as const;

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
        />

        <CustomInput
          label="Password / PIC"
          iconName="lock-closed-outline"
          placeholder="••••••••"
          value={password}
          onChangeText={setPassword}
          isPassword
        />

        <View style={styles.optionsContainer}>
          <TouchableOpacity
            style={styles.checkboxContainer}
            onPress={() => setRemindMe(!remindMe)}
          >
            <Ionicons
              name={remindMe ? "checkbox" : "square-outline"}
              size={20}
              color={remindMe ? COLORS.primary : COLORS.icon}
            />
            <Text style={styles.remindMeText}>Remind me</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => Alert.alert("Password Lupa?", "WOWOKWOWK kejebak")}
          >
            <Text style={styles.forgotText}>Forgot Password?</Text>
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
            >
              <Text style={styles.signupLinkText}>Create an account</Text>
            </TouchableOpacity>
          </>
        )}
        {configError ? <Text style={styles.errorText}>{configError}</Text> : null}
        {notice ? (
          <Text style={noticeIsError ? styles.errorText : styles.successText}>{notice}</Text>
        ) : null}
        <View style={{ marginTop: 20 }}>
          {quickLinks.map((link) => (
            <TouchableOpacity
              key={link.id}
              onPress={() => router.push(link.href as Href)}
            >
              <Text
                style={{
                  fontSize: 13,
                  color: "#0066FF",
                  textAlign: "center",
                  marginVertical: 4,
                  textDecorationLine: "underline",
                }}
              >
                {link.title}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      <Text style={styles.footerText}>Informatics Laboratory © 2026</Text>
      <Modal
        visible={signupOpen}
        transparent
        animationType="fade"
        onRequestClose={() => setSignupOpen(false)}
      >
        <View style={styles.modalBackdrop}>
          <View style={styles.modalCard}>
            <Text style={styles.modalTitle}>Create account</Text>
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
            />
            {notice && noticeIsError ? <Text style={styles.errorText}>{notice}</Text> : null}
            <PrimaryButton title="Sign up" onPress={handleSignup} isLoading={busy} />
            <TouchableOpacity
              style={styles.cancelButton}
              onPress={() => setSignupOpen(false)}
              disabled={busy}
            >
              <Text style={styles.cancelText}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  headerWrapper: {
    height: "40%",
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
    marginTop: -80,
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
    marginBottom: 24,
  },
  checkboxContainer: {
    flexDirection: "row",
    alignItems: "center",
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
    position: "absolute",
    bottom: 30,
    width: "100%",
  },
  signupLink: { alignSelf: "center", paddingVertical: 14 },
  signupLinkText: { color: COLORS.primary, fontSize: 14, fontWeight: "600" },
  authLoading: { marginVertical: 16 },
  signedInText: { color: COLORS.textSecondary, textAlign: "center", marginBottom: 12 },
  successText: { color: "#188038", textAlign: "center", marginTop: 12 },
  errorText: { color: "#B3261E", textAlign: "center", marginTop: 12 },
  modalBackdrop: {
    flex: 1,
    justifyContent: "center",
    padding: 24,
    backgroundColor: "rgba(0,0,0,0.45)",
  },
  modalCard: { backgroundColor: COLORS.card, borderRadius: SIZES.cardRadius, padding: 24 },
  modalTitle: { color: COLORS.textPrimary, fontSize: 22, fontWeight: "bold", textAlign: "center", marginBottom: 20 },
  cancelButton: { alignItems: "center", padding: 14 },
  cancelText: { color: COLORS.textSecondary, fontWeight: "600" },
});
