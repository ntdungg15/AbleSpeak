import React from 'react'
import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  Image,
  TouchableOpacity,
  // Modal,
  // ActivityIndicator,
} from 'react-native';
import { useRouter } from 'expo-router'
import { styles } from '@/constants/chatbot/ChatBot'
import logoDogImage from '@/assets/images/logo-dog.png';
import RolePlayCard from '@/components/chatbot/RolePlayCard';

const ChatBot = () => {
  const router = useRouter();
  const handlePress = () => {
    router.push('/(tabs)/chatbot/Roleplay');
  }
  const handlePressStart = () => {
    router.push('/chatroom/ChatRoom');
  }
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}></View>
      <ScrollView 
        style={styles.mainContainerScroll}
        contentContainerStyle={styles.mainContainerView}
      > 
        {/* Classic  */}
        <View style={styles.classicContainer}>
          <Text style={styles.textcardheader}>Classic</Text>
          <View style={styles.classicContent}>
            <Image
              source={logoDogImage}
              style={styles.classicImage}
            />
            <View style={styles.classicTextContainer}>
              <Text style={styles.classicContentText}>
                Practice English with AbleSpeak, a friendly AI chatbot.
              </Text>
              <TouchableOpacity 
                style={styles.classicStartButton}
                onPress={() => handlePressStart()}
              >                
                <Text style={styles.classicStartButtonText}>Start</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>

        {/* Role-Play  */}
        <View style={styles.topicContainer}>
          {/* RolePlay header  */}
          <View style={styles.roleplayHeader}>
            <Text style={styles.textcardheader}>Role-Play</Text>
            <Text style={{marginRight: 12,}} onPress={handlePress}>See more</Text>
          </View>
          <RolePlayCard />
        </View>
        
        {/* Read and talk  */}
        {/* <View style={styles.topicContainer}>
          <Text style={styles.textcardheader}>Read and Talk</Text>
          
        </View> */}


      </ScrollView>
    </SafeAreaView>
  )
}

export default ChatBot;