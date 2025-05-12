import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  Pressable,
  KeyboardAvoidingView,
  ScrollView,
  TouchableWithoutFeedback,
  Keyboard,
  Platform,
  Modal,
  Button,
  Dimensions,
  StyleSheet,
} from "react-native";
import { Link, router } from "expo-router";
import { register } from "@/api/auth";
import { useSelector } from "react-redux";

const { height: SCREEN_HEIGHT } = Dimensions.get("window");

const Register = () => {
  const user = useSelector((state) => state.user);
  if (user.isLoggedIn) {
    router.push("/(tabs)/profile");
  }
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [age, setAge] = useState("");
  const [readyToRegister, setIsReady] = useState(false);
  const [invalidMessage, setInvalidMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [showPrivacyModal, setShowPrivacyModal] = useState(false);
  const [agreed, setAgreed] = useState(false);

  const isValidEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  const isValidPhone = (phone) => /^(0|\+84)[0-9]{9}$/.test(phone);

  useEffect(() => {
    const parsedAge = parseInt(age);
    if (!email || !password || !repeatPassword || !fullName || !phone || !age) {
      setIsReady(false);
      setInvalidMessage("Haven't filled in all the fields yet!");
    } else if (!isValidEmail(email)) {
      setIsReady(false);
      setInvalidMessage("Invalid email format.");
    } else if (!isValidPhone(phone)) {
      setIsReady(false);
      setInvalidMessage("Invalid phone number format.");
    } else if (password !== repeatPassword) {
      setIsReady(false);
      setInvalidMessage("Password and repeat password do not match!");
    } else if (isNaN(parsedAge) || parsedAge < 13) {
      setIsReady(false);
      setInvalidMessage("You must be at least 13 years old to register.");
    } else if (!agreed) {
      setIsReady(false);
      setInvalidMessage("You must agree to the privacy policy.");
    } else {
      setInvalidMessage("");
      setIsReady(true);
    }
  }, [email, password, repeatPassword, fullName, phone, age, agreed]);

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.container}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.innerContainer}>
          <ScrollView
            contentContainerStyle={styles.scrollContainer}
            keyboardShouldPersistTaps="handled"
          >
            <View style={styles.contentContainer}>
              <Text style={styles.headerText}>Welcome to EnglishMaster!</Text>

              {[
                "Full name",
                "Phone",
                "Email",
                "Password",
                "Repeat password",
                "Age",
              ].map((label, index) => (
                <View key={index} style={styles.inputGroup}>
                  <Text style={styles.label}>{label}</Text>
                  <TextInput
                    placeholder={`Enter your ${label.toLowerCase()}`}
                    style={styles.input}
                    value={
                      label === "Full name"
                        ? fullName
                        : label === "Phone"
                        ? phone
                        : label === "Email"
                        ? email
                        : label === "Password"
                        ? password
                        : label === "Repeat password"
                        ? repeatPassword
                        : age
                    }
                    onChangeText={
                      label === "Full name"
                        ? setFullName
                        : label === "Phone"
                        ? setPhone
                        : label === "Email"
                        ? setEmail
                        : label === "Password"
                        ? setPassword
                        : label === "Repeat password"
                        ? setRepeatPassword
                        : setAge
                    }
                    keyboardType={
                      label === "Phone"
                        ? "phone-pad"
                        : label === "Email"
                        ? "email-address"
                        : label === "Age"
                        ? "number-pad"
                        : "default"
                    }
                    secureTextEntry={
                      label === "Password" || label === "Repeat password"
                    }
                  />
                </View>
              ))}

              <Pressable
                onPress={() => setShowPrivacyModal(true)}
                style={styles.privacyLink}
              >
                <Text style={styles.privacyText}>
                  View and agree to privacy policy
                </Text>
              </Pressable>

              {agreed && (
                <Text style={styles.agreedText}>
                  ✓ You have agreed to the policy
                </Text>
              )}

              {[invalidMessage, errorMessage, successMessage].map((msg, idx) =>
                msg ? (
                  <Text
                    key={idx}
                    style={[
                      styles.messageText,
                      { color: idx === 2 ? "#059669" : "#dc2626" },
                    ]}
                  >
                    {msg}
                  </Text>
                ) : null
              )}

              <Pressable
                disabled={!readyToRegister}
                style={[
                  styles.signUpButton,
                  {
                    backgroundColor: readyToRegister ? "#2563eb" : "#93c5fd",
                    shadowColor: "#1e3a8a",
                  },
                ]}
                onPress={async () => {
                  const userCreator = await register(
                    fullName,
                    email,
                    password,
                    phone
                  );
                  if (userCreator.error) {
                    setErrorMessage(userCreator.error);
                  } else {
                    setSuccessMessage(
                      "Đăng ký thành công! Chuyển hướng sau 2 giây..."
                    );
                    setTimeout(() => {
                      router.back();
                    }, 2000);
                  }
                }}
              >
                <Text style={styles.signUpButtonText}>Sign up</Text>
              </Pressable>

              <View style={styles.loginLinkContainer}>
                <Link href="/(tabs)/profile/login">
                  <Text style={styles.loginLinkText}>
                    Already have an account? Log in
                  </Text>
                </Link>
              </View>
            </View>

            <Modal visible={showPrivacyModal} transparent animationType="slide">
              <View style={styles.modalContainer}>
                <View style={styles.modalContent}>
                  <Text style={styles.modalTitle}>Privacy Policy</Text>
                  <ScrollView style={styles.modalScroll}>
                    <Text>
                      Please read and accept our privacy policy to continue
                      using the app... {"\n\n"}[Mô tả chính sách bảo mật ở
                      đây...]
                    </Text>
                  </ScrollView>
                  <View style={styles.modalButtons}>
                    <Button
                      title="Agree"
                      onPress={() => {
                        setAgreed(true);
                        setShowPrivacyModal(false);
                      }}
                      color="#2563eb"
                    />
                    <Button
                      title="Cancel"
                      onPress={() => {
                        setAgreed(false);
                        setShowPrivacyModal(false);
                      }}
                      color="#3b82f6"
                    />
                  </View>
                </View>
              </View>
            </Modal>
          </ScrollView>
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#eff6ff",
  },
  innerContainer: {
    flex: 1,
  },
  scrollContainer: {
    paddingVertical: 40,
    paddingHorizontal: 20,
    flexGrow: 1,
    justifyContent: "center",
    paddingBottom: 40,
  },
  contentContainer: {
    alignItems: "center",
    width: "100%",
  },
  headerText: {
    fontSize: 28,
    fontWeight: "700",
    textAlign: "center",
    color: "#1d4ed8",
    marginBottom: 20,
  },
  inputGroup: {
    marginBottom: 12,
    width: "100%",
  },
  label: {
    fontSize: 14,
    fontWeight: "500",
    color: "#1e40af",
    marginBottom: 4,
  },
  input: {
    height: 44,
    borderColor: "#93c5fd",
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 12,
    backgroundColor: "#f0f9ff",
    fontSize: 15,
  },
  privacyLink: {
    marginTop: 10,
  },
  privacyText: {
    color: "#2563eb",
    textDecorationLine: "underline",
    fontSize: 14,
  },
  agreedText: {
    color: "#059669",
    marginTop: 5,
    fontSize: 14,
  },
  messageText: {
    marginTop: 8,
    fontSize: 14,
  },
  signUpButton: {
    height: 48,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
    marginTop: 20,
    width: "100%",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
  },
  signUpButtonText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 16,
  },
  loginLinkContainer: {
    marginTop: 20,
    alignItems: "center",
  },
  loginLinkText: {
    color: "#3b82f6",
    fontSize: 15,
  },
  modalContainer: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.6)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContent: {
    backgroundColor: "white",
    padding: 20,
    borderRadius: 12,
    width: "85%",
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 10,
    color: "#1e40af",
  },
  modalScroll: {
    maxHeight: 300,
  },
  modalButtons: {
    marginTop: 20,
    flexDirection: "row",
    justifyContent: "space-between",
  },
});

export default Register;
