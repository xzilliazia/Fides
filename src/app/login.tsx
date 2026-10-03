import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";
import {
  Image,
  ImageBackground,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import CustomInput from "../components/CustomInput";
import PrimaryButton from "../components/PrimaryButton";
import { COLORS, SIZES } from "../constants/theme";

const quickLinks = [
  { id: 1, title: "Reservation guide" },
  { id: 2, title: "contact Front Office (FO)" },
];

export default function LoginScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [remindMe, setRemindMe] = useState(false);

  const handleLogin = () => {
    console.log("Login credentials:", email);
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
          <TouchableOpacity>
            <Text style={styles.forgotText}>Forgot Password?</Text>
          </TouchableOpacity>
        </View>

        <PrimaryButton title="Sign in" onPress={handleLogin} />

        <View style={{ marginTop: 20 }}>
          {quickLinks.map((link) => (
            <TouchableOpacity key={link.id}>
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
});
