import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { View , Text, StyleSheet} from "react-native";

const StatistifcsComponent = () => {
  return (
    <View>
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
    </View>
  );
};
const styles = StyleSheet.create({
  sectionTitle: { fontSize: 16, fontWeight: "bold", marginBottom: 8 },
  lessonCard: {
    alignItems: "center",
    marginRight: 12,
    backgroundColor: "#f2f2f2",
    padding: 10,
    borderRadius: 8,
  },
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
export default StatistifcsComponent;
