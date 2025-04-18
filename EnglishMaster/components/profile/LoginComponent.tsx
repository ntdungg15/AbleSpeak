import { Link, router } from "expo-router";
import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  Pressable,
  KeyboardAvoidingView,
} from "react-native";
import { login } from "@/api/auth";
import { useDispatch, useSelector } from "react-redux";
import { loginSuccess } from "@/redux/reducer/User";
import { getUserInfo } from "@/api/user";
const LoginScreen = () => {
  const dispatch = useDispatch();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  // useEffect(() => {
  //   dispatch(logout());
  // }, []);
  return (
    <View className="flex-1 items-center">
      <View>
        <View style={{ marginTop: 120 }}>
          <Text style={{ fontSize: 45 }}>Welcome back</Text>
        </View>
        <View style={{ marginTop: 80, gap: 10, paddingLeft: 20 }}>
          <Text>Email</Text>
          <TextInput
            placeholder="Enter your email"
            value={email}
            onChangeText={(value) => setEmail(value)}
            style={{
              width: 250,
              height: 40,
              borderColor: "black",
              borderWidth: 1,
              borderRadius: 30,
              paddingLeft: 15,
            }}
          ></TextInput>
          <Text>Password</Text>
          <KeyboardAvoidingView behavior="padding">
            <TextInput
              placeholder="*******"
              value={password}
              onChangeText={(value) => setPassword(value)}
              secureTextEntry={true}
              style={{
                width: 250,
                height: 40,
                borderColor: "black",
                borderWidth: 1,
                borderRadius: 30,
                paddingLeft: 15,
              }}
            ></TextInput>
          </KeyboardAvoidingView>
          {error !== "" && (
            <View>
              <Text>{error}</Text>
            </View>
          )}
          <View style={{ flexDirection: "row", gap: 10 }}>
            <Pressable
              style={{
                gap: 10,
                backgroundColor: "orange",
                width: 100,
                height: 50,
                justifyContent: "center",
                alignItems: "center",
                borderRadius: 20,
              }}
              onPress={async () => {
                console.log("login");
                const response = await login(email, password);
                if (response.token) {
                  console.log("Login successful:", response.token);
                  const userInfo = await getUserInfo(email);
                  if (userInfo) {
                    console.log("User info:", userInfo);
                    dispatch(
                      loginSuccess({
                        token: response.token,
                        userInfo: userInfo,
                      })
                    );
                  }
                  // dispatch(
                  //   loginSuccess({
                  //     token: response.token,
                  //   })
                  // );
                  router.replace("/(tabs)");
                } else {
                  setError(repsonse.message);
                }
              }}
            >
              <Text>Login</Text>
            </Pressable>
            <View style={{ backgroundColor: "lightgray", borderRadius: 10 }}>
              <Link
                href={"/(tabs)/profile/register"}
                style={{
                  width: "100%",
                  padding: 13,
                }}
              >
                Don't have an account?
              </Link>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
};

export default LoginScreen;