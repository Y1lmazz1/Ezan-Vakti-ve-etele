# 🕌 Ezan Vakti ve Çetele

Konum tabanlı anlık ezan vakti bildirimleri sağlayan ve kişisel ibadet takibini (çetele) kolaylaştıran modern bir mobil uygulama.

---

## 📌 Öne Çıkan Özellikler

* **Konum Tabanlı Otomatik Şehir Tespiti:** Bulunduğunuz ili/konumu otomatik tespit ederek o konuma özel anlık ezan vakitlerini sunar.
* **Anlık Bildirim Sistemi:** Ezan vakitleri yaklaştığında ve vakit girdiğinde anlık bildirimler gönderir.
* **Gelişmiş İbadet Çetelesi:** Günlük namaz ve ibadet takibinizi pratik bir şekilde kaydetmenizi ve takip etmenizi sağlar.
* **Sade ve Odaklı Arayüz:** Gereksiz ikonlardan arındırılmış, minimal ve göz yormayan tasarım.
* **Kıble Doğrultusu:** Kabe simgeleri ve karmaşık görseller yerine sadece net ve anlaşılır bir yön oku ile kıble yönü gösterimi.

---

## 🚀 Kurulum ve Geliştirme Ortamı

Bu projeyi yerel ortamınızda çalıştırmak ve derlemek (APK almak) için aşağıdaki adımları izleyebilirsiniz.

### Gereksinimler

* **Node.js** (v18 veya üzeri)
* **Android Studio** (Android SDK ve Öykünücü/Emulator yönetimi için)
* **Java Development Kit (JDK 17)**

### 1. Android Studio Kurulumu ve Hazırlık

1. [Android Studio Resmi Sayfası](https://developer.android.com/studio) üzerinden indirin ve kurun.
2. Kurulum esnasında **Android SDK**, **Android SDK Platform-Tools** ve **Android Virtual Device (AVD)** seçeneklerinin seçili olduğundan emin olun.
3. Android Studio'yu açıp `SDK Manager` üzerinden gerekli olan Android API sürümünü (önerilen: Android 13/14) yükleyin.
4. Çevre değişkenlerine (`Environment Variables`) `ANDROID_HOME` yolunu ekleyin:
   * **Path:** `C:\Users\<Kullanıcı_Adı>\AppData\Local\Android\Sdk`

### 2. Projeyi Çalıştırma

Proje klasörüne terminal üzerinden erişip bağımlılıkları yükleyin:

```bash
# Bağımlılıkları yükleyin
npm install

# Android projesini hazırlayın / çalıştırın
npx expo run:android
# veya
npx react-native run-android
