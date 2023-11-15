import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.buildingBasem.app',
  appName: 'باسم الشمري',
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
    CapacitorFirebaseDynamicLinks: {
      webClientId: 'AIzaSyAtrzsFKs5my3BEsaHWoXVetSOM2Za6XEg',
    },
  },
};

export default config;
