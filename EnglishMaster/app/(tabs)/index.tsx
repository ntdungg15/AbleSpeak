import React from "react";
import { Text } from "react-native";
import { StyleSheet, SafeAreaView, ScrollView, View } from "react-native";
import NewLesson from "@/components/newlesson/NewLesson";
const index = () => {
  return (
    <SafeAreaView>
      <ScrollView >

          <NewLesson />

      </ScrollView>
    </SafeAreaView>
  );
};

export default index;
