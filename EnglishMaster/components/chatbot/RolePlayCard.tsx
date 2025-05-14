import { styles } from "@/constants/chatbot/Card";
import React from "react";
import { FlatList, Image, View, Text, TouchableOpacity } from "react-native";
// import logoDogImage from "@/assets/images/logo-dog.png";
// import RolePlayData from "@/constants/chatbot/RolePlayData.json";
import MeetingNewPeopleImage from "@/assets/images/chatbot/meeting-new-people.jpg";
import HotelCheckinImage from "@/assets/images/chatbot/hotel-checkin.jpg";
import RestaurantOrderImage from "@/assets/images/chatbot/restaurant-order.jpg";
import FamilyDinnerImage from "@/assets/images/chatbot/family-dinner.jpg";
import JobInterviewImage from "@/assets/images/chatbot/job-interview.jpg";
import { useRouter } from "expo-router";

// interface IRolePlayData {
//   id: number;
//   title: string;
//   imageLink: string;
// }

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
];

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
            <Image source={item.imageLink} style={styles.cardImage} />
            <Text style={styles.cardTitle}>{item.title}</Text>
          </TouchableOpacity>
        )}
        horizontal
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
      />
    </View>
  );
};

export default RolePlayCard;
