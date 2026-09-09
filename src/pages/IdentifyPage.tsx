import { Navigate, useNavigate } from 'react-router-dom'
import { IconCamera } from '../components/Icons'
import { Row, Shell } from '../components/Shell'
import { useApp } from '../context/AppContext'
import { devices, usages } from '../data/catalog'

export function IdentifyPage() {
  const { t, wizard } = useApp()
  const navigate = useNavigate()
  if (!wizard.deviceA || !wizard.usage) {
    return <Navigate to="/" replace />
  }

  const device = devices.find((d) => d.id === wizard.deviceA)?.name
  const usage = usages.find((u) => u.id === wizard.usage)?.name

  return (
    <Shell title={t.identifyPort} back="/uso">
      <p className="muted" style={{ marginBottom: 14 }}>
        {t.identifyHint
          .replace('{device}', device ?? t.deviceA)
          .replace('{usage}', (usage ?? t.usage).toLowerCase())}
      </p>
      <div className="list">
        <Row
          icon={<IconCamera />}
          title={t.takePortPhoto}
          subtitle={t.takePortPhotoHint}
          onClick={() => navigate('/foto')}
        />
        <Row
          title={t.pickPortManual}
          subtitle={t.pickPortManualHint}
          onClick={() => navigate('/puerto')}
        />
      </div>
    </Shell>
  )
}
