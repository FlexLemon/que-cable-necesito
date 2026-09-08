# ¿Qué cable necesito?

App web para saber qué cable une dos dispositivos, con requisitos técnicos y enlaces de compra.

## Arranque (navegador)

```bash
npm install
npm run dev
```

## Generar APK (Android)

Esta app se empaqueta con [Capacitor](https://capacitorjs.com/). En este PC hace falta **Android Studio** (incluye JDK y Android SDK). Sin eso Gradle no puede compilar el APK.

### 1. Instalar herramientas (una vez)

1. Instala [Android Studio](https://developer.android.com/studio).
2. Ábrelo y en **More Actions → SDK Manager** instala:
   - Android SDK
   - Android SDK Platform (API 35 o la que pida el proyecto)
   - Android SDK Build-Tools
3. Reinicia la terminal para que existan `JAVA_HOME` y `ANDROID_HOME`.

En Windows, las rutas típicas son:

- `JAVA_HOME`: el JBR de Android Studio, por ejemplo `C:\Program Files\Android\Android Studio\jbr`
- `ANDROID_HOME`: `%LOCALAPPDATA%\Android\Sdk`

### 2. Compilar la web y el APK de depuración

```bash
cd C:\Users\danie\que-cable-necesito
npm install
npm run apk
```

El APK queda en:

`android\app\build\outputs\apk\debug\app-debug.apk`

Cópialo al móvil y ábrelo (hay que permitir “instalar apps desconocidas”).

### 3. Abrir el proyecto en Android Studio (opcional)

```bash
npm run cap:sync
npx cap open android
```

Ahí puedes pulsar **Build → Build APK(s)** o generar un **AAB** para Play Store (**Build → Generate Signed Bundle / APK**). El AAB de tienda necesita un keystore de firma.

Cada vez que cambies el código web: `npm run cap:sync` (o `npm run apk`) para copiar `dist` a Android.
