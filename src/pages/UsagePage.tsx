import { Navigate, useNavigate } from 'react-router-dom'
import {
  IconAdapt,
  IconAudio,
  IconBolt,
  IconData,
  IconDisplay,
  IconNet,
} from '../components/Icons'
import { Row, Shell } from '../components/Shell'
import { useApp } from '../context/AppContext'
import { devices, usages, usagesByDevice } from '../data/catalog'
import type { UsageId } from '../types'

const icons: Record<UsageId, typeof IconBolt> = {
  charge: IconBolt,
  data: IconData,
  display: IconDisplay,
  audio: IconAudio,
  network: IconNet,
  adapt: IconAdapt,
}

export function UsagePage() {
  const { t, patchWizard, wizard } = useApp()
  const navigate = useNavigate()

  if (!wizard.deviceA) {
    return <Navigate to="/dispositivo" replace />
  }

  const deviceName = devices.find((d) => d.id === wizard.deviceA)?.name
  const allowed = usagesByDevice[wizard.deviceA] ?? usages.map((u) => u.id)
  const list = usages.filter((u) => allowed.includes(u.id))

  return (
    <Shell title={t.usage} back="/dispositivo">
      <p className="muted" style={{ marginBottom: 14 }}>
        {t.usageHint.replace('{device}', deviceName ?? '')}
      </p>
      <div className="list">
        {list.map((u) => {
          const Icon = icons[u.id]
          return (
            <Row
              key={u.id}
              icon={<Icon />}
              title={u.name}
              subtitle={u.hint}
              onClick={() => {
                patchWizard({ usage: u.id, portA: undefined, portB: undefined })
                navigate('/identificar')
              }}
            />
          )
        })}
      </div>
    </Shell>
  )
}
