import * as Notifications from 'expo-notifications';
import { Platform } from 'react-native';

// Web ortamındaysak bildirim handler'ını kurma (Web desteklemiyor)
if (Platform.OS !== 'web') {
  Notifications.setNotificationHandler({
    handleNotification: async () => ({
      shouldShowAlert: true,
      shouldPlaySound: true,
      shouldSetBadge: false,
    }),
  });
}

/**
 * Bildirim izinlerini ister.
 */
export const requestNotificationPermissions = async () => {
  if (Platform.OS === 'web') {
    console.log('Web platformunda expo-notifications desteklenmiyor.');
    return false;
  }

  if (Platform.OS === 'android') {
    await Notifications.setNotificationChannelAsync('prayer-notifications', {
      name: 'Namaz Vakti Bildirimleri',
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: '#0f382c',
    });
  }

  const { status: existingStatus } = await Notifications.getPermissionsAsync();
  let finalStatus = existingStatus;

  if (existingStatus !== 'granted') {
    const { status } = await Notifications.requestPermissionsAsync();
    finalStatus = status;
  }

  return finalStatus === 'granted';
};

/**
 * Anında test bildirimi gönderir (Web korumalı)
 */
export const sendInstantNotification = async (title, body) => {
  if (Platform.OS === 'web') {
    alert(`[Web Test Bildirimi]\n${title || '🔔 Test Bildirimi'}\n${body || 'Anlık bildirim çalışıyor!'}`);
    return;
  }

  try {
    const hasPermission = await requestNotificationPermissions();
    if (!hasPermission) return;

    await Notifications.scheduleNotificationAsync({
      content: {
        title: title || '🔔 Test Bildirimi',
        body: body || 'Anlık bildirim çalışıyor!',
        sound: true,
        channelId: 'prayer-notifications',
      },
      trigger: null,
    });
  } catch (error) {
    console.error('Anlık bildirim hatası:', error);
  }
};

/**
 * Zamanlanmış Test Bildirimi (Web korumalı)
 */
export const scheduleTestNotification = async (seconds = 5) => {
  if (Platform.OS === 'web') {
    alert(`[Web Bildirim Simülasyonu] ${seconds} saniye sonra bildirim tetiklendi!`);
    return;
  }

  try {
    const hasPermission = await requestNotificationPermissions();
    if (!hasPermission) return;

    await Notifications.scheduleNotificationAsync({
      content: {
        title: '🔔 Test Bildirimi',
        body: `${seconds} saniye sonraki test bildirimi başarıyla çalıştı!`,
        sound: true,
        channelId: 'prayer-notifications',
      },
      trigger: {
        seconds: seconds,
      },
    });
  } catch (error) {
    console.error('Test bildirimi hatası:', error);
  }
};

/**
 * Namaz Vakti Bildirimi (Web korumalı)
 */
export const schedulePrayerNotification = async (prayerName, prayerTimeDate) => {
  if (Platform.OS === 'web') return;

  try {
    const hasPermission = await requestNotificationPermissions();
    if (!hasPermission) return;

    const triggerTime = new Date(prayerTimeDate.getTime() - 5 * 60 * 1000);
    if (triggerTime <= new Date()) return;

    await Notifications.scheduleNotificationAsync({
      content: {
        title: '🕌 Namaz Vaktine Az Kaldı!',
        body: `${prayerName} vaktine 5 dakika kaldı. Hazırlığınızı yapabilirsiniz.`,
        sound: true,
        channelId: 'prayer-notifications',
        data: { prayerName },
      },
      trigger: {
        date: triggerTime,
      },
    });
  } catch (error) {
    console.error('Bildirim kurma hatası:', error);
  }
};

/**
 * Tüm Bildirimleri İptal Et
 */
export const cancelAllNotifications = async () => {
  if (Platform.OS === 'web') return;
  await Notifications.cancelAllScheduledNotificationsAsync();
};