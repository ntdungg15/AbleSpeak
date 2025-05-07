import { Link, router } from "expo-router";
import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Pressable,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  ActivityIndicator,
} from "react-native";
import { login } from "@/api/auth";
import { useDispatch } from "react-redux";
import { loginSuccess } from "@/redux/reducer/User";
import { getUserInfo } from "@/api/user";
import Svg, { Path } from "react-native-svg";

const LoginScreen = () => {
  const dispatch = useDispatch();

  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    if (!name || !password) {
      setError("Vui lòng nhập đầy đủ tên và mật khẩu");
      return;
    }

    setError("");
    setLoading(true);
    try {
      console.log("Sending login with:", name, password);
      const response = await login(name, password);

      if (typeof response === "string") {
        setError(response);
        setLoading(false);
        return;
      }

      if (response.token) {
        const userInfo = await getUserInfo(name, response.token);
        if (userInfo) {
          dispatch(
            loginSuccess({
              token: response.token,
              userInfo: userInfo,
              password: password,
            })
          );
          router.replace("/(tabs)");
        } else {
          setError("Không thể lấy thông tin người dùng");
        }
      } else {
        setError(response.message || "Đăng nhập thất bại");
      }
    } catch (err) {
      console.error("Login error:", err);
      setError("Đã xảy ra lỗi khi đăng nhập");
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Welcome Back</Text>
      </View>

      <View style={styles.waveContainer}>
        <Svg width="100%" height="320" viewBox="0 0 1440 320">
          <Path
            fill="#007AFF"
            fillOpacity="1"
            d="M0,256L48,213.3C96,190,192,85,288,74.7C384,20,500,120,576,176C672,224,768,256,864,266.7C960,277,1056,267,1152,234.7C1248,203,1344,149,1392,122.7L1440,96L1440,0L1392,0C1344,0,1248,0,1152,0C1056,0,960,0,864,0C768,0,672,0,576,0C480,0,384,0,288,0C192,0,96,0,48,0L0,0Z"
          />
        </Svg>
      </View>

      <ScrollView
        contentContainerStyle={styles.formContainer}
        keyboardShouldPersistTaps="handled"
      >
        <View style={styles.formInner}>
          <Text>Name</Text>
          <TextInput
            placeholder="Enter your name"
            value={name}
            onChangeText={setName}
            style={styles.input}
            autoCapitalize="none"
          />

          <Text>Password</Text>

          <TextInput
            placeholder="*******"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
            style={[styles.input, { marginBottom: 10 }]}
            autoCapitalize="none"
          />

          {error !== "" && <Text style={styles.errorText}>{error}</Text>}

          <View style={styles.buttonContainer}>
            <Pressable
              style={[
                styles.loginButton,
                (!name || !password || loading) && { opacity: 0.5 },
              ]}
              onPress={() => {
                handleLogin();
              }}
              disabled={!name || !password || loading}
            >
              {loading ? (
                <ActivityIndicator />
              ) : (
                <Text style={styles.loginButtonText}>Login</Text>
              )}
            </Pressable>

            <Link href={"/(tabs)/profile/register"}>
              <Text style={styles.registerLink}>Don't have an account?</Text>
            </Link>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    backgroundColor: "#007AFF",
    height: 250,
    justifyContent: "center",
    alignItems: "center",
  },
  headerText: {
    fontSize: 45,
    color: "#fff",
    fontWeight: "bold",
  },
  waveContainer: {
    position: "absolute",
    top: 120,
    width: "100%",
  },
  formContainer: {
    paddingTop: 180,
    alignItems: "center",
  },
  formInner: {
    gap: 10,
    width: "80%",
  },
  input: {
    width: "100%",
    height: 45,
    borderColor: "black",
    borderWidth: 1,
    borderRadius: 30,
    paddingLeft: 15,
  },
  errorText: {
    color: "red",
    textAlign: "center",
    marginTop: 5,
  },
  buttonContainer: {
    alignItems: "center",
    marginTop: 20,
    gap: 10,
  },
  loginButton: {
    backgroundColor: "orange",
    width: 150,
    height: 55,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 30,
  },
  loginButtonText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 18,
    letterSpacing: 1,
  },
  registerLink: {
    color: "#007AFF",
    fontSize: 16,
    textDecorationLine: "underline",
    textAlign: "center",
  },
});
