import type { PortId } from '../types'

export type PortGuess = {
  id: PortId
  score: number
}

function loadImage(src: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const img = new Image()
    img.onload = () => resolve(img)
    img.onerror = () => reject(new Error('No se pudo leer la foto'))
    img.src = src
  })
}

type Shape = {
  aspect: number
  fill: number
  size: number
  circularity: number
  darkShare: number
}

function analyze(img: HTMLImageElement): Shape {
  const w = 280
  const h = Math.max(80, Math.round((img.height / img.width) * w))
  const canvas = document.createElement('canvas')
  canvas.width = w
  canvas.height = h
  const ctx = canvas.getContext('2d', { willReadFrequently: true })
  if (!ctx) {
    return { aspect: 2.8, fill: 0.6, size: 0.4, circularity: 0.4, darkShare: 0.2 }
  }
  ctx.drawImage(img, 0, 0, w, h)
  const data = ctx.getImageData(0, 0, w, h).data

  const x0 = Math.floor(w * 0.12)
  const x1 = Math.ceil(w * 0.88)
  const y0 = Math.floor(h * 0.18)
  const y1 = Math.ceil(h * 0.82)
  const lumas: number[] = []
  for (let y = y0; y < y1; y++) {
    for (let x = x0; x < x1; x++) {
      const i = (y * w + x) * 4
      lumas.push(0.299 * data[i] + 0.587 * data[i + 1] + 0.114 * data[i + 2])
    }
  }
  const mean = lumas.reduce((a, b) => a + b, 0) / Math.max(1, lumas.length)
  const threshold = Math.min(110, mean * 0.72)

  let minX = w
  let minY = h
  let maxX = 0
  let maxY = 0
  let dark = 0
  let total = 0
  for (let y = y0; y < y1; y++) {
    for (let x = x0; x < x1; x++) {
      total++
      const i = (y * w + x) * 4
      const luma = 0.299 * data[i] + 0.587 * data[i + 1] + 0.114 * data[i + 2]
      if (luma < threshold) {
        dark++
        if (x < minX) minX = x
        if (y < minY) minY = y
        if (x > maxX) maxX = x
        if (y > maxY) maxY = y
      }
    }
  }

  const bw = Math.max(1, maxX - minX)
  const bh = Math.max(1, maxY - minY)
  const aspect = bw / bh
  const fill = dark / (bw * bh)
  const size = bw / w
  const area = dark
  const peri = 2 * (bw + bh)
  const circularity = (4 * Math.PI * area) / Math.max(1, peri * peri)
  const darkShare = dark / Math.max(1, total)
  return { aspect, fill, size, circularity, darkShare }
}

function scoreShape(id: PortId, s: Shape): number {
  const { aspect: a, fill: f, size: z, circularity: c, darkShare: d } = s
  if (d < 0.04) return id === 'other' ? 8 : 1

  switch (id) {
    case 'jack-35':
      return band(a, 0.75, 1.25, 12) + band(c, 0.55, 0.95, 8) + band(z, 0.12, 0.45, 4)
    case 'usb-c':
      return band(a, 2.4, 4.8, 14) + band(f, 0.4, 0.85, 5) + band(z, 0.28, 0.85, 4)
    case 'lightning':
      return band(a, 2.1, 3.6, 8) + band(f, 0.45, 0.85, 4)
    case 'usb-a':
      return band(a, 1.65, 2.55, 11) + band(f, 0.62, 0.95, 6) + band(z, 0.3, 0.9, 3)
    case 'hdmi':
      return band(a, 2.05, 3.3, 10) + band(f, 0.5, 0.85, 4) + band(z, 0.4, 0.95, 5)
    case 'displayport':
      return band(a, 1.7, 2.6, 8) + band(f, 0.55, 0.9, 4) + band(z, 0.35, 0.9, 3)
    case 'ethernet':
      return band(a, 1.12, 1.55, 10) + band(f, 0.6, 0.92, 5) + band(z, 0.35, 0.9, 4)
    case 'micro-usb':
      return band(a, 1.85, 2.75, 7) + band(f, 0.45, 0.8, 4) + band(z, 0.18, 0.6, 3)
    case 'mini-usb':
      return band(a, 1.45, 2.2, 6) + band(z, 0.15, 0.5, 3)
    default:
      return 3
  }
}

function band(value: number, min: number, max: number, weight: number): number {
  if (value >= min && value <= max) return weight
  const dist = value < min ? min - value : value - max
  return Math.max(0, weight - dist * weight)
}

const CANDIDATES: PortId[] = [
  'usb-c',
  'usb-a',
  'hdmi',
  'jack-35',
  'ethernet',
  'displayport',
  'micro-usb',
  'lightning',
  'mini-usb',
  'other',
]

export async function detectPorts(dataUrl: string): Promise<PortGuess[]> {
  const img = await loadImage(dataUrl)
  const shape = analyze(img)
  return CANDIDATES.map((id) => ({ id, score: scoreShape(id, shape) }))
    .sort((a, b) => b.score - a.score)
    .slice(0, 4)
}
