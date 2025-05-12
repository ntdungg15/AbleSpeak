import React, { useState, useEffect } from "react";
import {
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  View,
  Image,
  TouchableOpacity,
  Dimensions,
  ImageBackground,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import Icon from "react-native-vector-icons/Ionicons";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import NewLesson from "../NewLesson/NewLesson";
import { styles } from "@/constants/home/Dashboard";
import { useSelector, useDispatch } from "react-redux";
import { useRouter } from "expo-router";
import LoginScreen from "@/components/profile/LoginComponent";

const Dashboard = () => {
  const [userName, setUserName] = useState("Minh");
  const [streakDays, setStreakDays] = useState(5);
  const [progress, setProgress] = useState(60);
  const user = useSelector((state: any) => state.user);
  const dispatch = useDispatch();
  const router = useRouter();

  useEffect(() => {
    console.log("User state changed:", user);
    if (user.isLoggedIn) {
      setUserName(user.userInfo?.name || "Bạn");
    }
  }, [user]);
  if (!user.isLoggedIn) {
    return <LoginScreen />; // Redirect to login screen if not logged in
  }
  const recentCourses = [
    {
      id: 1,
      title: "Business English",
      progress: 45,
      image: {
        uri: "https://res.cloudinary.com/dtz1pxv22/image/upload/v1746359563/Business_English_nnj356.jpg",
      },
    },
    {
      id: 2,
      title: "Daily Conversation",
      progress: 78,
      image: {
        uri: "https://res.cloudinary.com/dtz1pxv22/image/upload/v1746359968/dailay_ly8ghb.jpg",
      },
    },
  ];

  const dailyActivities = [
    {
      id: 1,
      title: "Learn new vocabulary",
      icon: "book",
      type: "FontAwesome",
      color: "#4F8EF7",
    },
    {
      id: 2,
      title: "Practice listening",
      icon: "headphones",
      type: "FontAwesome",
      color: "#4CD964",
    },
    {
      id: 3,
      title: "Speak 5 minutes",
      icon: "wechat",
      type: "FontAwesome",
      color: "#9C27B0",
    },
    {
      id: 4,
      title: "Study grammar",
      icon: "file-document-outline",
      type: "MaterialCommunityIcons",
      color: "#FF9500",
    },
  ];

  const lessonCategories = [
    {
      id: 1,
      title: "Vocabulary",
      description: "Learn pronunciation and meaning",
      icon: "book",
      color: "#4F8EF7",
      bgColor: "#E3F2FD",
      image: { uri: "https://your-cdn.com/images/vocabulary.png" },
    },
    {
      id: 2,
      title: "Grammar",
      description: "Master grammar rules",
      icon: "pencil",
      color: "#FB8C00",
      bgColor: "#FFF3E0",
      image: { uri: "https://your-cdn.com/images/grammar.png" },
    },
    {
      id: 3,
      title: "Speaking",
      description: "Practice speaking skills",
      icon: "microphone",
      color: "#7CB342",
      bgColor: "#F1F8E9",
      image: { uri: "https://your-cdn.com/images/speaking.png" },
    },
    {
      id: 4,
      title: "Listening",
      description: "Improve listening skills",
      icon: "headphones",
      color: "#7B1FA2",
      bgColor: "#F3E5F5",
      image: { uri: "https://your-cdn.com/images/listening.png" },
    },
  ];

  const renderDynamicIcon = (
    iconName: any,
    type: any,
    color: any,
    size = 24
  ) => {
    if (type === "FontAwesome") {
      return <FontAwesome name={iconName} size={size} color={color} />;
    } else if (type === "MaterialCommunityIcons") {
      return (
        <MaterialCommunityIcons name={iconName} size={size} color={color} />
      );
    }
    return <Icon name={iconName} size={size} color={color} />;
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        {/* Header Section */}
        <View style={styles.header}>
          <View style={styles.userInfo}>
            <View style={styles.avatarContainer}>
              <Text style={styles.avatarText}>
                {userName.charAt(0).toUpperCase()}
              </Text>
            </View>
            <View>
              <Text style={styles.greeting}>Hello, {userName}!</Text>
              <Text style={styles.subGreeting}>
                What do you want to learn today?
              </Text>
            </View>
          </View>
          <View style={styles.headerIcons}>
            <TouchableOpacity style={styles.iconContainer}>
              <Icon name="notifications" size={24} color="#333" />
              <View style={styles.badge}>
                <Text style={styles.badgeText}>2</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity style={styles.iconContainer}>
              <Icon name="settings-outline" size={24} color="#333" />
            </TouchableOpacity>
          </View>
        </View>

        {/* Streak and Progress Section */}
        <View style={styles.streakContainer}>
          <View style={styles.streakItem}>
            <View
              style={[styles.iconBackground, { backgroundColor: "#FFF3E0" }]}
            >
              <Icon name="flash" size={24} color="#FF9800" />
            </View>
            <View>
              <Text style={styles.streakTitle}>Streak</Text>
              <Text style={styles.streakValue}>{streakDays} days</Text>
            </View>
          </View>
          <View style={styles.separator} />
          <View style={styles.streakItem}>
            <View
              style={[styles.iconBackground, { backgroundColor: "#E1F5FE" }]}
            >
              <Icon name="bar-chart" size={24} color="#03A9F4" />
            </View>
            <View>
              <Text style={styles.streakTitle}>Progress</Text>
              <Text style={styles.streakValue}>{progress}%</Text>
            </View>
          </View>
        </View>
        <NewLesson />
        {/* Continue Learning Section */}
        <View style={styles.sectionContainer}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Continue learning</Text>
            <TouchableOpacity>
              <Text style={styles.seeAll}>See all</Text>
            </TouchableOpacity>
          </View>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {recentCourses.map((course) => (
              <TouchableOpacity key={course.id} style={styles.courseCard}>
                <Image source={course.image} style={styles.courseImage} />
                <View style={styles.courseInfo}>
                  <Text style={styles.courseTitle}>{course.title}</Text>
                  <View style={styles.progressBarContainer}>
                    <View
                      style={[
                        styles.progressBar,
                        { width: `${course.progress}%` },
                      ]}
                    />
                  </View>
                  <Text style={styles.progressText}>
                    {course.progress}% completed
                  </Text>
                </View>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        {/* Daily Activities */}
        <View style={styles.sectionContainer}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Daily activities</Text>
          </View>
          <View style={styles.activitiesContainer}>
            {dailyActivities.map((activity) => (
              <TouchableOpacity key={activity.id} style={styles.activityItem}>
                <View
                  style={[
                    styles.activityIconContainer,
                    { backgroundColor: activity.color },
                  ]}
                >
                  {renderDynamicIcon(activity.icon, activity.type, "#FFF")}
                </View>
                <Text style={styles.activityTitle}>{activity.title}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Learning Categories */}
        {/* <View style={styles.sectionContainer}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>New lesson</Text>
          </View>
          <View style={styles.categoriesContainer}>
            {lessonCategories.map((category) => (
              <TouchableOpacity key={category.id} style={styles.categoryCard}>
                <View style={styles.categoryContent}>
                  <View
                    style={[
                      styles.categoryIconContainer,
                      { backgroundColor: category.bgColor },
                    ]}
                  >
                    <Icon
                      name={category.icon}
                      size={26}
                      color={category.color}
                    />
                  </View>
                  <Text style={styles.categoryTitle}>{category.title}</Text>
                  <Text style={styles.categoryDescription}>
                    {category.description}
                  </Text>
                </View>
                <Image source={category.image} style={styles.categoryImage} />
              </TouchableOpacity>
            ))}
          </View>
        </View> */}

        {/* Achievement Section */}
        <TouchableOpacity style={styles.achievementContainer}>
          <LinearGradient
            colors={["#4F8EF7", "#3b5998"]}
            style={styles.achievementGradient}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
          >
            <View style={styles.achievementContent}>
              <View style={styles.achievementIconContainer}>
                <Icon name="trophy" size={32} color="#FFD700" />
              </View>
              <View style={styles.achievementTextContainer}>
                <Text style={styles.achievementTitle}>Weekly challenge</Text>
                <Text style={styles.achievementDescription}>
                  Learn 7 days in a row to earn a badge
                </Text>
              </View>
            </View>
            <Icon name="chevron-forward" size={24} color="#FFF" />
          </LinearGradient>
        </TouchableOpacity>

        {/* Spacing at the bottom */}
        <View style={{ height: 20 }} />
      </ScrollView>
    </SafeAreaView>
  );
};

export default Dashboard;
