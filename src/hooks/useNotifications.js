import * as Notifications from 'expo-notifications';
import { Platform } from 'react-native';

// Bildirimlerin uygulama açıkken nasıl görüneceği ayarı
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
  }),
});

/**
 * Bildirim izinlerini ister ve Android bildirim kanalını oluşturur.
 */
export const requestNotificationPermissions = async () => {
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
 * Belirli bir namaz vaktine 5 dakika kala bildirim planlar.
 * @param {string} prayerName - Namaz vaktinin adı (Örn: Öğle)
 * @param {Date} prayerTimeDate - Namaz vaktinin JS Date objesi
 */
export const schedulePrayerNotification = async (prayerName, prayerTimeDate) => {
  try {
    const hasPermission = await requestNotificationPermissions();
    if (!hasPermission) return;

    // Vaktin 5 dakika öncesini hesapla
    const triggerTime = new Date(prayerTimeDate.getTime() - 5 * 60 * 1000);

    // Eğer 5 dakika öncesi geçmiş bir zamandaysa bildirim kurma
    if (triggerTime <= new Date()) {
      return;
    }

    await Notifications.scheduleNotificationAsync({
      content: {
        title: '🕌 Namaz Vaktine Az Kaldı!',
        body: `${prayerName} vaktine 5 dakika kaldı. Hazırlığınızı yapabilirsiniz.`,
        sound: true,
        channelId: 'prayer-notifications', // Android için kanal yönlendirmesi
        data: { prayerName },
      },
      trigger: {
        date: triggerTime, // Date nesnesini obje içinde geçmek Expo SDK standartlarındandır
      },
    });

    console.log(`${prayerName} için bildirim kuruldu:`, triggerTime.toLocaleTimeString());
  } catch (error) {
    console.error('Bildirim kurma hatası:', error);
  }
};

/**
 * TEST İÇİN: 5 Saniye Sonrasına Test Bildirimi Kurar
 */
export const scheduleTestNotification = async (seconds = 5) => {
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
 * Tüm planlanmış yerel bildirimleri iptal eder.
 */
export const cancelAllNotifications = async () => {
  await Notifications.cancelAllScheduledNotificationsAsync();
};
/**
 * Anında test bildirimi gönderir
 */
export const sendInstantNotification = async (title, body) => {
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
      trigger: null, // null anında tetikler
    });
  } catch (error) {
    console.error('Anlık bildirim hatası:', error);
  }
};