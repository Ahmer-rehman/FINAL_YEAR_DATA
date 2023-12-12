import React from 'react';
import {  StyleSheet, Text, View } from 'react-native';
import LoginScreen from './Components/Login';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import SignUpScreen from './Components/Signup';
import CameraScreen from './Components/Emotifyer';
import { updateProfile } from 'firebase/auth';
import Library from './Components/Library';
const Stack = createStackNavigator();

const App = () => {
  return (
    <>
    <NavigationContainer>
       <AuthStackNavigator/>
    </NavigationContainer>
    </>
  )
};

export default App
function AuthStackNavigator() {
  return (
<Stack.Navigator
 screenOptions={{
  headerShown: false, 
        }}
 >
 
 <Stack.Screen name="Signup" component={SignUpScreen} />
  <Stack.Screen  name="Login" component={LoginScreen} />
  
  </Stack.Navigator>

  );
};