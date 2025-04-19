// index.tsx
import React from "react";
import {
  SafeAreaView,
  Text,
  Image,
  View,
  ScrollView,
  Pressable,
  StyleSheet,
} from "react-native";
import { useRouter } from "expo-router";
import { useSelector } from "react-redux";
import { FontAwesome, MaterialIcons, Ionicons } from "@expo/vector-icons";
import LoginScreen from "./login";
import { useDispatch } from "react-redux";
import { logout } from "@/redux/reducer/User"; // Đường dẫn tới slice của bạn

export default function ProfileScreen() {
  const user = useSelector((state) => state.user);

  const router = useRouter();
  const dispatch = useDispatch();
  if (!user.isLoggedIn) {
    return <LoginScreen />;
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <Image
            style={styles.avatar}
            source={{
              uri: "https://i.pinimg.com/736x/86/82/12/8682125231a362848c3743c444f1ce98.jpg",
            }}
          />
          <View style={styles.headerInfo}>
            <Text style={styles.username}>
              Welcome back, {user.userInfo.name}!
            </Text>
            <Text style={styles.level}>Level 3 · Intermediate</Text>
          </View>
          <Pressable onPress={() => router.push("/(tabs)/profile")}>
            <FontAwesome name="cog" size={24} color="black" />
          </Pressable>
        </View>

        {/* Stats */}
        <View style={styles.statsContainer}>
          <View style={styles.statBox}>
            <Ionicons name="flame" size={24} color="#FF6D00" />
            <Text style={styles.statValue}>5-day streak</Text>
          </View>
          <View style={styles.statBox}>
            <MaterialIcons name="stars" size={24} color="#FFD700" />
            <Text style={styles.statValue}>XP: 1200</Text>
          </View>
          <View style={styles.statBox}>
            <FontAwesome name="trophy" size={24} color="#8E44AD" />
            <Text style={styles.statValue}>Badges: 4</Text>
          </View>
        </View>

        {/* Learning Progress */}
        <Text style={styles.sectionTitle}>Your Progress</Text>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.progressRow}
        >
          {[1, 2, 3].map((lesson, index) => (
            <View key={index} style={styles.lessonCard}>
              <Image
                source={{
                  uri: "https://i.pinimg.com/736x/86/82/12/8682125231a362848c3743c444f1ce98.jpg",
                }}
                style={styles.lessonImage}
                onError={(e) =>
                  console.log("Image load error", e.nativeEvent.error)
                }
              />
              <Text style={styles.lessonTitle}>Lesson {lesson}</Text>
            </View>
          ))}
        </ScrollView>

        {/* Practice Section */}
        <Text style={styles.sectionTitle}>Quick Practice</Text>
        <View style={styles.practiceRow}>
          <Pressable style={styles.practiceBtn}>
            <Text>Vocabulary</Text>
          </Pressable>
          <Pressable style={styles.practiceBtn}>
            <Text>Listening</Text>
          </Pressable>
          <Pressable style={styles.practiceBtn}>
            <Text>Speaking</Text>
          </Pressable>
        </View>

        {/* Recently Viewed or Reviewed Words */}
        <Text style={styles.sectionTitle}>Recently Reviewed</Text>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.scrollRow}
        >
          {["apple", "run", "beautiful", "quickly"].map((word, index) => (
            <View key={index} style={styles.wordBox}>
              <Text style={styles.wordText}>{word}</Text>
            </View>
          ))}
        </ScrollView>
        <View style={{ alignItems: "center", marginTop: 20 }}>
          <Pressable
            onPress={() => dispatch(logout())}
            style={{
              backgroundColor: "#ff5252",
              paddingVertical: 10,
              paddingHorizontal: 30,
              borderRadius: 8,
            }}
          >
            <Text style={{ color: "#fff", fontWeight: "bold" }}>Logout</Text>
          </Pressable>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff", padding: 16 },
  header: { flexDirection: "row", alignItems: "center", marginBottom: 20 },
  avatar: { width: 60, height: 60, borderRadius: 30 },
  headerInfo: { flex: 1, marginLeft: 12 },
  username: { fontSize: 18, fontWeight: "bold" },
  level: { fontSize: 14, color: "#555" },
  statsContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginBottom: 20,
  },
  statBox: { alignItems: "center" },
  statValue: { marginTop: 4, fontSize: 14 },
  sectionTitle: { fontSize: 16, fontWeight: "bold", marginBottom: 8 },
  progressRow: { flexDirection: "row", marginBottom: 20 },
  lessonCard: {
    alignItems: "center",
    marginRight: 12,
    backgroundColor: "#f2f2f2",
    padding: 10,
    borderRadius: 8,
  },
  lessonImage: { width: 80, height: 80, borderRadius: 10 },
  lessonTitle: { marginTop: 6, fontSize: 14 },
  practiceRow: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginBottom: 20,
  },
  practiceBtn: {
    backgroundColor: "#e0f7fa",
    padding: 12,
    borderRadius: 8,
    width: "30%",
    alignItems: "center",
  },
  scrollRow: { flexDirection: "row", marginBottom: 20 },
  wordBox: {
    backgroundColor: "#d1c4e9",
    padding: 12,
    borderRadius: 8,
    marginRight: 10,
  },
  wordText: { fontSize: 16, fontWeight: "500", color: "#4a148c" },
});
