import React from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,

  View,
} from 'react-native';
import Register from './src/screens/Register'
import Home from './src/screens/Home';
import MainStackNavigation from './Navigation/mainStackNavigation';
export default function App() {
  return <MainStackNavigation />;

 
};