import { Stack, Tabs } from "expo-router";
import React from "react";
import { Platform } from "react-native";

import { useColorScheme } from "../../../hooks/useColorScheme";

export default function TabLayout() {
  const colorScheme = useColorScheme();

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
        name="explore"
        options={{
          headerShown: false, // Tắt tiêu đề
          //   tabBarIcon: ({ color }) => <IconSymbol size={28} name="paperplane.fill" color={color} />,
        }}
      />
    </Stack>
  );
}
