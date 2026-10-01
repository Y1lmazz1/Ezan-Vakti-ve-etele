import React from 'react';
import { SafeAreaView, StatusBar, Text } from 'react-native';
import { PrayerProvider } from './src/context/PrayerContext';
import { HomeScreen } from './src/screens/HomeScreen';
import { styles } from './src/styles/app.styles';

export default function App() {
  return (
    <PrayerProvider>
      <SafeAreaView style={styles.container}>
        <StatusBar barStyle="dark-content" />
        <Text style={styles.headerTitle}>Namaz Vakti & Çetele Test Paneli</Text>
        <HomeScreen />
      </SafeAreaView>
    </PrayerProvider>
  );
}