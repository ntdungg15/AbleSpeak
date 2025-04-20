import React, { useEffect } from "react";
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
import { logout } from "@/redux/reducer/User";
import WeeklyXPChart from "@/components/profile/WeeklyStreak";
import FriendComponent from "@/components/profile/FriendComponent";
import { getRelationship } from "@/api/user";
import { get } from "react-native/Libraries/TurboModule/TurboModuleRegistry";
export default function ProfileScreen() {
  const user = useSelector((state) => state.user);
  const [relationship, setRelationship] = React.useState([]);
  useEffect(() => {
    console.log("User state changed:", user);
    if (user.isLoggedIn) {
      const relationshipData = getRelationship(user.userInfo?.email);
      setRelationship(relationshipData.relationship);
    }
  }, [user.isLoggedIn, user.userInfo?.email]);

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
            <Text style={styles.username}>{user.userInfo.name}!</Text>
            <Text style={styles.level}>Level 3 · Intermediate</Text>
            <View style={styles.userAppInfo}>
              <View
                style={{
                  position: "relative",

                  padding: 5,
                }}
              >
                <Text style={styles.joindate}>Join from Mar 2023</Text>
                <Text style={styles.friends}>3 friends</Text>
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
            onPress={() => router.push("/(tabs)/profile")}
          >
            <FontAwesome name="cog" size={24} color="black" />
          </Pressable>
        </View>

        {/* Statistics */}
        <Text style={styles.sectionTitle}>Statistics</Text>
        <View style={styles.statisticsContainer}>
          <View style={styles.statItem}>
            <Ionicons name="flame" size={24} color="#FF5722" />
            <Text style={styles.statNumber}>1</Text>
            <Text style={styles.statLabel}>Day streak</Text>
          </View>
          <View style={styles.statItem}>
            <Ionicons name="flash" size={24} color="#FFEB3B" />
            <Text style={styles.statNumber}>1771</Text>
            <Text style={styles.statLabel}>Total XP</Text>
          </View>
          <View style={styles.statItem}>
            <Ionicons name="shield-checkmark" size={24} color="#FFD700" />
            <Text style={styles.statNumber}>Gold</Text>
            <Text style={styles.statLabel}>League</Text>
          </View>
          <View style={styles.statItem}>
            <Ionicons name="medal" size={24} color="#FFC107" />
            <Text style={styles.statNumber}>1</Text>
            <Text style={styles.statLabel}>Top 3 finishes</Text>
          </View>
        </View>
        <WeeklyXPChart />
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
  header: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
    position: "relative",
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
    flex: 1,
    justifyContent: "space-between",
    right: 0,
  },
  nationality: { right: 20, top: 15 },
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
  joindate: { fontSize: 14, color: "#555", marginTop: 4 },
  friends: { fontSize: 16, color: "blue", marginTop: 4 },
  statisticsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    flexWrap: "wrap",
    marginBottom: 20,
  },
  statItem: {
    width: "47%",
    backgroundColor: "#f9f9f9",
    borderRadius: 10,
    padding: 16,
    marginBottom: 12,
    alignItems: "center",
    elevation: 2,
  },
  statNumber: {
    fontSize: 20,
    fontWeight: "bold",
    marginTop: 8,
  },
  statLabel: {
    fontSize: 14,
    color: "#777",
    textAlign: "center",
    marginTop: 4,
  },
});
