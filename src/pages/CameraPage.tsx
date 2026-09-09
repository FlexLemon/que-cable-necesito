import { useState } from 'react'
import { Navigate, useNavigate } from 'react-router-dom'
import { PortGlyph } from '../components/Icons'
import { PrimaryButton, Row, SecondaryButton, Shell } from '../components/Shell'
import { useApp } from '../context/AppContext'
import { ports } from '../data/catalog'
import { capturePortPhoto } from '../lib/camera'
import { detectPorts, type PortGuess } from '../lib/detectPort'
import { otherEndFor, portsForUsage } from '../lib/recommend'
import type { PortId } from '../types'

export function CameraPage() {
  const { t, patchWizard, wizard } = useApp()
  const navigate = useNavigate()
  const [photo, setPhoto] = useState<string>()
  const [guesses, setGuesses] = useState<PortGuess[]>([])
  const [picked, setPicked] = useState<PortId>()
  const [busy, setBusy] = useState(false)
  const [error, setError] = useState('')

  if (!wizard.deviceA || !wizard.usage) {
    return <Navigate to="/" replace />
  }

  async function shoot() {
    setError('')
    setBusy(true)
    try {
      const dataUrl = await capturePortPhoto()
      setPhoto(dataUrl)
      const allowed = new Set(portsForUsage(wizard.usage!))
      const ranked = await detectPorts(dataUrl)
      const filtered = ranked.filter((g) => allowed.has(g.id))
      const next = filtered.length ? filtered : ranked
      setGuesses(next)
      setPicked(next[0]?.id)
    } catch {
      setError(t.cameraCancel)
    } finally {
      setBusy(false)
    }
  }

  function confirm() {
    if (!picked || !wizard.usage) return
    patchWizard({ portA: picked, portB: otherEndFor(picked, wizard.usage) })
    navigate('/resultado')
  }

  const preview = ports.find((p) => p.id === picked)

  return (
    <Shell title={t.takePortPhoto} back="/identificar">
      <p className="muted">{t.cameraHint}</p>
      {photo ? <img className="photo-preview" src={photo} alt="" /> : null}
      {busy ? <p className="muted center">{t.cameraAnalyzing}</p> : null}
      {error ? <p className="toast">{error}</p> : null}

      {guesses.length > 0 ? (
        <>
          <p className="kicker" style={{ margin: '12px 0 8px' }}>
            {t.cameraGuess}
          </p>
          {preview ? (
            <div className="port-preview">
              <PortGlyph port={picked ?? 'usb-c'} className="port-svg" />
              <strong>{preview.name}</strong>
              <span>{preview.subtitle}</span>
            </div>
          ) : null}
          <div className="list">
            {guesses.map((g) => {
              const port = ports.find((p) => p.id === g.id)
              if (!port) return null
              return (
                <Row
                  key={g.id}
                  title={port.name}
                  subtitle={port.subtitle}
                  radio
                  selected={picked === g.id}
                  onClick={() => setPicked(g.id)}
                />
              )
            })}
          </div>
        </>
      ) : null}

      <div className="stack" style={{ marginTop: 16 }}>
        <PrimaryButton onClick={guesses.length ? confirm : shoot} disabled={busy || (Boolean(photo) && !picked)}>
          {guesses.length ? t.confirmPort : t.takePortPhoto}
        </PrimaryButton>
        {photo ? <SecondaryButton onClick={shoot}>{t.retake}</SecondaryButton> : null}
        <SecondaryButton onClick={() => navigate('/puerto')}>{t.pickPortManual}</SecondaryButton>
      </div>
    </Shell>
  )
}
