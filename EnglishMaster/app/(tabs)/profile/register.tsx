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

const { height: SCREEN_HEIGHT } = Dimensions.get("window");

const Register = () => {
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

  const isValidEmail = (email: string) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  const isValidPhone = (phone: string) => /^(0|\+84)[0-9]{9}$/.test(phone);

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
          <View style={styles.headerContainer}>
            <Text style={styles.headerText}>Welcome to EnglishMaster!</Text>
          </View>
          <ScrollView
            contentContainerStyle={styles.scrollContainer}
            keyboardShouldPersistTaps="handled"
          >
            <View style={styles.contentContainer}>
              <View style={styles.formContainer}>
                {[
                  {
                    label: "Full name",
                    value: fullName,
                    setter: setFullName,
                    placeholder: "Enter your full name",
                  },
                  {
                    label: "Phone",
                    value: phone,
                    setter: setPhone,
                    placeholder: "Enter your phone number",
                    keyboardType: "phone-pad",
                  },
                  {
                    label: "Email",
                    value: email,
                    setter: setEmail,
                    placeholder: "Enter your email",
                    keyboardType: "email-address",
                  },
                  {
                    label: "Password",
                    value: password,
                    setter: setPassword,
                    placeholder: "*******",
                    secureTextEntry: true,
                  },
                  {
                    label: "Repeat password",
                    value: repeatPassword,
                    setter: setRepeatPassword,
                    placeholder: "*******",
                    secureTextEntry: true,
                  },
                  {
                    label: "Age",
                    value: age,
                    setter: setAge,
                    placeholder: "Enter your age",
                    keyboardType: "number-pad",
                  },
                ].map((field, index) => (
                  <View key={index}>
                    <Text style={styles.label}>{field.label}</Text>
                    <TextInput
                      placeholder={field.placeholder}
                      style={styles.input}
                      value={field.value}
                      onChangeText={field.setter}
                      keyboardType={field.keyboardType}
                      secureTextEntry={field.secureTextEntry}
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

                {[invalidMessage, errorMessage, successMessage].map(
                  (msg, idx) =>
                    msg ? (
                      <Text
                        key={idx}
                        style={[
                          styles.messageText,
                          { color: idx === 2 ? "green" : "red" },
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
                      backgroundColor: readyToRegister ? "#f59e0b" : "#d1d5db",
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
            </View>

            <Modal visible={showPrivacyModal} transparent animationType="slide">
              <View style={styles.modalContainer}>
                <View style={styles.modalContent}>
                  <Text style={styles.modalTitle}>Privacy Policy</Text>
                  <ScrollView style={styles.modalScroll}>
                    <Text>
                      Please read and accept our privacy policy to continue
                      using the app...
                      {"\n\n"}[Mô tả chính sách bảo mật ở đây...]
                    </Text>
                  </ScrollView>
                  <View style={styles.modalButtons}>
                    <Button
                      title="Agree"
                      onPress={() => {
                        setAgreed(true);
                        setShowPrivacyModal(false);
                      }}
                    />
                    <Button
                      title="Cancel"
                      onPress={() => {
                        setAgreed(false);
                        setShowPrivacyModal(false);
                      }}
                      color="red"
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
    backgroundColor: "#007AFF",
  },
  innerContainer: {
    flex: 1,
  },
  headerContainer: {
    marginBottom: 20,
  },
  scrollContainer: {
    paddingTop: 50,
    paddingBottom: 100,
    flexGrow: 1,
    justifyContent: "center",
  },
  contentContainer: {
    flex: 1,
    alignItems: "center",
    paddingHorizontal: 20,
  },
  headerText: {
    marginTop: 50,
    fontSize: 30,
    fontWeight: "bold",
    textAlign: "center",
    color: "#1f2937",
  },
  formContainer: {
    width: "100%",
    marginTop: 20,
    backgroundColor: "white",
    padding: 30,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  label: {
    fontSize: 16,
    fontWeight: "500",
    marginTop: 10,
    color: "#374151",
  },
  input: {
    width: "100%",
    height: 48,
    borderColor: "#d1d5db",
    borderWidth: 1,
    borderRadius: 12,
    paddingHorizontal: 12,
    marginVertical: 8,
    backgroundColor: "#f9fafb",
    fontSize: 16,
  },
  privacyLink: {
    marginTop: 10,
  },
  privacyText: {
    color: "#3b82f6",
    textDecorationLine: "underline",
  },
  agreedText: {
    color: "green",
    marginTop: 5,
  },
  messageText: {
    marginTop: 5,
  },
  signUpButton: {
    width: "100%",
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 12,
    marginTop: 16,
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
    fontSize: 16,
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
    borderRadius: 10,
    width: "80%",
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
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
