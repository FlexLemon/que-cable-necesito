import { useState } from 'react'
import { Navigate } from 'react-router-dom'
import { Shell } from '../components/Shell'
import { useApp } from '../context/AppContext'
import { productsFor, recommendFromPort } from '../lib/recommend'
import { productUrl } from '../lib/affiliate'
import type { StoreId } from '../types'

export function CablesPage() {
  const { t, wizard } = useApp()
  const [filter, setFilter] = useState<'all' | StoreId>('amazon')

  if (!wizard.portA || !wizard.usage) {
    return <Navigate to="/" replace />
  }

  const rec = recommendFromPort(wizard.portA, wizard.usage)
  const list = productsFor(rec.kind).filter((p) => filter === 'all' || p.store === filter)

  return (
    <Shell title={t.cables} back="/resultado">
      <div className="pills">
        <button className={filter === 'all' ? 'pill on' : 'pill'} type="button" onClick={() => setFilter('all')}>
          {t.all}
        </button>
        <button className={filter === 'amazon' ? 'pill on' : 'pill'} type="button" onClick={() => setFilter('amazon')}>
          {t.amazon}
        </button>
        <button
          className={filter === 'pccomponentes' ? 'pill on' : 'pill'}
          type="button"
          onClick={() => setFilter('pccomponentes')}
        >
          {t.pcc}
        </button>
      </div>
      <div className="cards">
        {list.length === 0 ? <p className="muted">{t.emptyProducts}</p> : null}
        {list.map((p) => (
          <article className="card" key={p.id}>
            <div className={`thumb brand-${p.brand.toLowerCase().replace(/\s/g, '')}`}>{p.brand.slice(0, 2)}</div>
            <div className="card-body">
              <small>{p.brand}</small>
              <strong>{p.name}</strong>
              <span>{p.specs}</span>
              <div className="card-foot">
                <b>
                  {p.price.toFixed(2).replace('.', ',')} €{' '}
                  <span className="muted" style={{ fontWeight: 500 }}>
                    {t.priceHint}
                  </span>
                </b>
                <a className="mini-btn" href={productUrl(p)} target="_blank" rel="noopener noreferrer sponsored">
                  {t.view}
                </a>
              </div>
            </div>
          </article>
        ))}
      </div>
      <p className="affiliate-note">{t.affiliateDisclaimer}</p>
    </Shell>
  )
}
