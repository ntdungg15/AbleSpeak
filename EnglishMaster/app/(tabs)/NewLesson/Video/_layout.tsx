import { Tabs } from "expo-router";
import { Ionicons, MaterialIcons, FontAwesome5 } from '@expo/vector-icons';

export default function Layout() {
  return (
    <Tabs
      screenOptions={{
        tabBarStyle: { display: 'none' },
      }}
    >
      <Tabs.Screen
        name="Video_Illustration"
        options={{
          title: "Video/Illustrations",
          headerTitle: "Video/Illustrations",
          // tabBarIcon: ({ color }) => <Ionicons name="home" size={24} color={color} />,
          headerShown: false,

        }}
      />
      
      <Tabs.Screen
        name="IllustrationVideos"
        options={{
          title: "Illustration Videos",
          headerTitle: "🎬 Illustration Videos",
          // tabBarIcon: ({ color }) => <Ionicons name="videocam" size={24} color={color} />,
          headerShown: false,


        }}
      />
      
      <Tabs.Screen
        name="InteractiveIllustrations"
        options={{
          title: "Interactive",
          headerTitle: "🖌 Interactive Illustrations",
          // tabBarIcon: ({ color }) => <MaterialIcons name="touch-app" size={24} color={color} />,
          headerShown: false,

        }}
      />
      
      <Tabs.Screen
        name="ShortStoryClips"
        options={{
          title: "Short Stories",
          headerTitle: "🎞 Short Story Clips",
          // tabBarIcon: ({ color }) => <FontAwesome5 name="film" size={24} color={color} />,
          headerShown: false,
        }}
      />
    </Tabs>
  );
}