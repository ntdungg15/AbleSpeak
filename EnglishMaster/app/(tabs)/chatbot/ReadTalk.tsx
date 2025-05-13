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
import RolePlayData from "@/constants/chatbot/ReadTalk.json";
import logoDogImage from "@/assets/images/logo-dog.png";

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
        <AntDesign
          name="arrowleft"
          size={24}
          color="white"
          style={{ marginHorizontal: 24 }}
          onPress={handleBackPress}
        />
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
              <Image source={logoDogImage} style={styles.cardImage} />
              <Text style={styles.cardTitle}>{item.title}</Text>
            </TouchableOpacity>
          )}
          keyExtractor={(item) => item.id.toString()}
          contentContainerStyle={{ alignItems: "center" }}
        />
      </View>
    </SafeAreaView>
  );
};

export default roleplay;
