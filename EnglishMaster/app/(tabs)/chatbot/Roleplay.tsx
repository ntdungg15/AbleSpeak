
import React from 'react'
import {
    View,
    Text,
    Image,
    SafeAreaView,
    // ScrollView,
    FlatList,
} from 'react-native';
import { styles } from '@/constants/chatbot/RolePlay'
import AntDesign from '@expo/vector-icons/AntDesign';
import RolePlayData from '@/constants/chatbot/RolePlayData.json'
import logoDogImage from '@/assets/images/logo-dog.png';

const roleplay = () => {
  
  return (
    <SafeAreaView style={styles.container}>
        <View style={styles.header}>
          <AntDesign name="arrowleft" size={24} color="white" style={{ marginHorizontal: 24, }}/>
          <AntDesign name="arrowleft" size={24} color="white" style={{ marginHorizontal: 24, }}/>
        </View>

        <View style={styles.mainContainer}>
          <FlatList
            
            data={RolePlayData}
            numColumns={2}
            renderItem={({ item }) => (
              <View style={styles.cardContainer}>                
                <Image source={logoDogImage} style={styles.cardImage} />
                <Text style={styles.cardTitle}>{item.title}</Text>
              </View>
            )}
            keyExtractor={(item) => item.id.toString()}
            contentContainerStyle={{ alignItems: "center" }}
            
          />
        </View>

    </SafeAreaView>
  )
}

export default roleplay
