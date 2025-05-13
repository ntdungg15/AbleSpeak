import { styles } from "@/constants/chatbot/Card";
import React from "react";
import { FlatList, Image, View, Text, TouchableOpacity } from "react-native";
import logoDogImage from "@/assets/images/logo-dog.png";
import RolePlayData from "@/constants/chatbot/ReadTalk.json";
import { useRouter } from "expo-router";

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
        data={RolePlayData}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.cardContainer}
            onPress={() => handlePressCard(item.id, item.title)}
          >
            {/* Image  */}
            <Image source={{uri: `https://vstatic.vietnam.vn/vietnam/resource/IMAGE/2025/5/3/5d2ec4aacb804ca2883a6ecc321b882a`}} style={styles.cardImage} />
            <Text style={styles.cardTitle}>{item.title}</Text>
          </TouchableOpacity>
        )}
        horizontal
      />
    </View>
  );
};

export default RolePlayCard;
