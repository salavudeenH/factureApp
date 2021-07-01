import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import Home from "../HomeScreen";
import Notifications from "../NotificationsScreen";

const Stack = createStackNavigator();

const MainStackNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Home1" component={Home} />
      <Stack.Screen name="Notifications" component={Notifications} />
    </Stack.Navigator>
  );
}

export { MainStackNavigator };