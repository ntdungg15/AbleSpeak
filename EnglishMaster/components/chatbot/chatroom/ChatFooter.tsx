import {
    TextInput,
    View,
    TouchableOpacity,
    TouchableWithoutFeedback,
} from 'react-native'
import { styles } from '../../../constants/chatbot/ChatFooter'
import React from 'react'
import { useState } from 'react';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Feather from '@expo/vector-icons/Feather';


interface ChatFooterProps {
    onSendTextMessage: (message: string) => void;
}

export const ChatFooter: React.FC<ChatFooterProps> = ({ onSendTextMessage }) => {
  const [micPressed, setMicPressed] = useState(false);
  const [keyboardView, setKeyboardView] = useState(true);
  const [chatTextInput, setChatTextInput] = useState("");

  const handleSendTextChat = () => {
    if (chatTextInput.trim() !== "") {
      onSendTextMessage(chatTextInput);
      setChatTextInput(""); // Clear the input after sending
    }
  }
    
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
            <View style={[styles.micButton, micPressed && { backgroundColor: "red" }]}>
                <TouchableWithoutFeedback
                    onPressIn={() => {
                        
                        setMicPressed(true)
                    }}
                    onPressOut={() => {
                        
                        setMicPressed(false)
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
                style={styles.iconButton} 
                onPress={handleSendTextChat}/>
            )}

            {chatTextInput.length === 0 && (
              <Icon name="microphone" size={28} color="#000" style={styles.iconButton} />
            )}

        </>
        )}
    </View> 
    
  )
}

