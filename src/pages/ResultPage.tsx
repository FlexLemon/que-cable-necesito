import { useEffect } from 'react'
import { Navigate, useNavigate } from 'react-router-dom'
import { IconWarn, PortGlyph } from '../components/Icons'
import { PrimaryButton, Shell } from '../components/Shell'
import { useApp } from '../context/AppContext'
import { devices } from '../data/catalog'
import { recommend } from '../lib/recommend'

export function ResultPage() {
  const { wizard } = useApp()
  if (!wizard.portA || !wizard.portB || !wizard.usage) {
    return <Navigate to="/" replace />
  }
  return <ResultReady />
}

function ResultReady() {
  const { t, wizard, addHistory } = useApp()
  const navigate = useNavigate()
  const rec = recommend(wizard.portA!, wizard.portB!, wizard.usage!)
  const da =
    devices.find((d) => d.id === wizard.deviceA)?.name ?? (wizard.portA ? 'Equipo A' : '')
  const db =
    devices.find((d) => d.id === wizard.deviceB)?.name ?? (wizard.portB ? 'Equipo B' : '')

  useEffect(() => {
    addHistory({
      id: `${wizard.deviceA}-${wizard.portA}-${wizard.deviceB}-${wizard.portB}-${wizard.usage}`,
      createdAt: new Date().toISOString(),
      deviceA: wizard.deviceA ?? 'generic-a',
      deviceB: wizard.deviceB ?? 'generic-b',
      portA: wizard.portA!,
      portB: wizard.portB!,
      usage: wizard.usage!,
      cableLabel: rec.cableLabel,
    })
  }, [addHistory, rec.cableLabel, wizard.deviceA, wizard.deviceB, wizard.portA, wizard.portB, wizard.usage])

  return (
    <Shell title={t.result} back="/uso">
      <div className="result-hero">
        <div className="ends">
          <PortGlyph port={wizard.portA!} />
          <span className="link-line" />
          <PortGlyph port={wizard.portB!} />
        </div>
        <p className="kicker">{t.recommended}</p>
        <h2>{rec.cableLabel}</h2>
        <p className="muted">
          {da} + {db}
        </p>
      </div>

      {rec.incompatible ? (
        <div className="warn">
          <IconWarn />
          <div>
            <strong>{t.incompatible}</strong>
            <p>{rec.warning}</p>
          </div>
        </div>
      ) : (
        <ul className="reqs">
          {rec.requirements.map((r) => (
            <li key={r.title}>
              <strong>{r.title}</strong>
              <span>{r.detail}</span>
            </li>
          ))}
        </ul>
      )}

      {rec.warning && !rec.incompatible ? (
        <div className="warn">
          <IconWarn />
          <p>{rec.warning}</p>
        </div>
      ) : null}

      {rec.note ? <p className="muted">{rec.note}</p> : null}

      {!rec.incompatible ? (
        <PrimaryButton onClick={() => navigate('/cables')}>{t.seeCables}</PrimaryButton>
      ) : (
        <PrimaryButton onClick={() => navigate('/')}>{t.home}</PrimaryButton>
      )}
    </Shell>
  )
}
