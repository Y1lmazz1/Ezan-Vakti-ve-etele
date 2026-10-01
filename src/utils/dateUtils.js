import dayjs from 'dayjs';
import 'dayjs/locale/tr';

dayjs.locale('tr');

// Bugünün Miladi ve Hicri tarih bilgilerini metin olarak döndürür
export const getFormattedDates = (date = new Date()) => {
  const currentDate = dayjs(date);

  // Örn: "1 Ekim 2026, Perşembe"
  const miladiTarih = currentDate.format('D MMMM YYYY, dddd');

  // Hicri Tarih (Örn: "19 Rebiülevvel 1448")
  let hicriTarih = '';
  try {
    const formatter = new Intl.DateTimeFormat('tr-TN-u-ca-islamic-umalqura', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    });
    hicriTarih = formatter.format(date);
  } catch (error) {
    hicriTarih = '';
  }

  return {
    miladiTarih,
    hicriTarih,
  };
};