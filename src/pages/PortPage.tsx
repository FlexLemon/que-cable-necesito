import { useState } from 'react'
import { Navigate, useNavigate } from 'react-router-dom'
import { PortGlyph } from '../components/Icons'
import { Row, Shell } from '../components/Shell'
import { useApp } from '../context/AppContext'
import { ports } from '../data/catalog'
import { otherEndFor, portsForUsage } from '../lib/recommend'
import type { PortId } from '../types'

export function PortPage() {
  const { t, patchWizard, wizard } = useApp()
  const navigate = useNavigate()
  const [picked, setPicked] = useState<PortId | undefined>(wizard.portA)
  const preview = picked ?? 'usb-c'
  const meta = ports.find((p) => p.id === preview)

  if (!wizard.deviceA || !wizard.usage) {
    return <Navigate to="/" replace />
  }

  return (
    <Shell title={t.pickPortManual} back="/identificar">
      <div className="port-preview">
        <PortGlyph port={preview} className="port-svg" />
        <strong>{meta?.name}</strong>
        <span>{meta?.subtitle}</span>
      </div>
      <div className="list">
        {ports
          .filter((p) => portsForUsage(wizard.usage!).includes(p.id))
          .map((p) => (
          <Row
            key={p.id}
            title={p.name}
            subtitle={p.subtitle}
            radio
            selected={picked === p.id}
            onClick={() => {
              setPicked(p.id)
              patchWizard({
                portA: p.id,
                portB: otherEndFor(p.id, wizard.usage!),
              })
              navigate('/resultado')
            }}
          />
        ))}
      </div>
    </Shell>
  )
}
