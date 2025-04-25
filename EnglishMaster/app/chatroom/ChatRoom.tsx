import React from "react";
import { View, Text, SafeAreaView, StatusBar, Platform, TextInput } from "react-native";
import { useRouter } from "expo-router";
import { styles } from "@/constants/chatbot/ChatRoom";
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { useState } from "react";

import AntDesign from '@expo/vector-icons/AntDesign';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import Feather from '@expo/vector-icons/Feather';




const ChatRoom = () => {
  const router = useRouter();
  const [messList, setMessList] = useState<string[]>([]);
  const [message, setMessage] = useState("");

  const handleBackPress = () => {
    router.back();
  };

  const handleSendChat = () => {
    setMessList([...messList, message]);
    setMessage("");
  }
  return (
    <SafeAreaView style={{ flex: 1, paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0 }}>
      <StatusBar barStyle="dark-content" backgroundColor="#f8f8f8" />
      <View style={styles.container}>
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
        {/* MainChat */}
        <View style={styles.chatContainer}>
          {messList.map((mess, index) => (
            <>
              <View
                key={index}
                style={{
                  marginLeft: 50,
                  marginTop: 10,

                  width: "70%",
                  minHeight: "8%",
                  
                  
                  backgroundColor: "white",

                  justifyContent: "center",
                }}
              >
                <Text
                  style={{
                    padding: 10,
                  }}
                >{mess}</Text>
              </View>
            </>
          ))}
        </View>
        {/* Inputfield */}
        <View style={styles.inputContainer}>
          <FontAwesome name="microphone" size={18} color="black" style={{ margin: 20, }}/>
          <View style={{
            width: "70%",
            height: "70%",
            
            backgroundColor: "gray",
            borderRadius: 20,

            justifyContent: "center",
            alignItems: "center",

          }}>
            <TextInput 
              placeholder="..." 
              style={{
                minWidth: "90%",
                minHeight: "80%",
                borderWidth: 0,
                backgroundColor: "transparent",
              }}
              onChangeText={(text) => setMessage(text)}
              value={message} 
            />
          </View>
          <Feather name="send" size={18} color="black" style={{ margin: 20, }} onPress={() => {handleSendChat()}} />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default ChatRoom;
