import React, { useState } from "react";
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  Pressable,
  Linking,
  Alert,
} from "react-native";
import { AntDesign, Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { router } from "expo-router";

import PrivacyPolicyModal from "@/components/profile/PrivacyPolicyModal";
import TermsOfServiceModal from "@/components/profile/TermOfSerivicesModal";
import ThanksModal from "@/components/profile/ThanksModal";

const SettingScreen = () => {
  const [privacyVisible, setPrivacyVisible] = useState(false);
  const [termsVisible, setTermsVisible] = useState(false);
  const [thanksVisible, setThanksVisible] = useState(false);

  const handleOpenURL = async (url: string) => {
    try {
      const supported = await Linking.canOpenURL(url);
      if (supported) {
        await Linking.openURL(url);
      } else {
        Alert.alert("Error", "Can't open this URL: " + url);
      }
    } catch (error) {
      console.error("Failed to open URL:", error);
    }
  };

  return (
    <>
      <ScrollView contentContainerStyle={{ paddingBottom: 30 }}>
        <LinearGradient
          colors={["#4facfe", "#00f2fe"]}
          style={styles.headerContainer}
        >
          <Ionicons name="settings-outline" size={28} color="#fff" />
          <Text style={styles.headerText}>Settings</Text>
        </LinearGradient>

        <View style={{ padding: 20 }}>
          <Text style={styles.introText}>Manage your settings here.</Text>
        </View>

        <View style={{ padding: 20 }}>
          <Text style={styles.sectionHeader}>Account Settings</Text>
          <View style={styles.sectionContainer}>
            <Pressable
              style={styles.sectionItem}
              android_ripple={{ color: "#d0d0d0" }}
              onPress={() => router.push("/profile/preferences")}
            >
              <Text style={styles.sectionItemText}>Preferences</Text>
              <AntDesign name="right" size={24} color="#4facfe" />
            </Pressable>
            <Pressable
              style={styles.sectionItem}
              android_ripple={{ color: "#d0d0d0" }}
              onPress={() => router.push("/profile/updateInfo")}
            >
              <Text style={styles.sectionItemText}>Profile</Text>
              <AntDesign name="right" size={24} color="#4facfe" />
            </Pressable>
            <Pressable
              style={styles.sectionItem}
              android_ripple={{ color: "#d0d0d0" }}
            >
              <Text style={styles.sectionItemText}>Notification</Text>
              <AntDesign name="right" size={24} color="#4facfe" />
            </Pressable>
          </View>
        </View>

        <View style={{ padding: 20 }}>
          <Text style={styles.sectionHeader}>Support</Text>
          <View style={styles.sectionContainer}>
            <Pressable
              style={styles.sectionItem}
              android_ripple={{ color: "#d0d0d0" }}
              onPress={() => handleOpenURL("https://www.duolingo.com")}
            >
              <Text style={styles.sectionItemText}>Support center</Text>
              <AntDesign name="right" size={24} color="#4facfe" />
            </Pressable>
            <Pressable
              style={styles.sectionItem}
              android_ripple={{ color: "#d0d0d0" }}
              onPress={() => handleOpenURL("https://www.duolingo.com")}
            >
              <Text style={styles.sectionItemText}>Feedback</Text>
              <AntDesign name="right" size={24} color="#4facfe" />
            </Pressable>
          </View>
        </View>

        <View style={styles.infoContainer}>
          <Pressable
            android_ripple={{ color: "#d0d0d0" }}
            onPress={() => setPrivacyVisible(true)}
          >
            <Text style={styles.infoText}>Privacy Policy</Text>
          </Pressable>
          <Pressable
            android_ripple={{ color: "#d0d0d0" }}
            onPress={() => setTermsVisible(true)}
          >
            <Text style={styles.infoText}>Terms of Service</Text>
          </Pressable>
          <Pressable
            android_ripple={{ color: "#d0d0d0" }}
            onPress={() => setThanksVisible(true)}
          >
            <Text style={styles.infoText}>Thanks</Text>
          </Pressable>
        </View>
      </ScrollView>

      <PrivacyPolicyModal
        visible={privacyVisible}
        onClose={() => setPrivacyVisible(false)}
      />
      <TermsOfServiceModal
        visible={termsVisible}
        onClose={() => setTermsVisible(false)}
      />
      <ThanksModal
        visible={thanksVisible}
        onClose={() => setThanksVisible(false)}
      />
    </>
  );
};

const styles = StyleSheet.create({
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
  introText: {
    marginTop: 10,
    fontSize: 20,
    fontWeight: "bold",
  },
  sectionContainer: {
    marginTop: 10,
    backgroundColor: "#ffffff",
    borderRadius: 10,
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    overflow: "hidden",
  },
  sectionHeader: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
    color: "#333",
  },
  sectionItem: {
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#f9f9f9",
  },
  sectionItemText: {
    fontSize: 16,
    color: "#333",
  },
  infoContainer: {
    padding: 20,
  },
  infoText: {
    fontSize: 18,
    color: "#4facfe",
    marginVertical: 5,
    textAlign: "center",
  },
});

export default SettingScreen;
