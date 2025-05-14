import {
  TextInput,
  View,
  TouchableOpacity,
  TouchableWithoutFeedback,
} from "react-native";
import { styles } from "../../../constants/chatbot/ChatFooter";
import React from "react";
import { useState, useRef, useEffect } from "react";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import Feather from "@expo/vector-icons/Feather";
// import LottieView from "lottie-react-native";
// import MicAnimation from "@/assets/animations/ChatRoom/micRecordAnimateLottie.json";
// import Animated,
// {
//     useSharedValue,
//     withTiming,
//     withRepeat,
//     withSequence,
//     useAnimatedStyle,
//     withDelay,
// } from 'react-native-reanimated';

interface ChatFooterProps {
  onSendTextMessage: (message: string) => void;
}

export const ChatFooter: React.FC<ChatFooterProps> = ({
  onSendTextMessage,
}) => {
  const [micPressed, setMicPressed] = useState(false);
  const [keyboardView, setKeyboardView] = useState(false);
  const [chatTextInput, setChatTextInput] = useState("");
  // const animation = useRef<LottieView>(null);

  useEffect(() => {
    // You can control the ref programmatically, rather than using autoPlay
    // animation.current?.play();
  }, []);

  //   //Animated value
  //   const width = useSharedValue<number>(74);
  //   const height = useSharedValue<number>(74);
  //   const top = useSharedValue<number>(-34);
  //   const left = useSharedValue<number>(86);

  //   const animatedMicRingExpand = () => {
  //     width.value += 24;
  //     height.value += 24;
  //     top.value -= 12;
  //     left.value -= 12;
  //   }

  //   const animatedMicRingShrink = () => {
  //     width.value = 74;
  //     height.value = 74;
  //     top.value = -34;
  //     left.value = 86;
  //   }

  const handleSendTextChat = () => {
    if (chatTextInput.trim() !== "") {
      onSendTextMessage(chatTextInput);
      setChatTextInput(""); // Clear the input after sending
    }
  };

  const handleMicSet = () => {
    // Handle microphone set action
    setKeyboardView(false);
  };

  //   const animateStyleMicRing = useAnimatedStyle(() => ({
  //     width: withRepeat(
  //         withSequence(
  //             withTiming(width.value, {duration: 800}),
  //             withDelay(100, withTiming(width.value, { duration: 100 })),
  //         ),
  //         -1,
  //         false,
  //     ),
  //     height: withRepeat(
  //         withSequence(
  //             withTiming(height.value, {duration: 800}),
  //             withDelay(100, withTiming(height.value, { duration: 100 })),
  //         ),
  //         -1,
  //         false,
  //     ),
  //     top: withRepeat(
  //         withSequence(
  //             withTiming(top.value, {duration: 800}),
  //             withDelay(100, withTiming(top.value, { duration: 100 })),
  //         ),
  //         -1,
  //         false,
  //     ),
  //     left: withRepeat(
  //         withSequence(
  //             withTiming(left.value, {duration: 800}),
  //             withDelay(100, withTiming(left.value, { duration: 100 })),
  //         ),
  //         -1,
  //         false,
  //     ),

  //   }))

  return (
    <View style={styles.footerContainer}>
      {!keyboardView && (
        <>
          {/* Left Icon (Keyboard) */}
          <TouchableOpacity
            style={styles.iconButton}
            onPress={() => {
              setKeyboardView(true);
            }}
          >
            <Icon name="keyboard-outline" size={24} color="#555" />
          </TouchableOpacity>

          {/* Center Mic Button */}
          {micPressed && (
            <View style={styles.micRingAnimmation}>
              {/* <LottieView
                autoPlay
                ref={animation}
                style={{
                  width: 180,
                  height: 180,
                }}
                // Find more Lottie files at https://lottiefiles.com/featured
                source={MicAnimation}
              /> */}
            </View>
          )}
          <View
            style={[
              styles.micButton,
              micPressed && { backgroundColor: "#8BB3E1FF" },
            ]}
          >
            <TouchableWithoutFeedback
              onPressIn={() => {
                setMicPressed(true);
                // animatedMicRingExpand();
              }}
              onPressOut={() => {
                setMicPressed(false);
                // animatedMicRingShrink();
              }}
            >
              <Icon name="microphone" size={28} color="#000" />
            </TouchableWithoutFeedback>

            {/* RecordRing  */}
          </View>

          {/* Right Icon (Pound) */}
          <TouchableOpacity style={styles.iconButton}>
            <Icon name="pound" size={24} color="#555" />
          </TouchableOpacity>
        </>
      )}
      {keyboardView && (
        <>
          <TextInput
            style={styles.chatInput} // Ensure proper styling
            placeholder="Type a message..."
            onChangeText={(text) => setChatTextInput(text)} // Update state
            value={chatTextInput}
            onSubmitEditing={handleSendTextChat} // Handle send on enter
          />

          {chatTextInput.length > 0 && (
            <Feather
              name="send"
              size={24}
              color="black"
              style={{ marginRight: 10 }}
              onPress={handleSendTextChat}
            />
          )}

          {chatTextInput.length === 0 && (
            <Icon name="microphone" size={24} color="#000" style={{ marginRight: 10 }} onPress={handleMicSet} />
          )}
        </>
      )}
    </View>
  );
};
