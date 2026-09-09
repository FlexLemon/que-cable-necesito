import { ports, products } from '../data/catalog'
import type { PortId, Product, Recommendation, UsageId } from '../types'

export function portLabel(id: PortId): string {
  return ports.find((p) => p.id === id)?.name ?? id
}

export function otherEndFor(port: PortId, usage: UsageId): PortId {
  if (port === 'other') return 'other'

  if (usage === 'charge') {
    if (port === 'usb-c' || port === 'lightning') return 'usb-c'
    if (port === 'micro-usb' || port === 'mini-usb' || port === 'usb-a') return 'usb-a'
    return port
  }

  if (usage === 'data') {
    if (port === 'ethernet') return 'ethernet'
    if (port === 'usb-c' || port === 'lightning') return 'usb-c'
    return 'usb-a'
  }

  if (usage === 'display') {
    if (port === 'hdmi') return 'hdmi'
    if (port === 'displayport') return 'displayport'
    if (port === 'usb-c') return 'hdmi'
    return port
  }

  if (usage === 'audio') {
    if (port === 'hdmi') return 'hdmi'
    return 'jack-35'
  }

  if (usage === 'network') {
    return 'ethernet'
  }

  if (port === 'usb-c') return 'usb-a'
  return 'usb-c'
}

export function recommendFromPort(port: PortId, usage: UsageId): Recommendation {
  return recommend(port, otherEndFor(port, usage), usage)
}

export function usagesForPort(port: PortId): UsageId[] {
  switch (port) {
    case 'usb-c':
      return ['charge', 'data', 'display', 'audio', 'network', 'adapt']
    case 'usb-a':
      return ['charge', 'data', 'adapt']
    case 'micro-usb':
    case 'mini-usb':
      return ['charge', 'data']
    case 'lightning':
      return ['charge', 'data', 'audio', 'adapt']
    case 'hdmi':
      return ['display', 'audio']
    case 'displayport':
      return ['display']
    case 'jack-35':
      return ['audio']
    case 'ethernet':
      return ['network']
    default:
      return ['adapt']
  }
}

export function portsForUsage(usage: UsageId): PortId[] {
  if (usage === 'charge') return ['usb-c', 'usb-a', 'micro-usb', 'mini-usb', 'lightning', 'other']
  if (usage === 'data') return ['usb-c', 'usb-a', 'micro-usb', 'mini-usb', 'lightning', 'ethernet', 'other']
  if (usage === 'display') return ['usb-c', 'hdmi', 'displayport', 'other']
  if (usage === 'audio') return ['jack-35', 'usb-c', 'lightning', 'hdmi', 'other']
  if (usage === 'network') return ['ethernet', 'usb-c', 'usb-a', 'other']
  return ports.map((p) => p.id)
}

export function recommend(
  portA: PortId,
  portB: PortId,
  usage: UsageId,
): Recommendation {
  const label = `${portLabel(portA)} → ${portLabel(portB)}`
  const kind = kindKey(portA, portB)
  const pair = new Set([portA, portB])
  const has = (id: PortId) => pair.has(id)

  if (portA === 'other' || portB === 'other') {
    return {
      cableLabel: 'Cable o adaptador específico',
      kind,
      requirements: [
        {
          title: 'Identifica el conector',
          detail: 'Mira el manual o la serigrafía junto al puerto.',
        },
      ],
      note: 'Sin un puerto concreto no podemos recomendar un modelo único.',
    }
  }

  if (usage === 'charge') {
    if (has('hdmi') || has('displayport') || has('ethernet') || has('jack-35')) {
      if (!(has('usb-c') || has('usb-a') || has('micro-usb') || has('mini-usb') || has('lightning'))) {
        return incompatible(label, kind, 'Estos puertos no sirven para cargar. Usa USB, Lightning o el cargador original.')
      }
    }
    if (kind === 'usb-c|usb-c') {
      return {
        cableLabel: label,
        kind,
        requirements: [
          { title: 'USB Power Delivery', detail: 'Mínimo 60W; 100W si el portátil lo pide.' },
          { title: 'Marca e-marker', detail: 'Evita cables genéricos sin chip para más de 60W.' },
        ],
        warning: 'Un cable de carga básico puede no transmitir vídeo ni datos rápidos.',
      }
    }
    if (kind === 'usb-a|usb-c') {
      return {
        cableLabel: label,
        kind,
        requirements: [
          { title: 'Carga 3A / QC', detail: 'Suficiente para móviles; no alimenta la mayoría de portátiles.' },
        ],
      }
    }
    if (kind === 'lightning|usb-c' || kind === 'lightning|usb-a') {
      return {
        cableLabel: label,
        kind,
        requirements: [
          { title: 'Certificación MFi', detail: 'Evita errores de accesorio no compatible.' },
        ],
      }
    }
    if (kind.includes('micro-usb') || kind.includes('mini-usb')) {
      return {
        cableLabel: label,
        kind,
        requirements: [{ title: 'USB 2.0', detail: 'Carga lenta típica de 5–10W.' }],
      }
    }
    return {
      cableLabel: label,
      kind,
      requirements: [{ title: 'Cable de carga', detail: 'Usa los extremos que coincidan con ambos puertos.' }],
    }
  }

  if (usage === 'data') {
    if (has('hdmi') || has('displayport') || has('jack-35')) {
      return incompatible(label, kind, 'HDMI, DisplayPort y jack no sirven para copiar archivos entre dispositivos.')
    }
    if (kind === 'usb-c|usb-c') {
      return {
        cableLabel: label,
        kind,
        requirements: [
          { title: 'USB 3.2 Gen 2 (10 Gbps)', detail: 'O USB4 si ambos equipos lo soportan.' },
        ],
        warning: 'Muchos cables USB-C de carga son solo USB 2.0 (480 Mbps).',
      }
    }
    if (kind === 'ethernet|ethernet') {
      return {
        cableLabel: 'Ethernet Cat 6',
        kind,
        requirements: [{ title: 'Cat 6 o superior', detail: '1 Gbps estable entre router y equipo.' }],
      }
    }
    return {
      cableLabel: label,
      kind,
      requirements: [{ title: 'USB de datos', detail: 'Ambos extremos deben ser USB o Lightning, no solo carga.' }],
    }
  }

  if (usage === 'display') {
    if (kind === 'hdmi|hdmi') {
      return {
        cableLabel: 'HDMI → HDMI',
        kind,
        requirements: [
          { title: 'HDMI 2.0 o 2.1', detail: '2.0 para 4K60; 2.1 para 4K120 / 8K.' },
        ],
      }
    }
    if (kind === 'displayport|displayport') {
      return {
        cableLabel: 'DisplayPort → DisplayPort',
        kind,
        requirements: [{ title: 'DisplayPort 1.4', detail: '4K144 o 8K60 según GPU y monitor.' }],
      }
    }
    if (kind === 'hdmi|usb-c') {
      return {
        cableLabel: 'USB-C → HDMI',
        kind,
        requirements: [
          { title: 'DisplayPort Alt Mode', detail: 'El USB-C del equipo debe emitir vídeo.' },
          { title: '4K60', detail: 'Elige cable/adaptador HDMI 2.0 como mínimo.' },
        ],
        warning: 'Un cable USB-C de carga no lleva imagen. El puerto tiene que soportar vídeo.',
      }
    }
    if (kind === 'displayport|usb-c') {
      return {
        cableLabel: 'USB-C → DisplayPort',
        kind,
        requirements: [{ title: 'DP Alt Mode', detail: 'Cable USB-C a DP 1.4.' }],
      }
    }
    if (kind === 'displayport|hdmi') {
      return {
        cableLabel: 'HDMI ↔ DisplayPort (activo)',
        kind,
        requirements: [
          { title: 'Adaptador activo', detail: 'HDMI a DP casi siempre necesita chip activo.' },
        ],
      }
    }
    if (kind === 'usb-c|usb-c') {
      return {
        cableLabel: 'USB-C → USB-C (vídeo)',
        kind,
        requirements: [
          { title: 'DP Alt Mode o USB4', detail: 'Ambos puertos deben soportar vídeo.' },
          { title: 'USB 3.2 Gen 2 o superior', detail: '10 Gbps mínimo; USB4 si hay 4K alto refresco.' },
          { title: '100W Power Delivery', detail: 'Si también quieres cargar el portátil.' },
        ],
        warning: 'Los cables de carga baratos no suelen llevar vídeo aunque encajen.',
      }
    }
    return incompatible(
      label,
      kind,
      'Esta pareja de puertos no transmite imagen. Usa HDMI, DisplayPort o USB-C con vídeo.',
    )
  }

  if (usage === 'audio') {
    if (kind === 'jack-35|jack-35') {
      return {
        cableLabel: 'Jack 3.5 mm → Jack 3.5 mm',
        kind,
        requirements: [{ title: 'TRS estéreo', detail: 'Macho-macho para aux; TRRS si hay micrófono.' }],
      }
    }
    if (kind === 'jack-35|usb-c' || kind === 'jack-35|usb-a' || kind === 'jack-35|lightning') {
      return {
        cableLabel: label,
        kind,
        requirements: [{ title: 'Adaptador con DAC', detail: 'USB/Lightning a jack convierte digital a analógico.' }],
      }
    }
    if (kind === 'hdmi|hdmi' || kind === 'hdmi|usb-c') {
      return {
        cableLabel: label,
        kind,
        requirements: [{ title: 'Audio por HDMI / USB-C', detail: 'El mismo cable de vídeo suele llevar el sonido.' }],
      }
    }
    return {
      cableLabel: label,
      kind,
      requirements: [{ title: 'Comprueba el tipo de audio', detail: 'Analógico (jack) o digital (USB, HDMI, Bluetooth).' }],
    }
  }

  if (usage === 'network') {
    if (kind === 'ethernet|ethernet') {
      return {
        cableLabel: 'Ethernet Cat 6',
        kind,
        requirements: [{ title: 'Cat 6', detail: 'Hasta 1 Gbps en distancias domésticas.' }],
      }
    }
    if (has('ethernet') && (has('usb-c') || has('usb-a'))) {
      return {
        cableLabel: 'Adaptador USB a Ethernet',
        kind,
        requirements: [{ title: 'Gigabit USB 3.0', detail: 'Dongle USB-C/A a RJ45.' }],
      }
    }
    return incompatible(label, kind, 'Para red por cable hace falta RJ45 o un adaptador USB a Ethernet.')
  }

  // adapt
  if (portA === portB) {
    return {
      cableLabel: label,
      kind,
      requirements: [{ title: 'Cable directo', detail: 'Mismos conectores: un cable macho-macho basta.' }],
    }
  }
  return {
    cableLabel: `Adaptador ${label}`,
    kind,
    requirements: [
      { title: 'Adaptador o cable híbrido', detail: 'Une conectores distintos; verifica si debe ser activo.' },
    ],
  }
}

function kindKey(a: PortId, b: PortId): string {
  return [a, b].sort().join('|')
}

function incompatible(
  cableLabel: string,
  kind: string,
  warning: string,
): Recommendation {
  return {
    cableLabel,
    kind,
    incompatible: true,
    requirements: [],
    warning,
  }
}

export function productsFor(kind: string): Product[] {
  const list = products.filter((p) => p.kinds.includes(kind))
  if (list.length) return list
  return products.filter((p) => p.kinds.some((k) => k.includes('usb-c')))
}
