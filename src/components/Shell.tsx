import type { ReactNode } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import { useApp } from '../context/AppContext'
import { IconBack, IconClock, IconGear, IconHome } from './Icons'

export function Shell({
  title,
  back,
  children,
  hideNav = false,
}: {
  title?: string
  back?: string
  children: ReactNode
  hideNav?: boolean
}) {
  const navigate = useNavigate()
  const { t } = useApp()

  return (
    <div className="phone">
      <div className="phone-inner">
        {title ? (
          <header className="topbar">
            {back ? (
              <button className="icon-btn" type="button" onClick={() => navigate(back)} aria-label="Atrás">
                <IconBack />
              </button>
            ) : (
              <span className="icon-btn ghost" />
            )}
            <h1>{title}</h1>
            <span className="icon-btn ghost" />
          </header>
        ) : null}
        <main className={`page ${hideNav ? 'page-full' : ''}`}>{children}</main>
        {hideNav ? null : (
          <nav className="tabbar">
            <NavLink to="/" end className={({ isActive }) => (isActive ? 'tab active' : 'tab')}>
              <IconHome />
              {t.home}
            </NavLink>
            <NavLink to="/historial" className={({ isActive }) => (isActive ? 'tab active' : 'tab')}>
              <IconClock />
              {t.history}
            </NavLink>
            <NavLink to="/ajustes" className={({ isActive }) => (isActive ? 'tab active' : 'tab')}>
              <IconGear />
              {t.settings}
            </NavLink>
          </nav>
        )}
      </div>
    </div>
  )
}

export function PrimaryButton({
  children,
  onClick,
  type = 'button',
  disabled,
}: {
  children: ReactNode
  onClick?: () => void
  type?: 'button' | 'submit'
  disabled?: boolean
}) {
  return (
    <button className="btn primary" type={type} onClick={onClick} disabled={disabled}>
      {children}
    </button>
  )
}

export function SecondaryButton({
  children,
  onClick,
}: {
  children: ReactNode
  onClick?: () => void
}) {
  return (
    <button className="btn secondary" type="button" onClick={onClick}>
      {children}
    </button>
  )
}

export function Row({
  icon,
  title,
  subtitle,
  onClick,
  selected,
  radio,
}: {
  icon?: ReactNode
  title: string
  subtitle?: string
  onClick: () => void
  selected?: boolean
  radio?: boolean
}) {
  return (
    <button className={`row ${selected ? 'selected' : ''}`} type="button" onClick={onClick}>
      {icon ? <span className="row-icon">{icon}</span> : null}
      <span className="row-text">
        <strong>{title}</strong>
        {subtitle ? <small>{subtitle}</small> : null}
      </span>
      {radio ? <span className={`radio ${selected ? 'on' : ''}`} /> : <span className="chevron">›</span>}
    </button>
  )
}
