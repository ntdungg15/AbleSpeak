import { 
    View,
    TouchableOpacity,
    
} from 'react-native'
import { styles } from '../../../constants/chatbot/ChatFooter'
import React from 'react'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

export const ChatFooter = () => {
  return (
    <View style={styles.footerContainer}>
        {/* Left Icon (Keyboard) */}
        <TouchableOpacity style={styles.iconButton}>
            <Icon name="keyboard-outline" size={24} color="#555" />
        </TouchableOpacity>

        {/* Center Mic Button */}
        <TouchableOpacity style={styles.micButton}>
            <Icon name="microphone" size={28} color="#000" />
        </TouchableOpacity>

        {/* Right Icon (Pound) */}
        <TouchableOpacity style={styles.iconButton}>
            <Icon name="pound" size={24} color="#555" />
        </TouchableOpacity>
    </View>
  )
}

