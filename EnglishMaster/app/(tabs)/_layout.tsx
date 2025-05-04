import React from 'react';
import { Tabs } from 'expo-router';
import { Image } from 'react-native';
import HomeIcon from '@/assets/images/icons/home.png';
import ChatbotIcon from '@/assets/images/icons/bot.png';
import ProfileIcon from '@/assets/images/icons/profile.png';
import ExamIcon from '@/assets/images/icons/examination.png';

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: '#007AFF',
        tabBarInactiveTintColor: '#8E8E93',
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ color, size }) => (
            <Image source={HomeIcon} style={{ width: size, height: size, }} />
          ),
        }}
      />

      <Tabs.Screen
        name="chatbot"
        options={{
          title: 'Chatbot',
          tabBarIcon: ({ color, size }) => (
            <Image source={ChatbotIcon} style={{ width: size, height: size, }} />
          ),
        }}
      />
      <Tabs.Screen
        name="examination"
        options={{
          title: 'Exams',
          tabBarIcon: ({ color, size }) => (
            <Image source={ExamIcon} style={{ width: size, height: size, }} />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: 'Profile',
          tabBarIcon: ({ color, size }) => (
            <Image source={ProfileIcon} style={{ width: size, height: size, }} />
          ),
        }}
      />
      <Tabs.Screen
        name='NewLesson'
        options={{
          href: null,
          headerShown: false,
        }} />
      <Tabs.Screen
        name='home'
        options={{
          href: null,
          headerShown: false,
        }} />
    </Tabs>
  );
}
