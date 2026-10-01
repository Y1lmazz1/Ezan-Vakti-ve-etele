import { useState, useEffect } from 'react';
import { Platform } from 'react-native';
import * as Location from 'expo-location';

export const useLocation = () => {
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const [loading, setLoading] = useState(true);

  // Koordinatlardan Şehir, İlçe ve Ülke bilgisini çözen yardımcı fonksiyon
  const fetchAddressDetails = async (latitude, longitude) => {
    try {
      // 1. Önce OpenStreetMap Nominatim API ile dene (Web ve Mobil Uyumlu)
      const response = await fetch(
        `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${latitude}&lon=${longitude}&accept-language=tr`,
        {
          headers: {
            'User-Agent': 'EzanVaktiApp/1.0',
          },
        }
      );

      if (response.ok) {
        const data = await response.json();
        const address = data.address || {};

        const city = address.province || address.city || address.state || address.region || '';
        const district = address.district || address.town || address.suburb || address.county || '';
        const country = address.country || '';

        const formattedLocation = [district, city, country].filter(Boolean).join(', ');

        if (formattedLocation) {
          return {
            city: city || 'Bilinmeyen Şehir',
            district,
            country,
            formattedLocation,
          };
        }
      }

      // 2. Yedek Yöntem: Mobil ortamda Expo Location Reverse Geocode
      if (Platform.OS !== 'web') {
        const reverseGeocode = await Location.reverseGeocodeAsync({ latitude, longitude });
        if (reverseGeocode && reverseGeocode.length > 0) {
          const place = reverseGeocode[0];
          const city = place.region || place.city || '';
          const district = place.subdistrict || place.district || place.street || '';
          const country = place.country || '';
          const formattedLocation = [district, city, country].filter(Boolean).join(', ');

          return {
            city: city || 'Bilinmeyen Şehir',
            district,
            country,
            formattedLocation: formattedLocation || 'Bilinmeyen Konum',
          };
        }
      }
    } catch (error) {
      console.error('Adres çözünürken hata oluştu:', error);
    }

    return {
      city: 'Bilinmeyen Şehir',
      district: '',
      country: '',
      formattedLocation: 'Bilinmeyen Konum',
    };
  };

  const getCurrentLocation = async () => {
    setLoading(true);
    try {
      // 1. Konum İzni İste
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Konum erişim izni reddedildi.');
        setLoading(false);
        return;
      }

      // 2. Anlık Konumu Al
      let userLocation = await Location.getCurrentPositionAsync({
        accuracy: Location.Accuracy.Balanced,
      });

      const { latitude, longitude } = userLocation.coords;

      // 3. Adres/Şehir/İlçe/Ülke Bilgilerini Getir
      const addressInfo = await fetchAddressDetails(latitude, longitude);

      setLocation({
        latitude,
        longitude,
        city: addressInfo.city,
        district: addressInfo.district,
        country: addressInfo.country,
        formattedLocation: addressInfo.formattedLocation, // Örn: "Battalgazi, Malatya, Türkiye"
      });

      setErrorMsg(null);
    } catch (error) {
      setErrorMsg('Konum alınırken bir hata oluştu: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getCurrentLocation();
  }, []);

  return { location, errorMsg, loading, refreshLocation: getCurrentLocation };
};