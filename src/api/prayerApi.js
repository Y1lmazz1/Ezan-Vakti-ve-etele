import { PRAYER_API_BASE_URL } from '../config/constants';

/**
 * Anlık koordinat bilgisine göre o günkü namaz vakitlerini Diyanet metoduna göre getirir.
 * @param {number} latitude - Enlem
 * @param {number} longitude - Boylam
 * @returns {Promise<Object>} Namaz vakitleri nesnesi
 */
export const fetchPrayerTimesByCoords = async (latitude, longitude) => {
  try {
    // Aladhan API: method=13 Diyanet İşleri Başkanlığı hesaplama yöntemidir.
    const url = `${PRAYER_API_BASE_URL}/timings?latitude=${latitude}&longitude=${longitude}&method=13`;
    
    const response = await fetch(url);
    const result = await response.json();

    if (result.code === 200 && result.data) {
      const timings = result.data.timings;
      const meta = result.data.meta;
      const date = result.data.date;

      return {
        success: true,
        data: {
          timings: {
            Fajr: timings.Fajr,       // İmsak
            Sunrise: timings.Sunrise,   // Güneş
            Dhuhr: timings.Dhuhr,     // Öğle
            Asr: timings.Asr,         // İkindi
            Maghrib: timings.Maghrib, // Akşam
            Isha: timings.Isha,       // Yatsı
          },
          date: date.readable,
          timezone: meta.timezone,
        },
      };
    } else {
      throw new Error('Vakit bilgisi çekilemedi.');
    }
  } catch (error) {
    console.error('Prayer API Error:', error);
    return {
      success: false,
      error: error.message || 'Ağ hatası oluştu.',
    };
  }
};