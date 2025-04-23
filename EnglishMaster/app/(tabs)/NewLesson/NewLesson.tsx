import React from "react";
import { View, Text, Image, TouchableHighlight } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { styles } from "@/constants/newlesson/NewLesson";
import { router, useRouter } from "expo-router";
const NewLesson = () => {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>New Lesson</Text>
      </View>
      <View style={styles.row}>
        <TouchableHighlight style={styles.touchable}
          onPress={() => router.push("/(tabs)/NewLesson/Vocabulary/Vocabulary")}
          underlayColor="#f5f5f5"
>
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Vocabulary</Text>
            <Image
              source={{ uri: "https://via.placeholder.com/150" }}
              style={styles.image}
            />
          </View>
        </TouchableHighlight>

        <TouchableHighlight style={styles.touchable} 
        onPress={() => router.push("/(tabs)/NewLesson/Grammar/Grammar")}
        underlayColor="#f5f5f5"
>
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Grammar</Text>
            <Image
              source={{ uri: "https://via.placeholder.com/150" }}
              style={styles.image}
            />
          </View>
        </TouchableHighlight>
      </View>

      <View style={styles.row}>
        <TouchableHighlight style={styles.touchable}
        onPress={() => router.push("/(tabs)/NewLesson/Dialogue/Dialogue")}
        underlayColor="#f5f5f5"
>
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Dialogue</Text>
            <Image
              source={{ uri: "https://via.placeholder.com/150" }}
              style={styles.image}
            />
          </View>
        </TouchableHighlight>

        <TouchableHighlight style={styles.touchable}
        onPress={() => router.push("/(tabs)/NewLesson/Video/Video_Illustration")}
        underlayColor="#f5f5f5"
>
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Video/Illustration</Text>
            <Image
              source={{ uri: "https://via.placeholder.com/150" }}
              style={styles.image}
            />
          </View>
        </TouchableHighlight>
      </View>
    </SafeAreaView>
  );
};

export default NewLesson;