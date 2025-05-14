import React from "react";
import {
  View,
  Text,
  SafeAreaView,
  StatusBar,
  Platform,
  // TextInput,
  ScrollView,
  KeyboardAvoidingView,
  // Keyboard,
  // TouchableWithoutFeedback,
  TouchableOpacity,
} from "react-native";
import { useRouter } from "expo-router";
import { styles } from "@/constants/chatbot/ChatRoom";
// import FontAwesome from '@expo/vector-icons/FontAwesome';
import { useState, useEffect, useRef } from "react";
import { useLocalSearchParams } from "expo-router";

import AntDesign from "@expo/vector-icons/AntDesign";
import FontAwesome from "@expo/vector-icons/FontAwesome";

import { getGroqResponse } from "@/api/gropService";
import Markdown from "react-native-markdown-display";
import { ChatFooter } from "@/components/chatbot/chatroom/ChatFooter";
import LottieView from "lottie-react-native";
import * as Speech from "expo-speech";
// import LinearGradient from "react-native-linear-gradient";

import VoiceLottieAnimation from "@/assets/animations/ChatRoom/voiceAnimation.json";

type Message = {
  text: string;
  isUser: boolean;
};

const ChatRoom = () => {
  const router = useRouter();
  const { topic } = useLocalSearchParams();
  const [messList, setMessList] = useState<Message[]>([]);
  const [typingIndicator, setTypingIndicator] = useState(true);
  let chatRespone: string = "";
  const [isSpeaking, setIsSpeaking] = useState(true);
  const animation = useRef<LottieView>(null);

  const handleBackPress = () => {
    router.back();
  };

  const handleSendChat = async (message: string) => {
    if (message.trim() === "") return;
    setMessList((prev) => [...prev, { text: message, isUser: true }]);
    setTypingIndicator(true);

    // chatRespone = "Fix xong t xu m, nu pa ga chi";
    // const responseText = chatRespone || "Xin lỗi, không có phản hồi từ máy chủ.";
    // setMessList(prev => [...prev, { text: responseText, isUser: false }]);
  };

  // useEffect(() => {
  //   const handleResponeAnswer = () => {
  //     if (messList.length > 0) {
  //       const responseAns = "Hey";

  //     }
  //   }

  //   handleResponeAnswer();
  // }, [messList]);
  useEffect(() => {
    let firstPromt = "";

    if (topic == "Classic") {
      // introMessage = "Hello! Let's start a classic conversation.";
      firstPromt =
        "Imagine you are a language teacher. I am a student. Let's have a conversation.";
    } else if (topic == "Meeting new People") {
      // introMessage = "Hello! Let's practice meeting new people.";
      firstPromt =
        "Imagine You are a stranger. I am a English learner. Describe a random situation where I meet you and we start to talk to each other";
    } else if (topic == "hotel-checkin") {
      // introMessage = "Hello! Let's practice checking into a hotel.";
      firstPromt =
        "Imagine you are a hotel receptionist. I am a guest checking in. Let's have a conversation.";
    } else if (topic == "Restaurant order") {
      // introMessage = "Hello! Let's practice ordering food at a restaurant.";
      firstPromt =
        "Imagine you are a waiter. I am a customer. Let's have a conversation.";
    } else if (topic == "Family dinner") {
      // introMessage = "Hello! Let's practice having a family dinner.";
      firstPromt =
        "Imagine you are my family member. I am a student. Let's have a conversation.";
    } else if (topic == "Job interview") {
      // introMessage = "Hello! Let's practice a job interview.";
      firstPromt =
        "Imagine you are an interviewer. I am a candidate. Let's have a conversation.";
    } else if (topic == "Mindfulness and Social Media") {
      firstPromt =
        "Write a short science paragraph about the impact of social media on mental health. Ask me questions to help me understand the topic better.";
    } else if (topic == "An Introducetion to Architecture Drawing") {
      firstPromt =
        "Write a short science paragraph about how Architecture Drawing. Ask me questions to help me understand the topic better.";
    } else if (topic == "Breaking up and the relationship with ecommerce") {
      firstPromt =
        "Write a short science paragraph about how Breaking up and sadness affect people shoping routine. Ask me questions to help me understand the topic better.";
    } else if (
      topic == "Food tour and unseen perserpectives of local villages"
    ) {
      firstPromt =
        "Write a short science paragraph about how Food tour and unseen perserpectives of local villages. Ask me questions to help me understand the topic better.";
    } else if (topic == "IT Job Interview after pandemic") {
      firstPromt =
        "Write a short science paragraph about how IT Job Interview after pandemic. Ask me questions to help me understand the topic better.";
    } else if (topic == "Traveling") {
      firstPromt =
        "Imagine you are a travel guide. I am a tourist. Let's have a conversation.";
    } else if (topic == "The polite way to order food in a restaurant") {
      firstPromt =
        "Imagine you are a waiter. I am a customer. Let's have a conversation.";
    }
    const fetchIntroMessage = async () => {
      // const introMessage = "Talk real long shit show that I can test the pause button oke can you do it"
      const introMessage = await getGroqResponse(firstPromt);
      setMessList([{ text: introMessage, isUser: false }]);
      // Speak the intro message
      speak(introMessage);
    };
    fetchIntroMessage();
  }, []);

  useEffect(() => {
    if (typingIndicator) {
      const timer = setTimeout(async () => {
        setTypingIndicator(false);
        const message = messList[messList.length - 1].text;
        chatRespone = await getGroqResponse(message);
        chatRespone = "Fix xong t xu m, nu pa ga chi";
        const responseText =
          chatRespone || "Xin lỗi, không có phản hồi từ máy chủ.";
        setMessList((prev) => [...prev, { text: responseText, isUser: false }]);
        // Speak the response
        speak(responseText);
        setIsSpeaking(true);
      }, 1500); // 2 seconds delay
      return () => clearTimeout(timer);
    }
  }, [typingIndicator]);

  useEffect(() => {
    // You can control the ref programmatically, rather than using autoPlay
    // animation.current?.play();
  }, []);

  const VoiceAnimation = () => {
    return (
      <>
        <View style={styles.voiceAnimationContainer}>
          <LottieView
            ref={animation}
            source={VoiceLottieAnimation}
            autoPlay
            loop
            style={{ width: 100, height: 50 }}
          />
        </View>
      </>
    );
  };

  const speak = (text: string) => {
    Speech.speak(text);
  };

  return (
    <>
      <StatusBar barStyle="dark-content" backgroundColor="#f8f8f8" />
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"} // quan trọng
        style={{ flex: 1 }}
        keyboardVerticalOffset={Platform.OS === "ios" ? 80 : 0} // thử chỉnh offset này nếu header bị che
      >
        {/* <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}> */}

        <SafeAreaView
          style={{
            flex: 1,
            paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
          }}
        >
          {/* Header  */}
          <View
            style={styles.header}
            // colors={["#FFFFFF", "#F4F8F9"]}
          >
            <Text style={styles.headerTopicText}>{topic}</Text>
            <TouchableOpacity>
              <AntDesign
                name="close"
                size={24}
                color="black"
                style={{
                  marginTop: 20,
                  marginRight: 20,
                  marginBottom: 20,
                  marginLeft: 10,
                }}
                onPress={handleBackPress}
              />
            </TouchableOpacity>
          </View>

          <View style={styles.container}>
            {/* MainChat */}
            <ScrollView
              style={styles.chatContainer}
              contentContainerStyle={{
                justifyContent: "flex-start",
                alignItems: "flex-end",
              }}
              keyboardShouldPersistTaps="handled"
            >
              {messList.map((mess, index) => {
                const isLastBotMessage =
                  !mess.isUser && index === messList.length - 1;

                return mess.isUser ? (
                  <View key={`user-${index}`} style={styles.userMessContainer}>
                    <Markdown
                      style={{
                        body: {
                          color: "black",
                          fontSize: 18,
                        },
                      }}
                    >
                      {mess.text.trim()}
                    </Markdown>
                  </View>
                ) : (
                  <View key={`bot-${index}`} style={styles.botMessContainer}>
                    <Markdown
                      style={{
                        body: {
                          color: "white",
                          fontSize: 18,
                        },
                      }}
                    >
                      {mess.text.trim()}
                    </Markdown>

                    {/* StopButton  */}
                    {isLastBotMessage && (
                      <TouchableOpacity
                        style={styles.stopButton}
                        onPress={() => {
                          if (isSpeaking) {
                            Speech.stop();
                            setIsSpeaking(false);
                          } else {
                            Speech.speak(mess.text);
                            setIsSpeaking(true);
                          }
                        }}
                      >
                        {isSpeaking ? (
                          <>
                            <AntDesign name="pause" size={14} color="#A4BEED" />
                          </>
                        ) : (
                          <>
                            <FontAwesome
                              name="play"
                              size={14}
                              color="#A4BEED"
                            />
                          </>
                        )}
                      </TouchableOpacity>
                    )}
                  </View>
                );
              })}

              {/* TypingIndicator  */}
              {typingIndicator ? (
                <>
                  <View style={styles.botMessContainer}>
                    <VoiceAnimation />
                  </View>
                </>
              ) : (
                <></>
              )}
            </ScrollView>

            {/* Inputfield */}
            <View>
              <ChatFooter onSendTextMessage={handleSendChat}></ChatFooter>
            </View>
          </View>
        </SafeAreaView>
        {/* </TouchableWithoutFeedback> */}
      </KeyboardAvoidingView>
    </>
  );
};

export default ChatRoom;
