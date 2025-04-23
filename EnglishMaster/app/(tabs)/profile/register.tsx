import { Link, router } from "expo-router";
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
} from "react-native";
import { register } from "@/api/auth";

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
      style={{ flex: 1, backgroundColor: "white" }}
      keyboardVerticalOffset={Platform.OS === "ios" ? 0 : 20}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <ScrollView
          contentContainerStyle={{
            flexGrow: 1,
            justifyContent: "center",
            paddingBottom: 100,
          }}
          keyboardShouldPersistTaps="handled"
        >
          <View style={{ flex: 1, alignItems: "center", padding: 20 }}>
            <View style={{ marginTop: 80 }}>
              <Text
                style={{
                  fontSize: 30,
                  fontWeight: "bold",
                  textAlign: "center",
                  color: "#1f2937",
                }}
              >
                Welcome to EnglishMaster!
              </Text>
            </View>
            <View
              style={{
                width: "95%",
                marginTop: 20,
                backgroundColor: "lightgray",
                padding: 30,
                borderRadius: 10,
              }}
            >
              <View style={{ marginTop: 40, width: "100%" }}>
                <Text style={styles.label}>Full name</Text>
                <TextInput
                  placeholder="Enter your full name"
                  style={styles.input}
                  value={fullName}
                  onChangeText={setFullName}
                />

                <Text style={styles.label}>Phone</Text>
                <TextInput
                  placeholder="Enter your phone number"
                  keyboardType="phone-pad"
                  style={styles.input}
                  value={phone}
                  onChangeText={setPhone}
                />

                <Text style={styles.label}>Email</Text>
                <TextInput
                  placeholder="Enter your email"
                  keyboardType="email-address"
                  style={styles.input}
                  value={email}
                  onChangeText={setEmail}
                />

                <Text style={styles.label}>Password</Text>
                <TextInput
                  placeholder="*******"
                  secureTextEntry
                  style={styles.input}
                  value={password}
                  onChangeText={setPassword}
                />

                <Text style={styles.label}>Repeat password</Text>
                <TextInput
                  placeholder="*******"
                  secureTextEntry
                  style={styles.input}
                  value={repeatPassword}
                  onChangeText={setRepeatPassword}
                />

                <Text style={styles.label}>Age</Text>
                <TextInput
                  placeholder="Enter your age"
                  keyboardType="number-pad"
                  style={styles.input}
                  value={age}
                  onChangeText={setAge}
                />

                <Pressable
                  onPress={() => setShowPrivacyModal(true)}
                  style={{ marginTop: 10 }}
                >
                  <Text
                    style={{
                      color: "#3b82f6",
                      textDecorationLine: "underline",
                    }}
                  >
                    View and agree to privacy policy
                  </Text>
                </Pressable>

                {agreed && (
                  <Text style={{ color: "green", marginTop: 5 }}>
                    ✓ You have agreed to the policy
                  </Text>
                )}

                {invalidMessage !== "" && (
                  <Text style={{ color: "red", marginTop: 5 }}>
                    {invalidMessage}
                  </Text>
                )}
                {errorMessage !== "" && (
                  <Text style={{ color: "red", marginTop: 5 }}>
                    {errorMessage}
                  </Text>
                )}
                {successMessage !== "" && (
                  <Text style={{ color: "green", marginTop: 5 }}>
                    {successMessage}
                  </Text>
                )}

                <Pressable
                  disabled={!readyToRegister}
                  style={{
                    backgroundColor: readyToRegister ? "#f59e0b" : "#d1d5db",
                    width: "100%",
                    height: 50,
                    justifyContent: "center",
                    alignItems: "center",
                    borderRadius: 12,
                    marginTop: 16,
                    shadowColor: "#000",
                    shadowOffset: { width: 0, height: 2 },
                    shadowOpacity: 0.1,
                    shadowRadius: 4,
                    elevation: 2,
                  }}
                  onPress={async () => {
                    const parsedAge = parseInt(age);
                    if (isNaN(parsedAge) || parsedAge < 13) {
                      setErrorMessage("You must be at least 13 years old.");
                      return;
                    }

                    if (!isValidEmail(email)) {
                      setErrorMessage("Email không hợp lệ.");
                      return;
                    }

                    if (!isValidPhone(phone)) {
                      setErrorMessage("Số điện thoại không hợp lệ.");
                      return;
                    }

                    if (password !== repeatPassword) {
                      setErrorMessage("Mật khẩu và lặp lại không khớp.");
                      return;
                    }

                    if (!agreed) {
                      setErrorMessage("Bạn cần đồng ý với chính sách bảo mật.");
                      setShowPrivacyModal(true);
                      return;
                    }

                    const userCreator = await register(
                      fullName,
                      email,
                      password,
                      phone
                    );

                    if (userCreator.error) {
                      setErrorMessage(userCreator.error);
                    } else {
                      console.log(userCreator);
                      setSuccessMessage(
                        "Đăng ký thành công! Chuyển hướng sau 2 giây..."
                      );
                      setTimeout(() => {
                        router.back();
                      }, 2000);
                    }
                  }}
                >
                  <Text
                    style={{ color: "white", fontWeight: "bold", fontSize: 16 }}
                  >
                    Sign up
                  </Text>
                </Pressable>

                <View style={{ marginTop: 20, alignItems: "center" }}>
                  <Link href={"/(tabs)/profile/login"}>
                    <Text style={{ color: "#3b82f6", fontSize: 16 }}>
                      Already have an account? Log in
                    </Text>
                  </Link>
                </View>
              </View>
            </View>
          </View>

          {/* Privacy Modal */}
          <Modal visible={showPrivacyModal} transparent animationType="slide">
            <View
              style={{
                flex: 1,
                backgroundColor: "rgba(0,0,0,0.6)",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <View
                style={{
                  backgroundColor: "white",
                  padding: 20,
                  borderRadius: 10,
                  width: "90%",
                }}
              >
                <Text
                  style={{ fontWeight: "bold", fontSize: 18, marginBottom: 10 }}
                >
                  Privacy Policy
                </Text>
                <ScrollView style={{ maxHeight: 200 }}>
                  <Text>
                    Please read and accept our privacy policy to continue using
                    the app...
                    {"\n\n"}[Mô tả chính sách bảo mật ở đây...]
                  </Text>
                </ScrollView>
                <View
                  style={{
                    marginTop: 15,
                    flexDirection: "row",
                    justifyContent: "space-between",
                  }}
                >
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
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

const styles = {
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
  label: {
    fontSize: 16,
    fontWeight: "500",
    marginTop: 10,
    color: "#374151",
  },
};

export default Register;
