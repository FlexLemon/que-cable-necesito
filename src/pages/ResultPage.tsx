import { useEffect } from 'react'
import { Navigate, useNavigate } from 'react-router-dom'
import { IconWarn, PortGlyph } from '../components/Icons'
import { PrimaryButton, Shell } from '../components/Shell'
import { useApp } from '../context/AppContext'
import { devices, usages } from '../data/catalog'
import { otherEndFor, recommendFromPort } from '../lib/recommend'

export function ResultPage() {
  const { wizard } = useApp()
  if (!wizard.deviceA || !wizard.portA || !wizard.usage) {
    return <Navigate to="/" replace />
  }
  return <ResultReady />
}

function ResultReady() {
  const { t, wizard, addHistory } = useApp()
  const navigate = useNavigate()
  const rec = recommendFromPort(wizard.portA!, wizard.usage!)
  const other = wizard.portB ?? otherEndFor(wizard.portA!, wizard.usage!)
  const deviceName =
    wizard.source === 'scan' ? t.scannedDevice : devices.find((d) => d.id === wizard.deviceA)?.name
  const usageName = usages.find((u) => u.id === wizard.usage)?.name

  useEffect(() => {
    addHistory({
      id: `${wizard.deviceA}-${wizard.portA}-${wizard.usage}`,
      createdAt: new Date().toISOString(),
      deviceA: wizard.deviceA!,
      deviceB: 'generic-b',
      portA: wizard.portA!,
      portB: other,
      usage: wizard.usage!,
      cableLabel: rec.cableLabel,
    })
  }, [addHistory, rec.cableLabel, other, wizard.deviceA, wizard.portA, wizard.usage])

  return (
    <Shell title={t.result} back={wizard.source === 'scan' ? '/foto-panel' : '/identificar'}>
      <div className="result-hero">
        <div className="ends">
          <PortGlyph port={wizard.portA!} />
          <span className="link-line" />
          <PortGlyph port={other} />
        </div>
        <p className="kicker">{t.recommended}</p>
        <h2>{rec.cableLabel}</h2>
        <p className="muted">
          {deviceName} · {usageName}
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
      <p className="affiliate-note">{t.affiliateDisclaimer}</p>
    </Shell>
  )
}
