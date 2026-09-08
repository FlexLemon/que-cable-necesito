import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  CableMark,
  IconCamera,
  IconLaptop,
  IconPhone,
  IconSearch,
  IconTablet,
  IconMonitor,
  IconConsole,
  IconCameraDevice,
  IconTv,
  IconDesktop,
  IconHeadphones,
  IconDock,
} from '../components/Icons'
import { Row, Shell } from '../components/Shell'
import { useApp } from '../context/AppContext'
import { devices } from '../data/catalog'
import type { DeviceId } from '../types'

const icons: Record<DeviceId, typeof IconLaptop> = {
  laptop: IconLaptop,
  phone: IconPhone,
  tablet: IconTablet,
  monitor: IconMonitor,
  console: IconConsole,
  camera: IconCameraDevice,
  tv: IconTv,
  desktop: IconDesktop,
  headphones: IconHeadphones,
  dock: IconDock,
  'generic-a': IconLaptop,
  'generic-b': IconMonitor,
}

export function DevicePage({ side }: { side: 'a' | 'b' }) {
  const { t, patchWizard, wizard } = useApp()
  const navigate = useNavigate()
  const [q, setQ] = useState('')
  const [tab, setTab] = useState<'popular' | 'all'>('popular')
  const selected = side === 'a' ? wizard.deviceA : wizard.deviceB

  const list = devices.filter((d) => {
    if (d.id === 'generic-a' || d.id === 'generic-b') return false
    const matches = d.name.toLowerCase().includes(q.toLowerCase())
    if (!matches) return false
    if (tab === 'popular') return d.popular
    return true
  })

  return (
    <Shell title={side === 'a' ? t.deviceA : t.deviceB} back={side === 'a' ? '/' : '/puerto/a'}>
      <label className="search">
        <IconSearch />
        <input value={q} onChange={(e) => setQ(e.target.value)} placeholder={t.search} />
      </label>
      <div className="pills">
        <button className={tab === 'popular' ? 'pill on' : 'pill'} type="button" onClick={() => setTab('popular')}>
          {t.popular}
        </button>
        <button className={tab === 'all' ? 'pill on' : 'pill'} type="button" onClick={() => setTab('all')}>
          {t.all}
        </button>
      </div>
      <div className="list">
        {list.map((d) => {
          const Icon = icons[d.id]
          return (
            <Row
              key={d.id}
              icon={<Icon />}
              title={d.name}
              selected={selected === d.id}
              onClick={() => {
                patchWizard(side === 'a' ? { deviceA: d.id } : { deviceB: d.id })
                navigate(side === 'a' ? '/puerto/a' : '/puerto/b')
              }}
            />
          )
        })}
      </div>
    </Shell>
  )
}

export function HomePage() {
  const { t, resetWizard } = useApp()
  const navigate = useNavigate()

  return (
    <Shell>
      <section className="hero-home">
        <div className="mark-wrap">
          <CableMark className="mark-camera" />
        </div>
        <h1>{t.appName}</h1>
        <p>{t.tagline}</p>
        <p className="muted" style={{ maxWidth: '36ch' }}>
          {t.affiliateDisclaimer}
        </p>
        <div className="stack">
          <button
            className="btn secondary"
            type="button"
            onClick={() => {
              resetWizard()
              navigate('/foto/a')
            }}
          >
            <IconCamera />
            {t.takePhoto}
          </button>
          <button
            className="btn primary"
            type="button"
            onClick={() => {
              resetWizard()
              navigate('/dispositivo/a')
            }}
          >
            <IconSearch />
            {t.searchDevice}
          </button>
        </div>
      </section>
    </Shell>
  )
}
