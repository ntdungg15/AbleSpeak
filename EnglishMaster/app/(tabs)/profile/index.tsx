import React, { useEffect } from "react";
import {
  SafeAreaView,
  Text,
  Image,
  View,
  ScrollView,
  Pressable,
  StyleSheet,
  TouchableWithoutFeedback,
  Keyboard,
  Platform,
  KeyboardAvoidingView,
} from "react-native";
import { useRouter } from "expo-router";
import { useSelector, useDispatch } from "react-redux";
import { FontAwesome } from "@expo/vector-icons";
import LoginScreen from "./login";
import { logout } from "@/redux/reducer/User";
import WeeklyXPChart from "@/components/profile/WeeklyStreak";
import FriendComponent from "@/components/profile/FriendComponent";
import { getRelationship } from "@/api/user";
import StatistifcsComponent from "@/components/profile/StatistifcsComponent";
import * as Progress from "react-native-progress";
import { LinearGradient } from "expo-linear-gradient";

export default function ProfileScreen() {
  const user = useSelector((state) => state.user);
  const [relationship, setRelationship] = React.useState([]);
  const router = useRouter();
  const dispatch = useDispatch();

  const quotes = [
    "Keep pushing your limits!",
    "Consistency is the key to success.",
    "Small steps every day lead to big results.",
  ];
  const randomQuote = quotes[Math.floor(Math.random() * quotes.length)];

  useEffect(() => {
    if (user.isLoggedIn) {
      const relationshipData = getRelationship(user.userInfo?.email);
      setRelationship(relationshipData.relationship);
    }
  }, [user.isLoggedIn, user.userInfo?.email]);

  if (!user.isLoggedIn) {
    return <LoginScreen />;
  }

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <LinearGradient colors={["#e0f7fa", "#fff"]} style={styles.container}>
        <SafeAreaView style={{ flex: 1 }}>
          <KeyboardAvoidingView
            style={{ flex: 1 }}
            behavior={Platform.OS === "ios" ? "padding" : undefined}
          >
            <ScrollView
              showsVerticalScrollIndicator={false}
              keyboardShouldPersistTaps="handled"
              contentContainerStyle={{ flexGrow: 1, paddingBottom: 20 }}
            >
              <View style={{ flex: 1 }}>
                {/* Header */}
                <View style={styles.header}>
                  <Image
                    style={styles.avatar}
                    source={{
                      uri: "https://i.pinimg.com/736x/86/82/12/8682125231a362848c3743c444f1ce98.jpg",
                    }}
                  />
                  <View style={styles.headerInfo}>
                    <Text style={styles.username}>{user.userInfo.name}!</Text>
                    <Text style={styles.level}>Level 3 · Intermediate</Text>
                    <View style={styles.userAppInfo}>
                      <View style={{ padding: 5 }}>
                        <Text style={styles.joindate}>Join from Mar 2023</Text>
                      </View>
                      <View style={styles.nationality}>
                        <Image
                          source={{
                            uri: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/21/Flag_of_Vietnam.svg/640px-Flag_of_Vietnam.svg.png",
                          }}
                          style={{ width: 30, height: 20 }}
                        />
                      </View>
                    </View>
                  </View>
                  <Pressable
                    style={styles.settingButon}
                    onPress={() => router.push("/(tabs)/profile/setting")}
                  >
                    <FontAwesome name="cog" size={24} color="black" />
                  </Pressable>
                </View>

                {/* Progress Bar */}
                <Progress.Bar
                  progress={0.6}
                  width={null}
                  height={10}
                  color="#4caf50"
                />
                <Text style={{ textAlign: "center", marginTop: 5 }}>
                  60% to next level
                </Text>

                <StatistifcsComponent />
                <WeeklyXPChart />

                {/* Achievements */}
                <Text style={styles.sectionTitle}>Achievements</Text>
                <ScrollView
                  horizontal
                  showsHorizontalScrollIndicator={false}
                  style={styles.scrollRow}
                >
                  {["7-Day Streak", "100 Words", "10 Listening"].map(
                    (badge, index) => (
                      <View
                        key={index}
                        style={{ padding: 10, alignItems: "center" }}
                      >
                        <FontAwesome name="trophy" size={24} color="#ffd700" />
                        <Text>{badge}</Text>
                      </View>
                    )
                  )}
                </ScrollView>

                {/* Daily Goal */}
                <Text style={styles.sectionTitle}>Today's Goal</Text>
                <View style={styles.dailyGoal}>
                  <Text>🎯 Complete 3 practices</Text>
                  <Text>🎯 Learn 5 new words</Text>
                </View>

                {/* Motivational Quote */}
                <Text style={styles.quoteText}>{randomQuote}</Text>

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

                {/* Friend Component */}
                <FriendComponent relationship={relationship} />

                {/* Recently Reviewed Words */}
                <Text style={styles.sectionTitle}>Recently Reviewed</Text>
                <ScrollView
                  horizontal
                  showsHorizontalScrollIndicator={false}
                  style={styles.scrollRow}
                >
                  {["apple", "run", "beautiful", "quickly"].map(
                    (word, index) => (
                      <View key={index} style={styles.wordBox}>
                        <Text style={styles.wordText}>{word}</Text>
                      </View>
                    )
                  )}
                </ScrollView>

                {/* Invite Friends Button */}
                <View style={{ alignItems: "center", marginTop: 10 }}>
                  <Pressable
                    style={{
                      backgroundColor: "#2196f3",
                      paddingVertical: 10,
                      paddingHorizontal: 30,
                      borderRadius: 8,
                      marginBottom: 10,
                    }}
                  >
                    <Text style={{ color: "#fff", fontWeight: "bold" }}>
                      Invite Friends
                    </Text>
                  </Pressable>
                </View>

                {/* Logout Button */}
                <View style={{ alignItems: "center", marginTop: 10 }}>
                  <Pressable
                    onPress={() => dispatch(logout())}
                    style={{
                      backgroundColor: "#ff5252",
                      paddingVertical: 10,
                      paddingHorizontal: 30,
                      borderRadius: 8,
                    }}
                  >
                    <Text style={{ color: "#fff", fontWeight: "bold" }}>
                      Logout
                    </Text>
                  </Pressable>
                </View>
              </View>
            </ScrollView>
          </KeyboardAvoidingView>
        </SafeAreaView>
      </LinearGradient>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  header: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
    position: "relative",
    paddingHorizontal: 16,
  },
  avatar: { width: 60, height: 60, borderRadius: 30 },
  headerInfo: { flex: 1, marginLeft: 12 },
  settingButon: {
    padding: 10,
    backgroundColor: "#f0f0f0",
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
    top: -20,
  },
  username: { fontSize: 18, fontWeight: "bold" },
  level: { fontSize: 14, color: "#555" },
  userAppInfo: {
    flexDirection: "row",
    justifyContent: "space-between",
    right: 0,
  },
  nationality: { right: 20, top: 15 },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 8,
    marginHorizontal: 16,
  },
  practiceRow: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginBottom: 20,
    marginHorizontal: 16,
  },
  practiceBtn: {
    backgroundColor: "#e0f7fa",
    padding: 12,
    borderRadius: 8,
    width: "30%",
    alignItems: "center",
  },
  scrollRow: { marginBottom: 20, paddingHorizontal: 16 },
  wordBox: {
    backgroundColor: "#d1c4e9",
    padding: 12,
    borderRadius: 8,
    marginRight: 10,
  },
  wordText: { fontSize: 16, fontWeight: "500", color: "#4a148c" },
  joindate: { fontSize: 14, color: "#555", marginTop: 4 },
  dailyGoal: {
    backgroundColor: "#fff3e0",
    padding: 12,
    borderRadius: 8,
    marginHorizontal: 16,
    marginBottom: 20,
  },
  quoteText: {
    fontStyle: "italic",
    textAlign: "center",
    marginVertical: 10,
    marginHorizontal: 16,
  },
});
