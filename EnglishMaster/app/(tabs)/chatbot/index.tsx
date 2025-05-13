import React from "react"; // seEffect
import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  Image,
  TouchableOpacity,

  // AccessibilityInfo,
  // Platform,
} from "react-native";
import { useRouter } from "expo-router";
// import * as Speech from "expo-speech";
import { styles } from "@/constants/chatbot/ChatBot";
import logoDogImage from "@/assets/images/logo-dog.png";
import RolePlayCard from "@/components/chatbot/RolePlayCard";
import ReadTalkCard from "@/components/chatbot/ReadTalkCard";

const ChatBot = () => {
  const router = useRouter();

  // const speak = (text: string) => {
  //   Speech.speak(text, {
  //     language: "en",
  //     rate: 0.9,
  //     pitch: 1.0,
  //   });
  // };

  const handlePressStart = () => {
    // speak("Starting a classic conversation.");
    router.push({
      pathname: "/chatroom/ChatRoom",
      params: { topic: "classic" },
    });
  };

  const handlePressRolePlay = () => {
    // speak("Navigating to Role Play topics.");
    router.push("/(tabs)/chatbot/Roleplay");
  };

  const handlePressReadTalk = () => {
    // speak("Navigating to Role Play topics.");
    router.push("/(tabs)/chatbot/ReadTalk");
  };

  // useEffect(() => {
  //   if (Platform.OS === "ios" || Platform.OS === "android") {
  //     AccessibilityInfo.announceForAccessibility(
  //       "Welcome to AbleSpeak ChatBot screen"
  //     );
  //   }
  // }, []);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}></View>
      <ScrollView
        style={styles.mainContainerScroll}
        contentContainerStyle={styles.mainContainerView}
        accessible={true}
        accessibilityLabel="Main content scroll area"
      >
        {/* Classic Section */}
        <View style={styles.classicContainer}>
          <Text style={styles.textcardheader} accessibilityRole="header">
            Classic
          </Text>
          <View style={styles.classicContent}>
            <Image
              source={logoDogImage}
              style={styles.classicImage}
              accessibilityLabel="AbleSpeak logo with a friendly dog illustration"
            />
            <View style={styles.classicTextContainer}>
              <Text
                style={styles.classicContentText}
                accessibilityLabel="Practice English with AbleSpeak, a friendly AI chatbot."
              >
                Practice English with AbleSpeak, a friendly AI chatbot.
              </Text>
              <TouchableOpacity
                style={styles.classicStartButton}
                onPress={handlePressStart}
                accessibilityRole="button"
                accessibilityLabel="Start classic conversation"
              >
                <Text style={styles.classicStartButtonText}>Start</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>

        {/* Role-Play Section */}
        <View style={styles.topicContainer}>
          <View style={styles.roleplayHeader}>
            <Text style={styles.textcardheader} accessibilityRole="header">
              Role-Play
            </Text>
            <Text
              style={{ marginRight: 12 }}
              onPress={handlePressRolePlay}
              accessibilityRole="link"
              accessibilityLabel="See more role play topics"
            >
              See more
            </Text>
          </View>
          <RolePlayCard />
        </View>

        {/* Role-Play Section */}
        <View style={styles.topicContainer}>
          <View style={styles.roleplayHeader}>
            <Text style={styles.textcardheader} accessibilityRole="header">
              Read-and-Talk
            </Text>
            <Text
              style={{ marginRight: 12 }}
              onPress={handlePressReadTalk}
              accessibilityRole="link"
              accessibilityLabel="See more role play topics"
            >
              See more
            </Text>
          </View>
          <ReadTalkCard />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default ChatBot;
