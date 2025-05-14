import React from "react";
import {
  View,
  Text,
  Image,
  SafeAreaView,
  ScrollView,
  FlatList,
  TouchableOpacity,
} from "react-native";
import { useRouter } from "expo-router";
import { styles } from "@/constants/chatbot/RolePlay";
import AntDesign from "@expo/vector-icons/AntDesign";
import Mindfullness from "@/assets/images/chatbot/meditation.jpg"
import ArchitectureImage from "@/assets/images/chatbot/architecture.jpg";
import EcomerceImage from "@/assets/images/chatbot/ecommerce busines.jpg";
import FoodTourImage from "@/assets/images/chatbot/foodtour.jpg";
import ITJobImage from "@/assets/images/chatbot/online-interview.jpg";
import RestaurantOrderImage from "@/assets/images/chatbot/restaurant-order.jpg";
const ReadTalkData = [
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
  {
    id: 6,
    title: "The polite way to order food in a restaurant",
    imageLink: RestaurantOrderImage,
  },
]

const roleplay = () => {
  const router = useRouter();
  const handleBackPress = () => {
    router.back();
  };
  const handleRolePress = (id: number, title: string) => {
    const topic = title;
    router.push({
      pathname: "/chatroom/ChatRoom",
      params: { topic: topic },
    });
  };
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Read and Talk</Text>
        <TouchableOpacity>
          <AntDesign
            name="close"
            size={24}
            color="white"
            style={{ marginHorizontal: 24 }}
            onPress={handleBackPress}
          />
        </TouchableOpacity>
      </View>

      <View style={styles.mainContainer}>
        <FlatList
          data={ReadTalkData}
          numColumns={2}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={styles.cardContainer}
              onPress={() => handleRolePress(item.id, item.title)}
            >
              <Image source={item.imageLink} style={styles.cardImage} />
              <Text style={styles.cardTitle}>{item.title}</Text>
            </TouchableOpacity>
          )}
          keyExtractor={(item) => item.id.toString()}
          contentContainerStyle={{ alignItems: "center" }}
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}
        />
      </View>
    </SafeAreaView>
  );
};

export default roleplay;
