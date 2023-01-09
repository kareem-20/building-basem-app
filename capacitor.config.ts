import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'app.building.app',
  appName: 'عقارك',
  webDir: 'www',
  bundledWebRuntime: false,
  server: {
    cleartext: true,
    allowNavigation: ['*'],
  },
  plugins: {
    PushNotifications: {
      presentationOptions: ['badge', 'sound', 'alert'],
    },
  },
};

export default config;
