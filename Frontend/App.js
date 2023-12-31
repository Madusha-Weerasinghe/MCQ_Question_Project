import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import Question from './Screens/Question';
import React from "react";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
   
    <GestureHandlerRootView style={{ flex: 1 }}>
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Question"
        screenOptions={{ headerShown: false }}
      >
        <Stack.Screen name="Question" component={Question} />
       

      </Stack.Navigator>
    </NavigationContainer>
    {/* <Toast /> */}
  </GestureHandlerRootView>

  );
}



