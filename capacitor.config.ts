import type { CapacitorConfig } from '@capacitor/cli'

const config: CapacitorConfig = {
  appId: 'com.dk.quecablenececito',
  appName: 'Qué cable necesito',
  webDir: 'dist',
  android: {
    allowMixedContent: true,
  },
  plugins: {
    Camera: {
      presentationStyle: 'fullscreen',
    },
  },
}

export default config
