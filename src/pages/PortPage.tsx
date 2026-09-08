import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { PortGlyph } from '../components/Icons'
import { Row, Shell } from '../components/Shell'
import { useApp } from '../context/AppContext'
import { ports } from '../data/catalog'
import type { PortId } from '../types'

export function PortPage({ side }: { side: 'a' | 'b' }) {
  const { t, patchWizard, wizard } = useApp()
  const navigate = useNavigate()
  const current = side === 'a' ? wizard.portA : wizard.portB
  const [picked, setPicked] = useState<PortId | undefined>(current)
  const preview = picked ?? 'usb-c'
  const meta = ports.find((p) => p.id === preview)

  return (
    <Shell
      title={side === 'a' ? t.portA : t.portB}
      back={side === 'a' ? '/dispositivo/a' : '/dispositivo/b'}
    >
      <div className="port-preview">
        <PortGlyph port={preview} className="port-svg" />
        <strong>{meta?.name}</strong>
        <span>{meta?.subtitle}</span>
      </div>
      <div className="list">
        {ports.map((p) => (
          <Row
            key={p.id}
            title={p.name}
            subtitle={p.subtitle}
            radio
            selected={picked === p.id}
            onClick={() => {
              setPicked(p.id)
              if (side === 'a') {
                const deviceA = wizard.deviceA ?? 'generic-a'
                patchWizard({ portA: p.id, deviceA })
                navigate(deviceA === 'generic-a' ? '/foto/b' : '/dispositivo/b')
                return
              }
              const deviceB = wizard.deviceB ?? 'generic-b'
              patchWizard({ portB: p.id, deviceB })
              navigate('/uso')
            }}
          />
        ))}
      </div>
    </Shell>
  )
}
