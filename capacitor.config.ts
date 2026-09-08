import type { CapacitorConfig } from '@capacitor/cli'

const config: CapacitorConfig = {
  appId: 'app.quecable.necesito',
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
