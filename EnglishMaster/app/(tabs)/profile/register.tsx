import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  Pressable,
  ScrollView,
  StyleSheet,
  Modal,
  TouchableOpacity,
} from "react-native";
import { useRouter } from "expo-router";
import { useSelector } from "react-redux";

export default function RegisterScreen() {
  const router = useRouter();
  const user = useSelector((state) => state.user);
  useEffect(() => {
    if (user.isLoggedIn) {
      router.push("/(tabs)/profile");
    }
  }, [user.isLoggedIn]);

  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");
  const [age, setAge] = useState("");
  const [agreed, setAgreed] = useState(false);

  const [emailError, setEmailError] = useState("");
  const [phoneError, setPhoneError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [repeatPasswordError, setRepeatPasswordError] = useState("");
  const [ageError, setAgeError] = useState("");
  const [agreedError, setAgreedError] = useState("");

  const [successMessage, setSuccessMessage] = useState("");
  const [modalVisible, setModalVisible] = useState(false);

  const readyToRegister =
    fullName && phone && email && password && repeatPassword && age && agreed;

  const validateInputs = () => {
    let isValid = true;

    // Reset errors
    setEmailError("");
    setPhoneError("");
    setPasswordError("");
    setRepeatPasswordError("");
    setAgeError("");
    setAgreedError("");

    // Kiểm tra email
    if (!email.includes("@")) {
      setEmailError("Email không đúng định dạng.");
      isValid = false;
    }

    // Kiểm tra số điện thoại
    const phoneRegex = /^[0-9]{10,11}$/; // Giới hạn 10-11 chữ số
    if (!phoneRegex.test(phone)) {
      setPhoneError("Số điện thoại không đúng định dạng.");
      isValid = false;
    }

    // Kiểm tra mật khẩu và lặp lại mật khẩu
    if (password !== repeatPassword) {
      setPasswordError("Mật khẩu và lặp lại mật khẩu không khớp.");
      setRepeatPasswordError("Mật khẩu và lặp lại mật khẩu không khớp.");
      isValid = false;
    }

    // Kiểm tra tuổi
    const ageNum = parseInt(age);
    if (isNaN(ageNum) || ageNum < 12) {
      setAgeError("Tuổi phải là số và ít nhất 12 tuổi.");
      isValid = false;
    }

    // Kiểm tra đã đồng ý với chính sách
    if (!agreed) {
      setAgreedError("Bạn phải đồng ý với điều khoản và chính sách.");
      isValid = false;
    }

    return isValid;
  };

  const register = async (fullName, email, password, phone) => {
    // Fake API
    return { success: true };
  };

  return (
    <ScrollView
      contentContainerStyle={styles.scrollContainer}
      keyboardShouldPersistTaps="handled"
    >
      <View style={styles.contentContainer}>
        <Text style={styles.title}>Welcome to EnglishMaster!</Text>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Full name</Text>
          <TextInput
            placeholder="Enter your full name"
            style={styles.input}
            value={fullName}
            onChangeText={setFullName}
          />
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Phone</Text>
          <TextInput
            placeholder="Enter your phone number"
            style={styles.input}
            value={phone}
            onChangeText={setPhone}
            keyboardType="phone-pad"
            onBlur={() => {
              if (!phone) setPhoneError("Số điện thoại không được để trống.");
              else validateInputs();
            }}
          />
          {phoneError ? (
            <Text style={styles.errorText}>{phoneError}</Text>
          ) : null}
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Email</Text>
          <TextInput
            placeholder="Enter your email"
            style={styles.input}
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            onBlur={() => {
              if (!email) setEmailError("Email không được để trống.");
              else validateInputs();
            }}
          />
          {emailError ? (
            <Text style={styles.errorText}>{emailError}</Text>
          ) : null}
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Password</Text>
          <TextInput
            placeholder="*******"
            style={styles.input}
            value={password}
            onChangeText={setPassword}
            secureTextEntry
            onBlur={() => {
              if (!password) setPasswordError("Mật khẩu không được để trống.");
              else validateInputs();
            }}
          />
          {passwordError ? (
            <Text style={styles.errorText}>{passwordError}</Text>
          ) : null}
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Repeat password</Text>
          <TextInput
            placeholder="*******"
            style={styles.input}
            value={repeatPassword}
            onChangeText={setRepeatPassword}
            secureTextEntry
            onBlur={() => {
              if (!repeatPassword)
                setRepeatPasswordError("Lặp lại mật khẩu không được để trống.");
              else validateInputs();
            }}
          />
          {repeatPasswordError ? (
            <Text style={styles.errorText}>{repeatPasswordError}</Text>
          ) : null}
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Age</Text>
          <TextInput
            placeholder="Enter your age"
            style={styles.input}
            value={age}
            onChangeText={setAge}
            keyboardType="number-pad"
            onBlur={() => {
              if (!age) setAgeError("Tuổi không được để trống.");
              else validateInputs();
            }}
          />
          {ageError ? <Text style={styles.errorText}>{ageError}</Text> : null}
        </View>

        <Pressable
          onPress={() => setModalVisible(true)}
          style={styles.privacyLink}
        >
          <Text style={styles.privacyText}>
            {agreed ? "✅ " : "⬜ "} View and agree to privacy policy
          </Text>
        </Pressable>

        {successMessage ? (
          <Text style={[styles.messageText, { color: "#16a34a" }]}>
            {successMessage}
          </Text>
        ) : null}

        <Pressable
          disabled={!readyToRegister}
          style={[
            styles.signUpButton,
            { backgroundColor: readyToRegister ? "#f97316" : "#94a3b8" },
          ]}
          onPress={async () => {
            const isValid = validateInputs();
            if (isValid) {
              const userCreator = await register(
                fullName,
                email,
                password,
                phone
              );
              if (userCreator.success) {
                setSuccessMessage(
                  "Đăng ký thành công! Chuyển hướng sau 2 giây..."
                );
                setTimeout(() => {
                  router.back();
                }, 2000);
              }
            }
          }}
        >
          <Text style={styles.signUpButtonText}>Sign up</Text>
        </Pressable>

        <View style={styles.loginLinkContainer}>
          <Text style={styles.loginLinkText}>Already have an account?</Text>
          <Pressable
            style={styles.loginButton}
            onPress={() => router.push("/(tabs)/profile/login")}
          >
            <Text style={styles.loginButtonText}>Log in</Text>
          </Pressable>
        </View>
      </View>

      {/* Modal for Privacy Policy */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalBackground}>
          <View style={styles.modalContainer}>
            <Text style={styles.modalTitle}>Privacy Policy</Text>
            <Text style={styles.modalText}>
              Đây là chính sách bảo mật của chúng tôi. Bạn cần đọc và đồng ý
              trước khi tiếp tục sử dụng dịch vụ.
            </Text>

            <Pressable
              style={styles.modalButton}
              onPress={() => {
                setAgreed(true);
                setModalVisible(false);
              }}
            >
              <Text style={styles.modalButtonText}>I Agree</Text>
            </Pressable>

            <Pressable
              style={styles.modalButton}
              onPress={() => setModalVisible(false)}
            >
              <Text style={styles.modalButtonText}>Close</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 20,
    backgroundColor: "#e0f7fa",
  },
  contentContainer: {
    width: "90%",
    alignItems: "center",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },
  inputGroup: {
    width: "80%",
    alignItems: "flex-start",
    marginBottom: 10,
  },
  label: {
    fontWeight: "bold",
    marginBottom: 5,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 10,
    padding: 10,
    width: "100%",
    backgroundColor: "#fff",
  },
  errorText: {
    color: "#dc2626",
    fontSize: 12,
    marginTop: 5,
  },
  privacyLink: {
    marginVertical: 10,
  },
  privacyText: {
    color: "#3b82f6",
    textDecorationLine: "underline",
  },
  messageText: {
    marginVertical: 5,
    fontSize: 14,
    textAlign: "center",
  },
  signUpButton: {
    padding: 12,
    borderRadius: 10,
    marginTop: 20,
    width: "25%",
    alignItems: "center",
  },
  signUpButtonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
  loginLinkContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 20,
  },
  loginLinkText: {
    marginRight: 5,
  },
  loginButtonText: {
    color: "#3b82f6",
    textDecorationLine: "underline",
  },
  modalBackground: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContainer: {
    width: "80%",
    padding: 20,
    backgroundColor: "#fff",
    borderRadius: 10,
    alignItems: "center",
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
  },
  modalText: {
    fontSize: 16,
    marginBottom: 20,
  },
  modalButton: {
    padding: 10,
    marginVertical: 5,
    backgroundColor: "#f97316",
    borderRadius: 10,
    width: "80%",
    alignItems: "center",
  },
  modalButtonText: {
    color: "#fff",
    fontWeight: "bold",
  },
});
