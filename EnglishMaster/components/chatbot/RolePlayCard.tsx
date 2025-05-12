
import { styles } from '@/constants/chatbot/Card'
import React from 'react'
import {
    FlatList,
    Image,
    View,
    Text,
    TouchableOpacity,
} from 'react-native'
import logoDogImage from '@/assets/images/logo-dog.png';
import RolePlayData from '@/constants/chatbot/RolePlayData.json'
import {
    useRouter,   
} from 'expo-router';

// const data = [
//     {
//         id: 1,
//         title: "Meeting new People",
//         image: logoDogImage,

//     }, 
//     {
//         id: 2,
//         title: "hotel-checkin",
//         image: logoDogImage,
//     }, 
//     {
//         id: 3,
//         title: "Restaurant order",
//         image: logoDogImage,
//     }, 
//     {
//         id: 4,
//         title: "Family dinner",
//         image: logoDogImage,
//     }, 
//     {
//         id: 5,
//         title: "Job interview",
//         image: logoDogImage,
//     },
// ]

const RolePlayCard = () => {
  const router = useRouter();
  let topic = "";
  const handlePressCard = (id: number, title: string) => {
    topic = title;
  router.push({
    pathname: "/chatroom/ChatRoom",
    params: { topic: topic },
  })
  }
  return (
    <View style={styles.cardListsContainer}>
        <FlatList 
            data={RolePlayData}
            renderItem={({ item }) => (
                <TouchableOpacity 
                style={styles.cardContainer} 
                onPress={() => handlePressCard(item.id, item.title)}>
                    {/* Image  */}
                    <Image
                        source={logoDogImage}
                        style={styles.cardImage}
                    />
                    <Text style={styles.cardTitle}>
                        {item.title}
                    </Text> 
                </TouchableOpacity>
            )}
            horizontal

        />
    </View>
  )
}

export default RolePlayCard

