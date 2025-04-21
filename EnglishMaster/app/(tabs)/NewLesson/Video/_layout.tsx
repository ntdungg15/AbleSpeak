import { Tabs } from "expo-router";

export default function Layout() {
  return (
    <Tabs>

       <Tabs.Screen
        name="Video_Illustration"
        options={{
          tabBarStyle: { display: 'none' }, 
          headerShown: false, 
        }}
      />
    </Tabs>
  );
}