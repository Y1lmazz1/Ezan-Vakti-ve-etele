// Diyanet takvim verilerini koordinat (enlem/boylam) bazlı sunan API endpoint'i
export const PRAYER_API_BASE_URL = 'https://api.aladhan.com/v1';

// Alternatif / doğrudan Diyanet vakitleri API veya yerel veritabanı ayarları
export const PRAYER_NAMES = {
  Fajr: 'İmsak',
  Sunrise: 'Güneş',
  Dhuhr: 'Öğle',
  Asr: 'İkindi',
  Maghrib: 'Akşam',
  Isha: 'Yatsı',
};

export const NOTIFICATION_BEFORE_MINUTES = 5; // 5 dakika kala bildirim