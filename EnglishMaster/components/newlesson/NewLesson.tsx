import React from "react";
import { View, Text, Button, ScrollView, StyleSheet, Image } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import {styles} from "@/constants/newlesson/NewLesson";
const NewLesson = () => {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.content}>
        {/* Row 1: Vocabulary and Grammar */}
        <View style={styles.row}>
          {/* Vocabulary Section */}
          <View style={styles.section}>
          <Text style={styles.sectionTitle}>Vocabulary</Text>
          <Image
              source={{ uri: "https://via.placeholder.com/150" }}
              style={styles.image}
            />
          </View>

          {/* Grammar Section */}
          <View style={styles.section}>
          <Text style={styles.sectionTitle}>Grammar</Text>
          <Image
              source={{ uri: "https://via.placeholder.com/150" }}
              style={styles.image}
            />
          </View>
        </View>

        {/* Row 2: Dialogue and Video/Illustration */}
        <View style={styles.row}>
          {/* Dialogue Section */}
          <View style={styles.section}>
          <Text style={styles.sectionTitle}>Dialogue</Text>
          <Image
              source={{ uri: "https://via.placeholder.com/150" }}
              style={styles.image}
            />
          </View>

          {/* Video/Illustration Section */}
          <View style={styles.section}>
          <Text style={styles.sectionTitle}>Video/Illustration</Text>
          <Image
              source={{ uri: "https://via.placeholder.com/150" }}
              style={styles.image}
            />

          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};


export default NewLesson;