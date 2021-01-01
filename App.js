import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { View } from 'react-native';
import MyHeader from './src/components/Header';
import Controls from './src/components/Controls';
import tailwind from 'tailwind-rn';

export default function App() {
  return (
    <View style={tailwind('container h-full')}>
      <MyHeader/>
      <Controls />
      <StatusBar style="auto" />
    </View>
  );
}
