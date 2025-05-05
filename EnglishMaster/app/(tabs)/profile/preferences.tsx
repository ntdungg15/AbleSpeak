import React from "react";
import { View, Text, Switch, ScrollView, StyleSheet } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import {
  setSoundEffect,
  setVibrationSensor,
  setAnimationEffect,
} from "@/redux/reducer/Setting";

const PreferenceScreen = () => {
  const dispatch = useDispatch();

  const { soundEffect, vibrationSensor, animationEffect } = useSelector(
    (state) => state.setting
  );

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.header}>Preferences</Text>

      <View style={styles.preferenceItem}>
        <Text style={styles.preferenceText}>Sound Effect</Text>
        <Switch
          value={soundEffect}
          onValueChange={(value) => dispatch(setSoundEffect(value))}
        />
      </View>

      <View style={styles.preferenceItem}>
        <Text style={styles.preferenceText}>Cảm biến rung</Text>
        <Switch
          value={vibrationSensor}
          onValueChange={(value) => dispatch(setVibrationSensor(value))}
        />
      </View>

      <View style={styles.preferenceItem}>
        <Text style={styles.preferenceText}>Animation Effect</Text>
        <Switch
          value={animationEffect}
          onValueChange={(value) => dispatch(setAnimationEffect(value))}
        />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: "#fff",
  },
  header: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 20,
  },
  preferenceItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
  },
  preferenceText: {
    fontSize: 16,
  },
});

export default PreferenceScreen;
