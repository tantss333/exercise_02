import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import DirectoryScreen from './src/screens/DirectoryScreen';
import MessageListScreen from './src/screens/MessageListScreen';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Directory">
        <Stack.Screen name="Directory" component={DirectoryScreen} />
        <Stack.Screen name="Messages" component={MessageListScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
