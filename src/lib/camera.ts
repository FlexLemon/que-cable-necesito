import { Camera, CameraResultType, CameraSource } from '@capacitor/camera'

export async function capturePortPhoto(mode: 'port' | 'panel' = 'port'): Promise<string> {
  const photo = await Camera.getPhoto({
    quality: 85,
    width: 1600,
    resultType: CameraResultType.DataUrl,
    source: CameraSource.Prompt,
    correctOrientation: true,
    promptLabelHeader: mode === 'panel' ? 'Foto del dispositivo o puertos' : 'Foto del puerto',
    promptLabelPhoto: 'Galería',
    promptLabelPicture: 'Cámara',
  })
  if (!photo.dataUrl) throw new Error('No se obtuvo la foto')
  return photo.dataUrl
}
