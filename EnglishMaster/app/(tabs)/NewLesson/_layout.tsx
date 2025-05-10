import { Tabs } from "expo-router";

export default function Layout() {
  return (
    <Tabs>
      <Tabs.Screen
        name="NewLesson"
        options={{
          tabBarStyle: { display: 'none' },
        }}
      />
       <Tabs.Screen
        name="Vocabulary"
        options={{
          tabBarStyle: { display: 'none' }, 
          headerShown: false, 
        }}
      />
      <Tabs.Screen
        name="Grammar"
        options={{
          tabBarStyle: { display: 'none' }, 
          headerShown: false, 
        }}
      />
      <Tabs.Screen
        name="Dialogue"
        options={{
          tabBarStyle: { display: 'none' }, 
          // headerShown: false, 
        }}
      />
      <Tabs.Screen
        name="Video"
        options={{
          tabBarStyle: { display: 'none' }, 
          headerShown: false, 
        }}
      />
    </Tabs>
  );
}