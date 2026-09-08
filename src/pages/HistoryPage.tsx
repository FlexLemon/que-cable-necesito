import { useNavigate } from 'react-router-dom'
import { Shell } from '../components/Shell'
import { useApp } from '../context/AppContext'
import { devices } from '../data/catalog'

export function HistoryPage() {
  const { t, history, patchWizard } = useApp()
  const navigate = useNavigate()

  return (
    <Shell title={t.history}>
      {history.length === 0 ? <p className="muted center">{t.noHistory}</p> : null}
      <div className="list">
        {history.map((h) => {
          const da = devices.find((d) => d.id === h.deviceA)?.name
          const db = devices.find((d) => d.id === h.deviceB)?.name
          const date = new Date(h.createdAt).toLocaleDateString(undefined, {
            day: 'numeric',
            month: 'short',
            year: 'numeric',
          })
          return (
            <button
              className="row"
              type="button"
              key={h.id + h.createdAt}
              onClick={() => {
                patchWizard({
                  deviceA: h.deviceA,
                  deviceB: h.deviceB,
                  portA: h.portA,
                  portB: h.portB,
                  usage: h.usage,
                })
                navigate('/resultado')
              }}
            >
              <span className="row-text">
                <strong>
                  {da} + {db}
                </strong>
                <small>
                  {h.cableLabel} · {date}
                </small>
              </span>
              <span className="chevron">›</span>
            </button>
          )
        })}
      </div>
    </Shell>
  )
}
