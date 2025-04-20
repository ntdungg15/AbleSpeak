import React, { useState } from "react";
import { View, StyleSheet, Text, Pressable, Image } from "react-native";
import { AntDesign } from "@expo/vector-icons";
type Props = {
  relationship: Relationship;
};
type Relationship = {
  Following: FriendOverview[];
  Followers: FriendOverview[];
};
type FriendOverview = {
  avtLink: string;
  name: string;
}

const FriendComponent = ({ relationship }: Props) => {
  const [activeTab, setActiveTab] = useState("Following");
  const following = relationship?.Following ?? [];
  const followers = relationship?.Followers ?? [];
  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <Text style={styles.header}>Friends</Text>
        <Pressable
          onPress={() => {
            console.log("Add Friends Pressed");
          }}
          style={{ padding: 10, position: "relative" }}
        >
          <AntDesign
            name="addusergroup"
            size={24}
            color="blue"
            style={{ position: "absolute", left: -13, top: 5 }}
          />
          <Text style={{ fontSize: 16, color: "#2196F3" }}>Add Friends</Text>
        </Pressable>
      </View>

      <View style={styles.separator} />
      <View style={styles.followType}>
        {["Following", "Followers"].map((tab) => (
          <Pressable
            key={tab}
            onPress={() => setActiveTab(tab)}
            style={styles.tabButton}
          >
            <Text
              style={[
                styles.tabText,
                activeTab === tab && styles.tabTextActive,
              ]}
            >
              {tab}
            </Text>
            {activeTab === tab && <View style={styles.underline} />}
          </Pressable>
        ))}
      </View>

      <View style={styles.friendList}>
        {activeTab === "Following" &&
          following.map((friend, index) => (
            <View key={index} style={{ marginBottom: 10 }}>
              <View style={styles.friendOverview}>
                <Image
                  source={{ uri: friend.avtLink }}
                  style={{ width: 40, height: 40, borderRadius: 20 }}
                />
                <Text style={{ fontSize: 16 }}>{friend.name}</Text>
              </View>
            </View>
          ))}
        {activeTab === "Followers" &&
          followers.map((friend, index) => (
            <View key={index} style={{ marginBottom: 10 }}>
              <View style={styles.friendOverview}>
                <Image
                  source={{ uri: friend.avtLink }}
                  style={{ width: 40, height: 40, borderRadius: 20 }}
                />
                <Text style={{ fontSize: 16 }}>{friend.name}</Text>
              </View>
            </View>
          ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#ccc",
  },
  headerContainer: {
    position: "relative",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  separator: {
    height: 3,
    backgroundColor: "#ccc",
    marginVertical: 10,
  },
  followType: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 20, // khoảng cách giữa các tab
  },
  tabButton: {
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  tabText: {
    fontSize: 20,
    fontWeight: "bold",
    color: "gray",
  },
  tabTextActive: {
    color: "#2196F3",
  },
  underline: {
    marginTop: 6,
    height: 4,
    width: "100%",
    backgroundColor: "#2196F3",
    borderRadius: 2,
  },
  header: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
    color: "blue",
  },
  friendList: {
    justifyContent: "space-between",
    marginTop: 20,
    paddingHorizontal: 10,
    position: "relative",
  },
  friendOverview: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: "#f2f2f2",
    borderRadius: 10,
    gap: 10,
  },
});

export default FriendComponent;
