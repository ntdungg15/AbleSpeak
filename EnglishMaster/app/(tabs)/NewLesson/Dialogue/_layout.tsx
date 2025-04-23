import { Tabs } from "expo-router";

export default function Layout() {
  return (
    <Tabs>

       <Tabs.Screen
        name="Dialogue"
        options={{
          tabBarStyle: { display: 'none' }, 
          headerShown: false, 
        }}
      />
    </Tabs>
  );
}