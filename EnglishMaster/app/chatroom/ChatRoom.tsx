import React from "react";
import { 
  View, 
  // Text,
  SafeAreaView, 
  StatusBar, 
  Platform, 
  // TextInput, 
  ScrollView,
  KeyboardAvoidingView,
  // Keyboard,
  // TouchableWithoutFeedback,
} from "react-native";
import { useRouter } from "expo-router";
import { styles } from "@/constants/chatbot/ChatRoom";
// import FontAwesome from '@expo/vector-icons/FontAwesome';
import { 
  useState, 
  useEffect,
  useRef,
} from "react";
import { useLocalSearchParams } from "expo-router";

import AntDesign from '@expo/vector-icons/AntDesign';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import Feather from '@expo/vector-icons/Feather';

// import { getGroqResponse } from "@/service/gropService"
import Markdown from 'react-native-markdown-display';
import { ChatFooter } from "@/components/chatbot/chatroom/ChatFooter";
import LottieView from 'lottie-react-native';

import VoiceAnimation from "@/assets/animations/ChatRoom/botChatTypeIndicator.json";

type Message = {
  text: string;
  isUser: boolean;
};


const ChatRoom = () => {
  const router = useRouter();
  const { topic } = useLocalSearchParams();
  const [ messList, setMessList ] = useState<Message[]>([]); 
  const [ typingIndicator, setTypingIndicator ] = useState(false);
  let chatRespone: string = "";
  const animation = useRef<LottieView>(null);

  const handleBackPress = () => {
    router.back();
  };

  const handleSendChat = async (message: string) => {
    if (message.trim() === "") return;
    setMessList(prev => [...prev, { text: message, isUser: true }]);
    setTypingIndicator(true);

    // const chatRespone = await getGroqResponse(message);
    // chatRespone = "Fix xong t xu m, nu pa ga chi";
    // const responseText = chatRespone || "Xin lỗi, không có phản hồi từ máy chủ.";
    // setMessList(prev => [...prev, { text: responseText, isUser: false }]);
  }

  // useEffect(() => {
  //   const handleResponeAnswer = () => {
  //     if (messList.length > 0) {
  //       const responseAns = "Hey";
        
  //     }
  //   }

  //   handleResponeAnswer();
  // }, [messList]);
   useEffect(() => {
     let introMessage = "Hello! How can I assist you today?";
    if (topic == "classic") {
      introMessage = "Hello! Let's start a classic conversation.";
    } else if (topic == "Meeting new People") {
      introMessage = "Hello! Let's practice meeting new people.";
    } else if (topic == "hotel-checkin") {
      introMessage = "Hello! Let's practice checking into a hotel.";
    } else if (topic == "Restaurant order") {
      introMessage = "Hello! Let's practice ordering food at a restaurant.";
    } else if (topic == "Family dinner") {
      introMessage = "Hello! Let's practice having a family dinner.";
    } else if (topic == "Job interview") {
      introMessage = "Hello! Let's practice a job interview.";
    }
    setMessList([{ text: introMessage, isUser: false }]);
  }, []);

  useEffect(() => {
    if (typingIndicator) {
      const timer = setTimeout(() => {
        setTypingIndicator(false);
        chatRespone = "Fix xong t xu m, nu pa ga chi";
        const responseText = chatRespone || "Xin lỗi, không có phản hồi từ máy chủ.";
        setMessList(prev => [...prev, { text: responseText, isUser: false }]);
      }, 1500); 
      return () => clearTimeout(timer);
    }
  }, [typingIndicator]);

  useEffect(() => {
    // You can control the ref programmatically, rather than using autoPlay
    // animation.current?.play();
  }, []);

  const VoiceIndicatorAnimation = () => {
    return (
      <>
        <View style={styles.voiceAnimationContainer}>
          <LottieView
            autoPlay
            ref={animation}
            style={{
              width: 50,
              height: 30,
              // backgroundColor: '#eee',
            }}
            // Find more Lottie files at https://lottiefiles.com/featured
            source={VoiceAnimation}
          />
        </View>
      </>
    );
  }
  return (
    <>
    <StatusBar barStyle="dark-content" backgroundColor="#f8f8f8" />
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'} // quan trọng
      style={{ flex: 1, }}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 80 : 0} // thử chỉnh offset này nếu header bị che
    >
      {/* <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}> */}
        
    <SafeAreaView style={{ flex: 1, paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0 }}>
        {/* Header  */}
        <View style={styles.header}>
          <AntDesign name="arrowleft" size={24} color="black" style={{margin: 20}} onPress={() => {handleBackPress()}}/>
          <View 
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <FontAwesome5 name="history" size={20} color="black" 
                          style={{marginTop: 20,
                                  marginRight: 10,
                                  marginBottom: 20,
                                  marginLeft: 20,}} 
            />  
            <Feather name="more-horizontal" size={24} color="black"
                      style={{marginTop: 20,
                        marginRight: 10,
                        marginBottom: 20,
                        marginLeft: 10,}}  
            />
            <AntDesign name="close" size={24} color="black" 
                       style={{marginTop: 20,
                        marginRight: 20,
                        marginBottom: 20,
                        marginLeft: 10,}}  
            />

          </View>

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
          {messList.map((mess, index) => (
            mess.isUser ? (
                <View
                  key={`user-${index}`}
                  style={styles.userMessContainer}
                >
                  <Markdown
                    style={{
                      body: {
                        color: "black",
                        fontSize: 14,
                        
                      },
                    }}
                  >{mess.text.trim()}</Markdown>
                </View>
              
            ) : (
              
                <View
                  key={`bot-${index}`}
                  style={styles.botMessContainer}
                >
                  <Markdown
                    style={{
                      body: {
                        color: "black",
                        fontSize: 14,
                      },
                    }}
                  >{mess.text.trim()}</Markdown>
                </View>
              
            )   
          ))}

          {/* TypingIndicator  */}
          {typingIndicator ? (
            <>
              <View style={styles.botMessContainer}>
                <VoiceIndicatorAnimation />
              </View>
            </>
          ) : (
            <>
            </>
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
