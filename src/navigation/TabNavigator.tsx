import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import DirectoryScreen from '../screens/DirectoryScreen';
import MessageListScreen from '../screens/MessageListScreen';
import Ionicons from '@expo/vector-icons/Ionicons';

const Tab = createBottomTabNavigator();

const TabNavigator = () => (
  <Tab.Navigator
    screenOptions={({ route }) => ({
      headerShown: true,
      tabBarIcon: ({ color, size }) => {
        const iconName = route.name === 'Home' ? 'home-outline' : 'chatbubble-ellipses-outline';
        return <Ionicons name={iconName} size={22} color={color} />;
      },
      tabBarShowLabel: true,
    })}
  >
    <Tab.Screen name="Home" component={DirectoryScreen} />
    <Tab.Screen
      name="Messages"
      component={MessageListScreen}
      options={{ tabBarButton: () => null }} // Hide tab button
    />
  </Tab.Navigator>
);

export default TabNavigator;
