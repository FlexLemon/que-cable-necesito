import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { PortGlyph } from '../components/Icons'
import { PrimaryButton, Row, SecondaryButton, Shell } from '../components/Shell'
import { useApp } from '../context/AppContext'
import { ports } from '../data/catalog'
import { capturePortPhoto } from '../lib/camera'
import { detectPorts, type PortGuess } from '../lib/detectPort'
import type { PortId } from '../types'

export function CameraPage({ side }: { side: 'a' | 'b' }) {
  const { t, patchWizard } = useApp()
  const navigate = useNavigate()
  const [photo, setPhoto] = useState<string>()
  const [guesses, setGuesses] = useState<PortGuess[]>([])
  const [picked, setPicked] = useState<PortId>()
  const [busy, setBusy] = useState(false)
  const [error, setError] = useState('')

  async function shoot() {
    setError('')
    setBusy(true)
    try {
      const dataUrl = await capturePortPhoto()
      setPhoto(dataUrl)
      const ranked = await detectPorts(dataUrl)
      setGuesses(ranked)
      setPicked(ranked[0]?.id)
    } catch {
      setError(t.cameraCancel)
    } finally {
      setBusy(false)
    }
  }

  function confirm() {
    if (!picked) return
    if (side === 'a') {
      patchWizard({ portA: picked, deviceA: 'generic-a' })
      navigate('/foto/b')
      return
    }
    patchWizard({ portB: picked, deviceB: 'generic-b' })
    navigate('/uso')
  }

  const title = side === 'a' ? t.cameraA : t.cameraB
  const preview = ports.find((p) => p.id === picked)

  return (
    <Shell title={title} back={side === 'a' ? '/' : '/foto/a'}>
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
          {guesses.length ? t.confirmPort : t.takePhoto}
        </PrimaryButton>
        {photo ? <SecondaryButton onClick={shoot}>{t.retake}</SecondaryButton> : null}
        <button
          className="btn secondary"
          type="button"
          onClick={() => navigate(side === 'a' ? '/puerto/a' : '/puerto/b')}
        >
          {t.pickManual}
        </button>
      </div>
    </Shell>
  )
}
