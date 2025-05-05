import React from "react";
import { View, Text, ScrollView, StyleSheet, Pressable } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { router } from "expo-router";
const SettingScreen = () => {
  return (
    <ScrollView>
      <View style={{ padding: 20 }}>
        <Text style={{ marginTop: 10, fontSize: 20, fontWeight: "bold" }}>
          Manage your settings here.
        </Text>
      </View>
      <View style={{ padding: 20 }}>
        <Text style={styles.sectionHeader}>Account Settings</Text>
        <View style={styles.sectionContainer}>
          <Pressable
            style={styles.sectionItem}
            onPress={() => router.push("/profile/preferences")}
          >
            <Text style={styles.sectionItemText}>Preferences</Text>
            <AntDesign name="right" size={24} color="black" />
          </Pressable>
          <Pressable style={styles.sectionItem}>
            <Text style={styles.sectionItemText}>Profile</Text>
            <AntDesign name="right" size={24} color="black" />
          </Pressable>
          <Pressable style={styles.sectionItem}>
            <Text style={styles.sectionItemText}>Notification</Text>
            <AntDesign name="right" size={24} color="black" />
          </Pressable>
        </View>
        {/* Add your account settings options here */}
      </View>
      <View style={{ padding: 20 }}>
        <Text style={styles.sectionHeader}>Support</Text>
        <View style={styles.sectionContainer}>
          <Pressable style={styles.sectionItem}>
            <Text style={styles.sectionItemText}>Support center</Text>
            <AntDesign name="right" size={24} color="black" />
          </Pressable>
          <Pressable style={styles.sectionItem}>
            <Text style={styles.sectionItemText}>Feedback</Text>
            <AntDesign name="right" size={24} color="black" />
          </Pressable>
        </View>
        {/* Add your account settings options here */}
      </View>
      <View style={styles.infoContainer}>
        <Pressable onPress={() => console.log("Privacy Policy")}>
          <Text style={styles.infoText}>Privacy Policy</Text>
        </Pressable>
        <Pressable onPress={() => console.log("Terms of Service")}>
          <Text style={styles.infoText}>Terms of Service</Text>
        </Pressable>
        <Pressable onPress={() => console.log("Thanks")}>
          <Text style={styles.infoText}>Thanks</Text>
        </Pressable>
      </View>
    </ScrollView>
  );
};
const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 10,
    backgroundColor: "#f0f0f0",
    borderRadius: 10,
    borderColor: "gray",
    borderWidth: 1,
    overflow: "hidden",
  },
  sectionHeader: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
    color: "#333",
  },
  sectionItem: {
    padding: 10,
    backgroundColor: "#gray", // cùng màu container
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  sectionItemText: {
    fontSize: 16,
    color: "#333",
  },
  infoContainer: {
    padding: 20,
  },
  infoText: {
    fontSize: 20,
    color: "blue",
  },
});
export default SettingScreen;
