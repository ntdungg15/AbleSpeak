import { Stack, Tabs } from "expo-router";
import React from "react";
import { Platform } from "react-native";

export default function TabLayout() {
  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{
          headerShown: false, // Tắt tiêu đề
          //   tabBarIcon: ({ color }) => <IconSymbol size={28} name="house.fill" color={color} />,
        }}
      />
      <Stack.Screen
        name="login"
        options={{
          headerShown: false, // Tắt tiêu đề
          //   tabBarIcon: ({ color }) => <IconSymbol size={28} name="paperplane.fill" color={color} />,
        }}
      />
      <Stack.Screen
        name="register"
        options={{
          headerShown: false, // Tắt tiêu đề
          //   tabBarIcon: ({ color }) => <IconSymbol size={28} name="paperplane.fill" color={color} />,
        }}
      />
      <Stack.Screen
        name="setting"
        options={{
          headerShown: false, // Tắt tiêu đề
          //   tabBarIcon: ({ color }) => <IconSymbol size={28} name="paperplane.fill" color={color} />,
        }}
      />
      <Stack.Screen
        name="updateInfo"
        options={{
          headerTitle: "Update Profile",
        }}
      />
    </Stack>
  );
}
