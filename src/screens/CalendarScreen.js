import React, { useState } from 'react';
import { View, Text, SafeAreaView, TouchableOpacity, ScrollView } from 'react-native';
import { usePrayer } from '../context/PrayerContext';
import { styles } from '../styles/calendarScreen.styles';

export const CalendarScreen = () => {
  const { prayerLogs } = usePrayer();
  // Varsayılan olarak bugünün tarihini YYYY-MM-DD formatında alalım
  const [selectedDate, setSelectedDate] = useState(
    new Date().toISOString().split('T')[0]
  );

  const prayersList = [
    { key: 'Fajr', name: 'İmsak / Sabah' },
    { key: 'Dhuhr', name: 'Öğle' },
    { key: 'Asr', name: 'İkindi' },
    { key: 'Maghrib', name: 'Akşam' },
    { key: 'Isha', name: 'Yatsı' },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>📅 Takvim & Geçmiş Çetele</Text>

      {/* Tarih Seçimi Kartı */}
      <View style={styles.datePickerContainer}>
        <Text style={styles.datePickerLabel}>Seçili Tarih:</Text>
        <Text style={styles.dateInput}>{selectedDate}</Text>
      </View>

      {/* Seçilen Günün Namaz Durumları */}
      <ScrollView style={styles.logsContainer}>
        <Text style={styles.sectionTitle}>{selectedDate} Tarihli Namazlar</Text>

        {prayersList.map((prayer) => {
          // Log anahtarının 'YYYY-MM-DD_Fajr' yapısında tutulduğunu varsayarsak:
          const logKey = `${selectedDate}_${prayer.key}`;
          const isCompleted = prayerLogs[logKey] || prayerLogs[prayer.key] || false;

          return (
            <View key={prayer.key} style={styles.logRow}>
              <Text style={styles.prayerName}>{prayer.name}</Text>
              <View
                style={[
                  styles.statusBadge,
                  isCompleted ? styles.statusCompleted : styles.statusPending,
                ]}
              >
                <Text
                  style={
                    isCompleted
                      ? styles.statusTextCompleted
                      : styles.statusTextPending
                  }
                >
                  {isCompleted ? '✓ Kılındı' : '✕ Kılınmadı'}
                </Text>
              </View>
            </View>
          );
        })}
      </ScrollView>
    </SafeAreaView>
  );
};