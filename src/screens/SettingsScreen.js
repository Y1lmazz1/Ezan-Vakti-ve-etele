import React from 'react';
import { View, Text, SafeAreaView, Switch } from 'react-native';
import { styles } from '../styles/settingsScreen.styles';

export const SettingsScreen = () => {
  const [isNotificationEnabled, setIsNotificationEnabled] = React.useState(true);

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Ayarlar</Text>

      <View style={styles.settingCard}>
        <View>
          <Text style={styles.settingTitle}>Vakit Bildirimleri</Text>
          <Text style={styles.settingDescription}>Ezan vakitlerinde bildirim al</Text>
        </View>
        <Switch
          value={isNotificationEnabled}
          onValueChange={setIsNotificationEnabled}
        />
      </View>
    </SafeAreaView>
  );
};