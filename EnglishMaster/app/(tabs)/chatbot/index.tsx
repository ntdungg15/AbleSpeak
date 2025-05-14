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
// import logoDogImage from "@/assets/images/logo-dog.png";
import classicImage from "@/assets/images/chatbot/classic.jpg";
import RolePlayCard from "@/components/chatbot/RolePlayCard";
import ReadTalkCard from "@/components/chatbot/ReadTalkCard";
import AntDesign from '@expo/vector-icons/AntDesign';

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
      params: { topic: "Classic" },
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
              source={classicImage}
              style={styles.classicImage}
              accessibilityLabel="AbleSpeak logo with a friendly dog illustration"
            />
            <View style={styles.classicTextContainer}>
              <Text
                style={styles.classicContentText}
                accessibilityLabel="Practice English with AbleSpeak, your personal Teacher"
              >
                Practice English with AbleSpeak, your personal Teacher
              </Text>
              <TouchableOpacity
                style={styles.classicStartButton}
                onPress={handlePressStart}
                accessibilityRole="button"
                accessibilityLabel="Start classic conversation"
              >
                <Text style={styles.classicStartButtonText}>Start</Text>
                <AntDesign name="rightcircleo" size={14} color="white" />
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
            <TouchableOpacity style={{ marginRight: 12, flexDirection: "row", alignItems: "center",  }}>
              <Text
                style={{}}
                onPress={handlePressRolePlay}
                accessibilityRole="link"
                accessibilityLabel="See more role play topics"
              >
                See all
              </Text>
              <AntDesign name="right" size={14} color="black" />

            </TouchableOpacity>
          </View>
          <RolePlayCard />
        </View>

        {/* Role-Play Section */}
        <View style={styles.topicContainer}>
          <View style={styles.roleplayHeader}>
            <Text style={styles.textcardheader} accessibilityRole="header">
              Read-and-Talk
            </Text>
            <TouchableOpacity style={{ marginRight: 12, flexDirection: "row", alignItems: "center",  }}>
              <Text
                style={{}}
                onPress={handlePressReadTalk}
                accessibilityRole="link"
                accessibilityLabel="See more role play topics"
              >
                See all
              </Text>
              <AntDesign name="right" size={14} color="black" />

            </TouchableOpacity>
          </View>
          <ReadTalkCard />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default ChatBot;
