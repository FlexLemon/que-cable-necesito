import { useNavigate } from 'react-router-dom'
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
import { usages } from '../data/catalog'
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
  const { t, patchWizard } = useApp()
  const navigate = useNavigate()

  return (
    <Shell title={t.usage} back="/puerto/b">
      <div className="list">
        {usages.map((u) => {
          const Icon = icons[u.id]
          return (
            <Row
              key={u.id}
              icon={<Icon />}
              title={u.name}
              subtitle={u.hint}
              onClick={() => {
                patchWizard({ usage: u.id })
                navigate('/resultado')
              }}
            />
          )
        })}
      </div>
    </Shell>
  )
}
