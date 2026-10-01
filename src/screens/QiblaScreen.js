import React from 'react';
import { View, Text, SafeAreaView } from 'react-native';
import { styles } from '../styles/qiblaScreen.styles';

export const QiblaScreen = () => {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Kıble Pusulası</Text>
        <Text style={styles.subtitle}>Cihazınızı düz tutunuz</Text>
      </View>

      <View style={styles.compassContainer}>
        <Text style={styles.compassDegree}>164°</Text>
        <Text style={styles.compassSubtext}>Güneydoğu</Text>
      </View>

      <View style={styles.infoCard}>
        <Text style={styles.infoText}>
          Pusula hassasiyetini artırmak için telefonunuzu (8) çizecek şekilde havada hareket ettiriniz.
        </Text>
      </View>
    </SafeAreaView>
  );
};