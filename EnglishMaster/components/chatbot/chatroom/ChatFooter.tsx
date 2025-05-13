import {
    TextInput,
    View,
    TouchableOpacity,
    TouchableWithoutFeedback,
} from 'react-native';
import { styles } from '../../../constants/chatbot/ChatFooter';
import React from 'react';
import { useState } from 'react';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Feather from '@expo/vector-icons/Feather';
import Animated,
{   
    useSharedValue,
    withTiming,
    withRepeat,
    withSequence,
    useAnimatedStyle,
    withDelay,
} from 'react-native-reanimated';


interface ChatFooterProps {
    onSendTextMessage: (message: string) => void;
}

export const ChatFooter: React.FC<ChatFooterProps> = ({ onSendTextMessage }) => {
  const [micPressed, setMicPressed] = useState(false);
  const [keyboardView, setKeyboardView] = useState(false);
  const [chatTextInput, setChatTextInput] = useState("");

  //Animated value
  const width = useSharedValue<number>(74);
  const height = useSharedValue<number>(74);
  const top = useSharedValue<number>(-34);
  const left = useSharedValue<number>(86);
  
  const animatedMicRingExpand = () => {
    width.value += 24;
    height.value += 24;
    top.value -= 12;
    left.value -= 12;
  }

  const animatedMicRingShrink = () => {
    width.value = 74;
    height.value = 74;
    top.value = -34;
    left.value = 86;
  }

  const handleSendTextChat = () => {
    if (chatTextInput.trim() !== "") {
      onSendTextMessage(chatTextInput);
      setChatTextInput(""); // Clear the input after sending
    }
  }

  const animateStyleMicRing = useAnimatedStyle(() => ({
    width: withRepeat(
        withSequence(
            withTiming(width.value, {duration: 800}),
            withDelay(100, withTiming(width.value, { duration: 100 })),
        ),
        -1,
        false,
    ),
    height: withRepeat(
        withSequence(
            withTiming(height.value, {duration: 800}),
            withDelay(100, withTiming(height.value, { duration: 100 })),
        ),
        -1,
        false,
    ),
    top: withRepeat(
        withSequence(
            withTiming(top.value, {duration: 800}),
            withDelay(100, withTiming(top.value, { duration: 100 })),
        ),
        -1,
        false,
    ),
    left: withRepeat(
        withSequence(
            withTiming(left.value, {duration: 800}),
            withDelay(100, withTiming(left.value, { duration: 100 })),
        ),
        -1,
        false,
    ),



    // width: withRepeat(withTiming(width.value, {duration: 800}), -1, false),
    // height: withRepeat(withTiming(height.value, {duration: 800}), -1, false), 
    // top: withRepeat(withTiming(top.value, { duration: 800}), -1, false), 
    // left: withRepeat(withTiming(left.value, { duration: 800}), -1, false), 
    // width: withTiming(width.value, {duration: 200}), // Apply width directly
    // height: withTiming(height.value, {duration: 200}), // Apply height directly
    // top: withTiming(top.value, { duration: 200}), // Apply top directly
    // left: withTiming(left.value, { duration: 200}), // Apply left directly
  }))
    
  return (
    
    <View style={styles.footerContainer}>
        {!keyboardView && (
        <>
            {/* Left Icon (Keyboard) */}
            <TouchableOpacity style={styles.iconButton} onPress={() => {
                setKeyboardView(true) }}>
                <Icon name="keyboard-outline" size={24} color="#555" />
            </TouchableOpacity>

            {/* Center Mic Button */}
            {micPressed && (
                <Animated.View style={[styles.micRingAnimmation, animateStyleMicRing]} />
            )}
            <View style={[styles.micButton, micPressed && { backgroundColor: "#8BB3E1FF" }]}>
                <TouchableWithoutFeedback
                    onPressIn={() => {
                        setMicPressed(true)
                        animatedMicRingExpand();
                    }}
                    onPressOut={() => {
                        setMicPressed(false);
                        animatedMicRingShrink();
                    }}>
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
                size={24} color="black" 
                style={{ }} 
                onPress={handleSendTextChat}/>
            )}

            {chatTextInput.length === 0 && (
              <Icon name="microphone" size={24} color="#000" style={{ }} />
            )}

        </>
        )}
    </View> 
    
  )
}

