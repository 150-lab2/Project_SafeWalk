import { CapacitorConfig } from '@capacitor/cli';
// import { GoogleAuth } from '@codetrix-studio/capacitor-google-auth';

const config: CapacitorConfig = {
  appId: 'io.ionic.starter',
  appName: 'tabs',
  webDir: 'www',
  server: {
    androidScheme: 'https'
  }
};

export default config;
