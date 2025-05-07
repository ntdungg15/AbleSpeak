
import { styles } from '@/constants/chatbot/Card'
import React from 'react'
import {
    FlatList,
    Image,
    View,
    Text,
} from 'react-native'
import logoDogImage from '@/assets/images/logo-dog.png';

const data = [
    {
        id: 1,
        title: "hotel-checkin1",
        image: logoDogImage,

    }, 
    {
        id: 2,
        title: "hotel-checkin2",
        image: logoDogImage,
    }, 
    {
        id: 3,
        title: "hotel-checkin3",
        image: logoDogImage,
    }, 
    {
        id: 4,
        title: "hotel-checkin4",
        image: logoDogImage,
    }, 
    {
        id: 5,
        title: "hotel-checkin5",
        image: logoDogImage,
    },
]

const RolePlayCard = () => {
  return (
    <View style={styles.cardListsContainer}>
        <FlatList 
            data={data}
            renderItem={({ item }) => (
                <View style={styles.cardContainer}>
                    {/* Image  */}
                    <Image
                        source={item.image}
                        style={styles.cardImage}
                    />
                    <Text style={styles.cardTitle}>
                        {item.title}
                    </Text>
                </View>
            )}
            horizontal

        />
    </View>
  )
}

export default RolePlayCard

