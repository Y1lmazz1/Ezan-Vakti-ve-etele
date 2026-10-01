import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { styles } from './styles/prayerCard.styles';

export const PrayerCard = ({ prayer, item, isCompleted, onToggle }) => {
  // Hem 'prayer' hem de 'item' prop tanımlarını güvenli şekilde yakalıyoruz
  const currentData = prayer || item || {};
  const { name, time, key } = currentData;

  return (
    <View style={styles.timeRowCard}>
      <View style={styles.timeInfo}>
        <Text style={styles.timeName}>{name || 'Vakit'}</Text>
        <Text style={styles.timeValue}>{time || '--:--'}</Text>
      </View>

      <TouchableOpacity
        style={[
          styles.checkButton,
          isCompleted ? styles.checkButtonCompleted : styles.checkButtonPending,
        ]}
        onPress={() => onToggle && onToggle(key)}
      >
        <Text
          style={[
            styles.checkButtonText,
            isCompleted && styles.checkButtonTextCompleted,
          ]}
        >
          {isCompleted ? '✓ Kılındı' : 'Kılınmadı (İşaretle)'}
        </Text>
      </TouchableOpacity>
    </View>
  );
};