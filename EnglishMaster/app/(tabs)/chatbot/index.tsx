import React from 'react'
import { Text, View, StatusBar, Image, } from 'react-native'
import { TouchableOpacity } from 'react-native'
import { useRouter } from 'expo-router'

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

        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
      }}>
        <Image
          source={require('@/assets/images/icon.png')}
          style={{
            width: 100,
            height: 100,
            borderRadius: 50,
            marginBottom: 20,
          }}
        />
        <TouchableOpacity
          style={{
            width: 200,
            height: 50,
            backgroundColor: '#007AFF',
            borderRadius: 10,
            justifyContent: 'center',
            alignItems: 'center',

            //shadow        
            //iOS
            shadowColor: "#000",
            shadowOffset: {
                width: 0,
                height: 2,
            },
            shadowOpacity: 0.25,
            shadowRadius: 3.84,
            //Android
            elevation: 5,
          }}
          onPress={() => { handlePress() }}
        >
          <Text
            style={{
              color: '#fff',
              fontSize: 18,
              fontWeight: 'bold',
            }}
          >Chat with AbleSpeak</Text>
        </TouchableOpacity>

        
      </View>
    </View>
  )
}

export default ChatBot;