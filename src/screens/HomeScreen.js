import React from 'react';
import { Text, View, TouchableOpacity, ScrollView, ActivityIndicator } from 'react-native';
import { usePrayer } from '../context/PrayerContext';
import { PrayerCard } from '../components/PrayerCard';
import { styles } from '../styles/homeScreen.styles';
// Bildirim servisini içe aktarın
import { sendInstantNotification, scheduleTestNotification } from '../services/notificationService';

export const HomeScreen = () => {
  const {
    location,
    locationLoading,
    locationError,
    refreshLocation,
    apiLoading,
    apiError,
    nextPrayer,
    timeRemaining = { hours: 0, minutes: 0, seconds: 0 },
    passedPrayers = [],
    prayerLogs = {},
    togglePrayer,
    prayerTimesData,
  } = usePrayer();

  const todayStr = new Date().toISOString().split('T')[0];

  if (locationLoading || apiLoading) {
    return (
      <View style={styles.centerContainer}>
        <ActivityIndicator size="large" color="#0f382c" />
        <Text style={styles.loadingText}>Yükleniyor...</Text>
      </View>
    );
  }

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      {/* 1. Üst Konum Bilgisi */}
      <View style={styles.card}>
        <Text style={styles.cardTitle}>📍 {location?.city || 'İstanbul'}</Text>
        <Text style={styles.cardSubText}>📅 {prayerTimesData?.date?.readable}</Text>
      </View>

      {/* 2. Sıradaki Vakit Kartı */}
      <View style={[styles.card, styles.highlightCard]}>
        <Text style={styles.cardTitleLight}>⏳ Sıradaki Namaz Vakti</Text>
        {nextPrayer && (
          <>
            <Text style={styles.nextPrayerName}>
              {nextPrayer.name} - {nextPrayer.time}
            </Text>
            <Text style={styles.timerText}>
              {String(timeRemaining.hours).padStart(2, '0')}:
              {String(timeRemaining.minutes).padStart(2, '0')}:
              {String(timeRemaining.seconds).padStart(2, '0')}
            </Text>
          </>
        )}
      </View>

      {/* 3. BİLDİRİM TEST ALANI */}
      <View style={styles.card}>
        <Text style={styles.cardTitle}>🔔 Bildirim Testi</Text>
        
        <TouchableOpacity
          style={[styles.retryButton, { marginBottom: 8, backgroundColor: '#0f382c' }]}
          onPress={() => sendInstantNotification('🕌 Anlık Bildirim', 'Test bildirimi başarıyla alındı!')}
        >
          <Text style={styles.retryButtonText}>Anında Bildirim Gönder</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.retryButton, { backgroundColor: '#2e7d32' }]}
          onPress={() => {
            scheduleTestNotification(5);
            alert('5 saniye sonra bildirim gelecek. Uygulamayı arka plana alıp test edebilirsiniz.');
          }}
        >
          <Text style={styles.retryButtonText}>5 Saniye Sonrasına Bildirim Kur</Text>
        </TouchableOpacity>
      </View>

      {/* 4. Bugünkü Çetele */}
      <View style={styles.card}>
        <Text style={styles.cardTitle}>✅ Bugünkü Kılınma Çetelesi</Text>
        {passedPrayers.length === 0 ? (
          <Text style={styles.emptyText}>Henüz vakti geçen namaz bulunmuyor.</Text>
        ) : (
          <View style={styles.timesList}>
            {passedPrayers.map((prayer) => (
              <PrayerCard
                key={prayer.key}
                prayer={prayer}
                isCompleted={!!prayerLogs[`${todayStr}_${prayer.key}`]}
                onToggle={(key) => togglePrayer(key, todayStr)}
              />
            ))}
          </View>
        )}
      </View>
    </ScrollView>
  );
};