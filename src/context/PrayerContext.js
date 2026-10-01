import React, { createContext, useContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Location from 'expo-location';

const PrayerContext = createContext();

export const PrayerProvider = ({ children }) => {
  const [appStartDate, setAppStartDate] = useState(null);
  const [prayerLogs, setPrayerLogs] = useState({});
  const [location, setLocation] = useState(null);
  const [locationLoading, setLocationLoading] = useState(true);
  const [locationError, setLocationError] = useState(null);

  const [prayerTimesData, setPrayerTimesData] = useState(null);
  const [apiLoading, setApiLoading] = useState(true);
  const [apiError, setApiError] = useState(null);

  const [nextPrayer, setNextPrayer] = useState(null);
  const [timeRemaining, setTimeRemaining] = useState({ hours: 0, minutes: 0, seconds: 0 });
  const [passedPrayers, setPassedPrayers] = useState([]);

  // 1. Uygulama İlklendirmesi
  useEffect(() => {
    const initializeApp = async () => {
      try {
        let startDate = await AsyncStorage.getItem('app_start_date');
        if (!startDate) {
          startDate = new Date().toISOString().split('T')[0];
          await AsyncStorage.setItem('app_start_date', startDate);
        }
        setAppStartDate(startDate);

        const savedLogs = await AsyncStorage.getItem('prayer_logs');
        if (savedLogs) {
          setPrayerLogs(JSON.parse(savedLogs));
        }
      } catch (e) {
        console.error('App initialization error:', e);
      }
    };

    initializeApp();
    getUserLocation();
  }, []);

  // 2. Gelişmiş Konum Alma (Web & Mobil Uyumlu)
  const getUserLocation = async () => {
    setLocationLoading(true);
    setLocationError(null);

    try {
      // Adım A: Cihaz Konumu İsteği
      const { status } = await Location.requestForegroundPermissionsAsync();
      
      if (status === 'granted') {
        const userLocation = await Location.getCurrentPositionAsync({
          accuracy: Location.Accuracy.Balanced,
        });

        const lat = userLocation.coords.latitude;
        const lng = userLocation.coords.longitude;

        let cityName = null;

        try {
          const geocode = await Location.reverseGeocodeAsync({ latitude: lat, longitude: lng });
          if (geocode && geocode.length > 0) {
            cityName = geocode[0].city || geocode[0].subregion || geocode[0].region || geocode[0].district;
          }
        } catch (e) {
          console.log('Reverse geocode hatası, IP servisine geçiliyor:', e);
        }

        // Eğer reverseGeocode şehir ismi getiremediyse IP API'den şehri sorgula
        if (!cityName) {
          cityName = await fetchCityFromIP(lat, lng);
        }

        const finalCity = cityName || 'İstanbul';

        const locData = { latitude: lat, longitude: lng, city: finalCity };
        setLocation(locData);
        fetchPrayerTimes(lat, lng);
        return;
      }
    } catch (error) {
      console.log('Cihaz konum hatası:', error);
    }

    // Adım B: İzin verilmediyse veya cihaz konumu başarısız olduysa IP tabanlı konum al
    try {
      const ipRes = await fetch('https://ipapi.co/json/');
      const ipData = await ipRes.json();

      if (ipData && ipData.latitude && ipData.longitude) {
        const locData = {
          latitude: ipData.latitude,
          longitude: ipData.longitude,
          city: ipData.city || 'İstanbul',
        };
        setLocation(locData);
        fetchPrayerTimes(locData.latitude, locData.longitude);
        return;
      }
    } catch (ipError) {
      console.log('IP tabanlı konum alma hatası:', ipError);
    }

    // Adım C: Tüm yöntemler başarısız olursa Varsayılan Konum (İstanbul)
    const fallbackLocation = {
      latitude: 41.0082,
      longitude: 28.9784,
      city: 'İstanbul',
    };
    setLocation(fallbackLocation);
    fetchPrayerTimes(fallbackLocation.latitude, fallbackLocation.longitude);
  };

  // Yardımcı IP Şehir Sorgusu
  const fetchCityFromIP = async (lat, lng) => {
    try {
      const res = await fetch(`https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${lat}&longitude=${lng}&localityLanguage=tr`);
      const data = await res.json();
      return data.city || data.locality || data.principalSubdivision;
    } catch (err) {
      return null;
    }
  };

  // 3. Namaz Vakitlerini API'den Çekme
  const fetchPrayerTimes = async (latitude, longitude) => {
    setApiLoading(true);
    setApiError(null);
    try {
      const response = await fetch(
        `https://api.aladhan.com/v1/timings?latitude=${latitude}&longitude=${longitude}&method=13`
      );
      const data = await response.json();

      if (data.code === 200) {
        setPrayerTimesData(data.data);
      } else {
        setApiError('Namaz vakitleri alınamadı.');
      }
    } catch (error) {
      setApiError('Namaz vakitleri çekilirken bağlantı hatası oluştu.');
    } finally {
      setApiLoading(false);
      setLocationLoading(false);
    }
  };

  // 4. Sıradaki Vakit ve Geçen Namazların Hesabı
  useEffect(() => {
    if (!prayerTimesData?.timings) return;

    const calculateTimes = () => {
      const timings = prayerTimesData.timings;
      const now = new Date();

      const prayerNamesMap = {
        Fajr: 'İmsak / Sabah',
        Dhuhr: 'Öğle',
        Asr: 'İkindi',
        Maghrib: 'Akşam',
        Isha: 'Yatsı',
      };

      const keys = ['Fajr', 'Dhuhr', 'Asr', 'Maghrib', 'Isha'];
      const currentPassed = [];
      let next = null;

      for (let key of keys) {
        const timeStr = timings[key];
        const [hours, minutes] = timeStr.split(':').map(Number);
        const prayerDate = new Date();
        prayerDate.setHours(hours, minutes, 0, 0);

        if (now >= prayerDate) {
          currentPassed.push({ key, name: prayerNamesMap[key], time: timeStr });
        } else if (!next) {
          next = { key, name: prayerNamesMap[key], time: timeStr, date: prayerDate };
        }
      }

      if (!next) {
        const [hours, minutes] = timings['Fajr'].split(':').map(Number);
        const tomorrowFajr = new Date();
        tomorrowFajr.setDate(tomorrowFajr.getDate() + 1);
        tomorrowFajr.setHours(hours, minutes, 0, 0);
        next = { key: 'Fajr', name: 'İmsak / Sabah', time: timings['Fajr'], date: tomorrowFajr };
      }

      setPassedPrayers(currentPassed);
      setNextPrayer(next);

      const diffMs = next.date - now;
      if (diffMs > 0) {
        const hours = Math.floor(diffMs / (1000 * 60 * 60));
        const minutes = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((diffMs % (1000 * 60)) / 1000);
        setTimeRemaining({ hours, minutes, seconds });
      }
    };

    calculateTimes();
    const interval = setInterval(calculateTimes, 1000);
    return () => clearInterval(interval);
  }, [prayerTimesData]);

  // 5. Çetele İşaretleme Fonksiyonu
  const togglePrayer = async (prayerKey, dateStr = null) => {
    const targetDate = dateStr || new Date().toISOString().split('T')[0];
    const fullKey = `${targetDate}_${prayerKey}`;

    const updatedLogs = {
      ...prayerLogs,
      [fullKey]: !prayerLogs[fullKey],
    };

    setPrayerLogs(updatedLogs);
    await AsyncStorage.setItem('prayer_logs', JSON.stringify(updatedLogs));
  };

  return (
    <PrayerContext.Provider
      value={{
        appStartDate,
        prayerLogs,
        togglePrayer,
        location,
        locationLoading,
        locationError,
        refreshLocation: getUserLocation,
        prayerTimesData,
        apiLoading,
        apiError,
        nextPrayer,
        timeRemaining,
        passedPrayers,
      }}
    >
      {children}
    </PrayerContext.Provider>
  );
};

export const usePrayer = () => useContext(PrayerContext);