import React from "react";
import {
  View,
  Text,
  Image,
  SafeAreaView,
  // ScrollView,
  FlatList,
  TouchableOpacity,
} from "react-native";
import { useRouter } from "expo-router";
import { styles } from "@/constants/chatbot/RolePlay";
import AntDesign from "@expo/vector-icons/AntDesign";
import MeetingNewPeopleImage from "@/assets/images/chatbot/meeting-new-people.jpg";
import HotelCheckinImage from "@/assets/images/chatbot/hotel-checkin.jpg";
import RestaurantOrderImage from "@/assets/images/chatbot/restaurant-order.jpg";
import FamilyDinnerImage from "@/assets/images/chatbot/family-dinner.jpg";
import JobInterviewImage from "@/assets/images/chatbot/job-interview.jpg";
import FoodTourImage from "@/assets/images/chatbot/foodtour.jpg";


const RolePlayData = [
  {
    id: 1,
    title: "Meeting new People",
    imageLink: MeetingNewPeopleImage,
  },
  {
    id: 2,
    title: "Hotel-checkin",
    imageLink: HotelCheckinImage,
  },
  {
    id: 3,
    title: "Restaurant order",
    imageLink: RestaurantOrderImage,
  },
  {
    id: 4,
    title: "Family dinner",
    imageLink: FamilyDinnerImage, 
  },
  {
    id: 5,
    title: "Job interview",
    imageLink: JobInterviewImage,
  },
  {
    id: 6,
    title: "Traveling",
    imageLink: FoodTourImage,
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
        <Text style={styles.headerTitle}>Role Play</Text>
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
          data={RolePlayData}
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
