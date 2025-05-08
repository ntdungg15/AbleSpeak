import { 
    View,
    TouchableOpacity,
    TouchableWithoutFeedback,
} from 'react-native'
import { styles } from '../../../constants/chatbot/ChatFooter'
import React from 'react'
import { useState } from 'react';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';


export const ChatFooter = () => {
  const [micPressed, setMicPressed] = useState(false);
  
    
  return (
    <View style={styles.footerContainer}>
        {/* Left Icon (Keyboard) */}
        <TouchableOpacity style={styles.iconButton}>
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
    </View>
  )
}

