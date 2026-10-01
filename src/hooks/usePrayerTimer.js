import { useState, useEffect } from 'react';
import dayjs from 'dayjs';
import duration from 'dayjs/plugin/duration';
import { PRAYER_NAMES } from '../config/constants';
import { schedulePrayerNotification, cancelAllNotifications } from '../services/notificationService';

dayjs.extend(duration);

export const usePrayerTimer = (timings) => {
  const [nextPrayer, setNextPrayer] = useState(null);
  const [timeRemaining, setTimeRemaining] = useState({ hours: 0, minutes: 0, seconds: 0, totalSeconds: 0 });
  const [passedPrayers, setPassedPrayers] = useState([]); // Geçmiş vakitler listesi (Çetele işaretlemesi için)

  useEffect(() => {
    if (!timings) return;

    const calculateTimer = async () => {
      const now = dayjs();
      const todayStr = now.format('YYYY-MM-DD');

      // Vakitleri sıralı nesne dizisine dönüştür
      const prayerOrder = ['Fajr', 'Sunrise', 'Dhuhr', 'Asr', 'Maghrib', 'Isha'];
      
      let upcoming = null;
      const passed = [];

      // Eski bildirimleri temizle, yeni vakitlere göre bildirim planlayacağız
      await cancelAllNotifications();

      for (let i = 0; i < prayerOrder.length; i++) {
        const key = prayerOrder[i];
        const timeStr = timings[key]; // "13:15" formatında
        const prayerDateTime = dayjs(`${todayStr} ${timeStr}`, 'YYYY-MM-DD HH:mm');

        if (prayerDateTime.isAfter(now)) {
          if (!upcoming) {
            upcoming = {
              key,
              name: PRAYER_NAMES[key] || key,
              time: timeStr,
              dateTime: prayerDateTime.toDate(),
            };
          }
          // Gelecek vakitler için 5 dk kala bildirim kur
          await schedulePrayerNotification(PRAYER_NAMES[key] || key, prayerDateTime.toDate());
        } else {
          // Vakti geçmiş namazlar
          passed.push({
            key,
            name: PRAYER_NAMES[key] || key,
            time: timeStr,
          });
        }
      }

      // Eğer bugünün tüm vakitleri geçtiyse, sıradaki vakit yarının İmsak (Fajr) vaktidir
      if (!upcoming) {
        const tomorrowStr = now.add(1, 'day').format('YYYY-MM-DD');
        const tomorrowFajr = dayjs(`${tomorrowStr} ${timings.Fajr}`, 'YYYY-MM-DD HH:mm');
        upcoming = {
          key: 'Fajr',
          name: PRAYER_NAMES.Fajr,
          time: timings.Fajr,
          dateTime: tomorrowFajr.toDate(),
        };
        await schedulePrayerNotification(PRAYER_NAMES.Fajr, tomorrowFajr.toDate());
      }

      setNextPrayer(upcoming);
      setPassedPrayers(passed);
    };

    calculateTimer();
  }, [timings]);

  // Her saniye geri sayımı güncelleyen döngü (Loop)
  useEffect(() => {
    if (!nextPrayer) return;

    const interval = setInterval(() => {
      const now = dayjs();
      const target = dayjs(nextPrayer.dateTime);
      const diffInSeconds = target.diff(now, 'second');

      if (diffInSeconds <= 0) {
        // Vakit doldu, zamanlayıcıyı yeniden hesaplatmak için tetikle
        clearInterval(interval);
        return;
      }

      const dur = dayjs.duration(diffInSeconds, 'seconds');
      setTimeRemaining({
        hours: dur.hours(),
        minutes: dur.minutes(),
        seconds: dur.seconds(),
        totalSeconds: diffInSeconds,
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [nextPrayer]);

  return { nextPrayer, timeRemaining, passedPrayers };
};