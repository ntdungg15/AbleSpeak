import { Tabs } from "expo-router";

export default function Layout() {
  return (
    <Tabs>
      <Tabs.Screen
        name="Dashboard"
        options={{
          tabBarStyle: { display: 'none' },
        }}
      />

    </Tabs>
  );
}