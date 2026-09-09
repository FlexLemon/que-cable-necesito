import { useNavigate } from 'react-router-dom'
import { Shell } from '../components/Shell'
import { useApp } from '../context/AppContext'
import { devices, usages } from '../data/catalog'

export function HistoryPage() {
  const { t, history, patchWizard } = useApp()
  const navigate = useNavigate()

  return (
    <Shell title={t.history}>
      {history.length === 0 ? <p className="muted center">{t.noHistory}</p> : null}
      <div className="list">
        {history.map((h) => {
          const device = devices.find((d) => d.id === h.deviceA)?.name
          const usage = usages.find((u) => u.id === h.usage)?.name
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
                  portA: h.portA,
                  portB: h.portB,
                  usage: h.usage,
                })
                navigate('/resultado')
              }}
            >
              <span className="row-text">
                <strong>
                  {device}
                  {usage ? ` · ${usage}` : ''}
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
