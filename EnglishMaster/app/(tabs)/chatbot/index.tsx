import React from 'react'
import { Text, View, StatusBar, Image, } from 'react-native'
import { TouchableOpacity } from 'react-native'
import { useRouter } from 'expo-router'
import Feather from '@expo/vector-icons/Feather';
import AntDesign from '@expo/vector-icons/AntDesign';

const ChatBot = () => {
  const router = useRouter();
  const handlePress = () => {
    router.push('../../chatroom/ChatRoom');
  }
  return (
    <View style={{
      flex: 1,
    }}>
      <StatusBar barStyle="dark-content" backgroundColor="#f8f8f8" />
      <View style={{
        width: '100%',
        height: "100%",
        marginTop: 25,

        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'center',
      }}>
        <View style={{
          width: "100%",
          height: "12%",
          marginBottom: 100,

          borderBottomLeftRadius: 20,
          borderBottomRightRadius: 20,
          backgroundColor: "white",
          
          flexDirection: 'row',
          justifyContent: 'space-evenly',
          alignItems: 'center',
        }}>
          <Feather name="more-horizontal" size={24} color="black" />
          <Text style={{
            marginHorizontal: 36,
          }}>Chat with AbleSpeak</Text>
          <AntDesign name="minus" size={24} color="black" />
        </View>
        <View style={{
          position: 'relative',
          width: "80%",
          height: "30%",

          backgroundColor: "white",
          borderRadius: 20,
          borderWidth: 1,
          borderColor: "#E0E0E0",
          //shadow        
            //iOS
            shadowColor: "#000",
            shadowOffset: {
                width: 0,
                height: 1,
            },
            shadowOpacity: 0.25,
            shadowRadius: 3.84,
            //Android
            elevation: 2,
          
          
          flexDirection: 'column',
          justifyContent: 'space-evenly',
          alignItems: 'center',
          padding: 20,
        }}>
          <Image
          source={require('@/assets/images/icon.png')}
          style={{

            position: 'absolute',
            top: "-20%",
            left: "40%",

            width: 80,
            height: 80,

            borderRadius: 50,
            marginBottom: 20,
          }}
        />
          <Text style={{
            marginHorizontal: 10,
            marginTop: 20,
            marginBottom: 10,

            fontSize: 16,
            
          }}>Hello Nice to see you here! 
            By pressing the "Start chat" button you agree to have your personal data processed 
            as described in our Privacy Policy</Text>
   
          <TouchableOpacity
            style={{
              width: "100%",
              height: "24%",
              backgroundColor: '#007AFF',
              borderRadius: 10,
              justifyContent: 'center',
              alignItems: 'center',

              
            }}
            onPress={() => { handlePress() }}
          >
            <Text
              style={{
                color: '#fff',
                fontSize: 16,
                fontWeight: 'bold',
              }}
            >Start Chat</Text>
          </TouchableOpacity>
        </View>
        

        
      </View>
    </View>
  )
}

export default ChatBot;