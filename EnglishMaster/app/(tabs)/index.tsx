import React from "react";
import { Text } from "react-native";
import { StyleSheet, SafeAreaView, ScrollView, View } from "react-native";
import NewLesson from "@/app/(tabs)/NewLesson/NewLesson";
import Dashboard from "@/app/(tabs)/home/Dashboard";
const index = () => {
  return (
    <SafeAreaView>
      <ScrollView >
          <Dashboard />
      </ScrollView>
    </SafeAreaView>
  );
};

export default index;
