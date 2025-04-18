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
  Dimensions,
} from "react-native";
import { register } from "@/api/auth"; // Nhớ cập nhật đường dẫn đến hàm register

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [readyToRegister, setIsReady] = useState(false);
  const [invalidMessage, setInvalidMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  useEffect(() => {
    if (
      email === "" ||
      password === "" ||
      repeatPassword === "" ||
      fullName === "" ||
      phone === ""
    ) {
      setIsReady(false);
      setInvalidMessage("Haven't filled in all the fields yet!");
    } else if (password !== repeatPassword) {
      setIsReady(false);
      setInvalidMessage("Password and repeat password do not match!");
    } else {
      setInvalidMessage("");
      setIsReady(true);
    }
  }, [
    email,
    password,
    fullName,
    repeatPassword,
    phone,
    errorMessage,
    successMessage,
  ]);

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={{ flex: 1 }}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
          <View className="flex-1 items-center" style={{ padding: 20 }}>
            <View style={{ marginTop: 100 }}>
              <Text style={{ fontSize: 30, textAlign: "center" }}>
                Welcome to Closm!
              </Text>
            </View>

            {/* Form nhập liệu */}
            <View style={{ marginTop: 40, width: "100%" }}>
              <Text>Full name</Text>
              <TextInput
                placeholder="Enter your full name"
                autoCorrect={false}
                autoComplete="off"
                spellCheck={false}
                keyboardType="default"
                style={styles.input}
                value={fullName}
                onChangeText={setFullName}
              />

              <Text>Phone</Text>
              <TextInput
                placeholder="Enter your phone number"
                keyboardType="phone-pad"
                style={styles.input}
                value={phone}
                onChangeText={setPhone}
              />

              <Text>Email</Text>
              <TextInput
                placeholder="Enter your email"
                keyboardType="email-address"
                style={styles.input}
                value={email}
                onChangeText={setEmail}
              />

              <Text>Password</Text>
              <TextInput
                placeholder="*******"
                secureTextEntry
                style={styles.input}
                value={password}
                onChangeText={setPassword}
              />

              <Text>Repeat password</Text>
              <TextInput
                placeholder="*******"
                secureTextEntry
                style={styles.input}
                value={repeatPassword}
                onChangeText={setRepeatPassword}
              />

              {invalidMessage !== "" && (
                <Text style={{ color: "red", marginVertical: 5 }}>
                  {invalidMessage}
                </Text>
              )}
              {errorMessage !== "" && (
                <View>
                  <Text style={{ color: "red" }}>{errorMessage}</Text>
                </View>
              )}
              {successMessage !== "" && (
                <View>
                  <Text style={{ color: "green" }}>{successMessage}</Text>
                </View>
              )}

              {/* Nút đăng ký */}
              <Pressable
                disabled={!readyToRegister}
                style={{
                  backgroundColor: readyToRegister ? "orange" : "gray",
                  width: "100%",
                  height: 50,
                  justifyContent: "center",
                  alignItems: "center",
                  borderRadius: 20,
                  marginTop: 10,
                }}
                onPress={async () => {
                  console.log(
                    "🛠 Bắt đầu đăng ký với:",
                    fullName,
                    email,
                    phone,
                    password
                  );
                  const userCreator = await register(
                    fullName,
                    email,
                    password,
                    phone
                  ); // Nhớ cập nhật hàm register

                  if (userCreator.error) {
                    console.log("❌ Lỗi đăng ký:", userCreator.error);
                    setErrorMessage(userCreator.error);
                  } else {
                    console.log("✅ Đăng ký thành công:", userCreator);
                    setSuccessMessage(
                      "Đăng ký thành công! Chuyển hướng sau 2 giây..."
                    );
                    setTimeout(() => {
                      router.back();
                    }, 2000);
                  }
                }}
              >
                <Text style={{ color: "white", fontWeight: "bold" }}>
                  Sign up
                </Text>
              </Pressable>

              {/* Chuyển sang đăng nhập */}
              <View style={{ marginTop: 10, alignItems: "center" }}>
                <Link href={"/(tabs)/profile/login"}>Have an account?</Link>
              </View>
            </View>
          </View>
        </ScrollView>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

const { width } = Dimensions.get("window");

const styles = {
  input: {
    width: width - 40,
    height: 40,
    borderColor: "black",
    borderWidth: 1,
    borderRadius: 10,
    paddingLeft: 10,
    marginVertical: 5,
  },
};

export default Register;
