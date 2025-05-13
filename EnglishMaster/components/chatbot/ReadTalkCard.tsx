import { styles } from "@/constants/chatbot/Card";
import React from "react";
import { FlatList, Image, View, Text, TouchableOpacity } from "react-native";
import logoDogImage from "@/assets/images/logo-dog.png";
import Mindfullness from "@/assets/images/chatbot/meditation.jpg"
import ArchitectureImage from "@/assets/images/chatbot/architecture.jpg";
import EcomerceImage from "@/assets/images/chatbot/ecommerce busines.jpg";
import FoodTourImage from "@/assets/images/chatbot/foodtour.jpg";
import ITJobImage from "@/assets/images/chatbot/online-interview.jpg";
// import RolePlayData from "@/constants/chatbot/ReadTalk.json";
import { useRouter } from "expo-router";

// interface IReadTalkData {
//   id: number;
//   title: string;
//   imageLink: any;
// }

const ReadTalkData[] = [
    {
    id: 1,
    title: "Mindfulness and Social Media",
    imageLink: Mindfullness,
  },
  {
    id: 2,
    title: "An Introduction to Architecture Drawing",
    imageLink: ArchitectureImage,
  },
  {
    id: 3,
    title: "Breaking up and the relationship with ecommerce",
    imageLink: EcomerceImage,
  },
  {
    id: 4,
    title: "Food tour and unseen perspectives of local villages",
    imageLink: FoodTourImage,
  },
  {
    id: 5,
    title: "IT Job Interview after pandemic",
    imageLink: ITJobImage,
  },
]

const RolePlayCard = () => {
  const router = useRouter();
  let topic = "";
  const handlePressCard = (id: number, title: string) => {
    topic = title;
    router.push({
      pathname: "/chatroom/ChatRoom",
      params: { topic: topic },
    });
  };
  return (
    <View style={styles.cardListsContainer}>
      <FlatList
        data={ReadTalkData}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.cardContainer}
            onPress={() => handlePressCard(item.id, item.title)}
          >
            {/* Image  */}
            <Image source={item.imageLink} style={styles.cardImage} />
            <Text style={styles.cardTitle}>{item.title}</Text>
          </TouchableOpacity>
        )}
        horizontal
      />
    </View>
  );
};

export default RolePlayCard;
