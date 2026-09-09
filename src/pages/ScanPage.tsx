import { useEffect, useRef, useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { PortGlyph } from '../components/Icons'
import { PrimaryButton, SecondaryButton, Shell } from '../components/Shell'
import { useApp } from '../context/AppContext'
import { ports, usages } from '../data/catalog'
import { capturePortPhoto } from '../lib/camera'
import { detectPortPanel, type PortGuess } from '../lib/detectPort'
import { otherEndFor, usagesForPort } from '../lib/recommend'

export function ScanPage() {
  const { t, patchWizard, resetWizard } = useApp()
  const navigate = useNavigate()
  const location = useLocation()
  const [photo, setPhoto] = useState<string>()
  const [guesses, setGuesses] = useState<PortGuess[]>([])
  const [busy, setBusy] = useState(false)
  const [error, setError] = useState('')
  const started = useRef(false)

  async function shoot() {
    setError('')
    setBusy(true)
    try {
      const dataUrl = await capturePortPhoto('panel')
      setPhoto(dataUrl)
      setGuesses(await detectPortPanel(dataUrl))
    } catch {
      setError(t.cameraCancel)
    } finally {
      setBusy(false)
    }
  }

  useEffect(() => {
    if (started.current) return
    started.current = true
    if ((location.state as { auto?: boolean } | null)?.auto) void shoot()
  }, [location.state])

  function choose(portId: PortGuess['id'], usageId: (typeof usages)[number]['id']) {
    patchWizard({
      source: 'scan',
      deviceA: 'generic-a',
      portA: portId,
      usage: usageId,
      portB: otherEndFor(portId, usageId),
    })
    navigate('/resultado')
  }

  return (
    <Shell title={t.photoPanelTitle} back="/">
      <p className="muted">{t.photoPanelHint}</p>
      {photo ? <img className="photo-preview" src={photo} alt="" /> : null}
      {busy ? <p className="muted center">{t.cameraAnalyzing}</p> : null}
      {error ? <p className="toast">{error}</p> : null}

      {guesses.length > 0 ? (
        <>
          <p className="kicker" style={{ margin: '12px 0 8px' }}>
            {t.portsFound}
          </p>
          <div className="port-cards">
            {guesses.map((g) => {
              const port = ports.find((p) => p.id === g.id)
              if (!port) return null
              const actions = usages.filter((u) => usagesForPort(g.id).includes(u.id))
              return (
                <article className="port-card" key={g.id}>
                  <div className="port-card-head">
                    <PortGlyph port={g.id} className="port-svg" />
                    <div>
                      <strong>{port.name}</strong>
                      <small>{port.subtitle}</small>
                    </div>
                  </div>
                  <p className="kicker">{t.portActions}</p>
                  <div className="chip-list">
                    {actions.map((u) => (
                      <button className="chip" type="button" key={u.id} onClick={() => choose(g.id, u.id)}>
                        {u.name}
                      </button>
                    ))}
                  </div>
                </article>
              )
            })}
          </div>
        </>
      ) : null}

      {!busy && photo && guesses.length === 0 ? <p className="toast">{t.noPortsFound}</p> : null}

      <div className="stack" style={{ marginTop: 16 }}>
        <PrimaryButton onClick={() => void shoot()} disabled={busy}>
          {photo ? t.retake : t.photoPanel}
        </PrimaryButton>
        <SecondaryButton
          onClick={() => {
            resetWizard()
            navigate('/dispositivo')
          }}
        >
          {t.pickDevice}
        </SecondaryButton>
      </div>
    </Shell>
  )
}
