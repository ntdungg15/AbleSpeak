import { Stack } from 'expo-router';
import React from 'react';

export default function ExaminationLayout() {
  return (
    <Stack>
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
          headerShown: false, // Ẩn header vì chúng ta đã có UI riêng
          presentation: 'card',
          animation: 'slide_from_right',
        }}
      />
    </Stack>
  );
} 