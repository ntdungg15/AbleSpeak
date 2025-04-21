import { Tabs } from "expo-router";

export default function Layout() {
  return (
    <Tabs>

       <Tabs.Screen
        name="Vocabulary"
        options={{
          tabBarStyle: { display: 'none' }, 
          headerShown: false, 
        }}
      />
    </Tabs>
  );
}