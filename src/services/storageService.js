import AsyncStorage from '@react-native-async-storage/async-storage';
import dayjs from 'dayjs';

const PRAYER_LOGS_KEY_PREFIX = '@prayer_logs_';

/**
 * Belirtilen tarihe ait namaz çetelesini getirir.
 * Kayıt yoksa varsayılan olarak tüm vakitleri 'false' döner.
 * @param {string} dateStr - 'YYYY-MM-DD' formatında tarih (boşsa bugün)
 * @returns {Promise<Object>} Namaz kılınma durumları nesnesi
 */
export const getPrayerLogsByDate = async (dateStr = dayjs().format('YYYY-MM-DD')) => {
  try {
    const key = `${PRAYER_LOGS_KEY_PREFIX}${dateStr}`;
    const jsonValue = await AsyncStorage.getItem(key);

    if (jsonValue != null) {
      return JSON.parse(jsonValue);
    }

    // Varsayılan boş durum
    return {
      Fajr: false,    // Sabah / İmsak
      Dhuhr: false,   // Öğle
      Asr: false,     // İkindi
      Maghrib: false, // Akşam
      Isha: false,    // Yatsı
    };
  } catch (error) {
    console.error('Çetele okuma hatası:', error);
    return {
      Fajr: false,
      Dhuhr: false,
      Asr: false,
      Maghrib: false,
      Isha: false,
    };
  }
};

/**
 * Belirli bir tarihteki tek bir namaz vakti için kılınma durumunu günceller/değiştirir (Toggle).
 * @param {string} prayerKey - 'Fajr', 'Dhuhr', 'Asr', 'Maghrib', 'Isha'
 * @param {boolean} status - kılındı mı? (true / false)
 * @param {string} dateStr - 'YYYY-MM-DD' formatında tarih
 */
export const togglePrayerStatus = async (prayerKey, status, dateStr = dayjs().format('YYYY-MM-DD')) => {
  try {
    const currentLogs = await getPrayerLogsByDate(dateStr);
    const updatedLogs = {
      ...currentLogs,
      [prayerKey]: status,
    };

    const key = `${PRAYER_LOGS_KEY_PREFIX}${dateStr}`;
    await AsyncStorage.setItem(key, JSON.stringify(updatedLogs));

    return updatedLogs;
  } catch (error) {
    console.error('Çetele güncelleme hatası:', error);
    throw error;
  }
};

/**
 * Haftalık veya belirli bir gün aralığındaki tüm çetele geçmişini toplu olarak getirir.
 * @param {number} daysLimit - Kaç günlük geçmiş çekilecek (varsayılan 7)
 */
export const getPrayerHistory = async (daysLimit = 7) => {
  try {
    const history = {};
    for (let i = 0; i < daysLimit; i++) {
      const dateStr = dayjs().subtract(i, 'day').format('YYYY-MM-DD');
      history[dateStr] = await getPrayerLogsByDate(dateStr);
    }
    return history;
  } catch (error) {
    console.error('Geçmiş çetele okuma hatası:', error);
    return {};
  }
};