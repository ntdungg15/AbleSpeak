import { styles } from "@/constants/chatbot/Card";
import React from "react";
import { FlatList, Image, View, Text, TouchableOpacity } from "react-native";
import logoDogImage from "@/assets/images/logo-dog.png";
// import RolePlayData from "@/constants/chatbot/ReadTalk.json";
import { useRouter } from "expo-router";

interface IReadTalkData {
  id: number;
  title: string;
  imageLink: string;
}

const ReadTalkData: IReadTalkData[] = [
    {
    id: 1,
    title: "Mindfulness and Social Media",
    imageLink: "@/assets/images/chatbot/classic.jpg",
  },
  {
    id: 2,
    title: "An Introduction to Architecture Drawing",
    imageLink: "@/assets/images/chatbot/classic.jpg",
  },
  {
    id: 3,
    title: "Breaking up and the relationship with ecommerce",
    imageLink: "@/assets/images/chatbot/classic.jpg",
  },
  {
    id: 4,
    title: "Food tour and unseen perspectives of local villages",
    imageLink: "@/assets/images/chatbot/classic.jpg",
  },
  {
    id: 5,
    title: "IT Job Interview after pandemic",
    imageLink: "@/assets/images/chatbot/classic.jpg",
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
            <Image source={{uri: item.imageLink}} style={styles.cardImage} />
            <Text style={styles.cardTitle}>{item.title}</Text>
          </TouchableOpacity>
        )}
        horizontal
      />
    </View>
  );
};

export default RolePlayCard;
