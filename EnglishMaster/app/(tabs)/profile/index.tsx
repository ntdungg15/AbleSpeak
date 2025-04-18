// index.tsx
import React from "react";
import {
  SafeAreaView,
  Text,
  Image,
  View,
  ScrollView,
  Pressable,
  Button,
} from "react-native";
import { useRouter } from "expo-router";
import { useDispatch, useSelector } from "react-redux";
import { FontAwesome } from "@expo/vector-icons";
import LoginScreen from "./login";

export default function ProfileScreen() {
  const user = useSelector((state) => state.user);
  // console.log(user.userInfo);
  const router = useRouter();

  return (
    (!user.isLoggedIn && <LoginScreen />) || (
      <SafeAreaView>
        <ScrollView showsVerticalScrollIndicator={false}>
          <View >
            <Image
              source={{
                uri: "https://www.iconpacks.net/icons/1/free-user-icon-295-thumb.png",
              }}
           
            />
            <Text>
              Hello, {user.userInfo.fullName}!
            </Text>

            <Pressable onPress={() => router.push("/(tabs)/profile/setting")}>
              <FontAwesome name="cog" size={24} color="black" />
            </Pressable>
          </View>

          <View >
            <View >
              <Text>Collecting Points {10}P</Text>
            </View>
            <View >
              <Text>Voucher : {1} available </Text>
            </View>
          </View>

          <View>
            <View >
              <Text>Orders : 10P</Text>
            </View>

            <View  />

            <View>
              <Text>Favorite : 1 items</Text>
            </View>
          </View>

          <Text>Recently viewed</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {[1, 2, 3, 4, 5].map((item, index) => (
              <Image
                key={index}
                source={{ uri: "" }}
              />
            ))}
          </ScrollView>

          <Text >My Orders</Text>
          <View >
            <Pressable >
              <Text>To Pay</Text>
            </Pressable>
            <Pressable >
              <Text>To Receive</Text>
            </Pressable>
            <Pressable >
              <Text>To Review</Text>
            </Pressable>
          </View>

          <Text >Stories</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {[1, 2, 3].map((item, index) => (
              <View key={index} >
                <Image source={{ uri: "" }}  />
              </View>
            ))}
          </ScrollView>
        </ScrollView>
      </SafeAreaView>
    )
  );
}
