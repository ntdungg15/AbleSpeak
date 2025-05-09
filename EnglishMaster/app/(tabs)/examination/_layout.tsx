import { Stack } from 'expo-router';
import React from 'react';

export default function ExaminationLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen
        name="index"
        options={{
          title: 'Examination',
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="[id]"
        options={{
          title: 'Bài kiểm tra',
          headerShown: false,
          presentation: 'card',
          animation: 'slide_from_right',
        }}
      />
      <Stack.Screen name="result" options={{ headerShown: false }} />
    </Stack>
  );
} 