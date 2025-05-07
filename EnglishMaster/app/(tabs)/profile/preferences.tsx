import React from "react";
import { View, Text, Switch, ScrollView, StyleSheet } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import {
  setSoundEffect,
  setVibrationSensor,
  setAnimationEffect,
} from "@/redux/reducer/Setting";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";

const PreferenceScreen = () => {
  const dispatch = useDispatch();

  const { soundEffect, vibrationSensor, animationEffect } = useSelector(
    (state) => state.setting
  );

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={{ paddingBottom: 30 }}
    >
      <LinearGradient
        colors={["#4facfe", "#00f2fe"]}
        style={styles.headerContainer}
      >
        <Ionicons name="options-outline" size={28} color="#fff" />
        <Text style={styles.headerText}>Preferences</Text>
      </LinearGradient>

      <View style={styles.preferenceContainer}>
        <View style={styles.preferenceItem}>
          <Text style={styles.preferenceText}>Sound Effect</Text>
          <Switch
            value={soundEffect}
            onValueChange={(value) => dispatch(setSoundEffect(value))}
            trackColor={{ false: "#ccc", true: "#4facfe" }}
            thumbColor={soundEffect ? "#4facfe" : "#f4f3f4"}
          />
        </View>

        <View style={styles.preferenceItem}>
          <Text style={styles.preferenceText}>Cảm biến rung</Text>
          <Switch
            value={vibrationSensor}
            onValueChange={(value) => dispatch(setVibrationSensor(value))}
            trackColor={{ false: "#ccc", true: "#4facfe" }}
            thumbColor={vibrationSensor ? "#4facfe" : "#f4f3f4"}
          />
        </View>

        <View style={styles.preferenceItem}>
          <Text style={styles.preferenceText}>Animation Effect</Text>
          <Switch
            value={animationEffect}
            onValueChange={(value) => dispatch(setAnimationEffect(value))}
            trackColor={{ false: "#ccc", true: "#4facfe" }}
            thumbColor={animationEffect ? "#4facfe" : "#f4f3f4"}
          />
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
  },
  headerContainer: {
    padding: 20,
    flexDirection: "row",
    alignItems: "center",
  },
  headerText: {
    marginLeft: 10,
    fontSize: 24,
    fontWeight: "bold",
    color: "#fff",
  },
  preferenceContainer: {
    margin: 20,
    backgroundColor: "#ffffff",
    borderRadius: 10,
    elevation: 3, // Android shadow
    shadowColor: "#000", // iOS shadow
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    overflow: "hidden",
  },
  preferenceItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
    backgroundColor: "#f9f9f9",
  },
  preferenceText: {
    fontSize: 16,
    color: "#333",
  },
});

export default PreferenceScreen;
