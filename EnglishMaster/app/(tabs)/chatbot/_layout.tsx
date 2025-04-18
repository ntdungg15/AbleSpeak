import { Stack } from "expo-router";
import React from "react";

export default function TabLayout() {
  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{
          headerShown: false, // Tắt tiêu đề
        }}
      />
      <Stack.Screen
        name="explore"
        options={{
          headerShown: false, // Tắt tiêu đề
        }}
      />
    </Stack>
  );
}
