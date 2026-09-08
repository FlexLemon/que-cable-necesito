import { useState } from 'react'
import { Shell } from '../components/Shell'
import { useApp } from '../context/AppContext'
import type { Lang, Theme } from '../types'

export function SettingsPage() {
  const { t, theme, setTheme, lang, setLang, notif, setNotif, clearHistory } = useApp()
  const [modal, setModal] = useState<'about' | 'privacy' | 'terms' | null>(null)

  const body =
    modal === 'about' ? t.aboutBody : modal === 'privacy' ? t.privacyBody : modal === 'terms' ? t.termsBody : ''

  return (
    <Shell title={t.settings}>
      <div className="settings">
        <label className="setting">
          <span>{t.notifications}</span>
          <input type="checkbox" checked={notif} onChange={(e) => setNotif(e.target.checked)} />
        </label>
        <label className="setting">
          <span>{t.language}</span>
          <select value={lang} onChange={(e) => setLang(e.target.value as Lang)}>
            <option value="es">Español</option>
            <option value="en">English</option>
          </select>
        </label>
        <label className="setting">
          <span>{t.theme}</span>
          <select value={theme} onChange={(e) => setTheme(e.target.value as Theme)}>
            <option value="light">{t.light}</option>
            <option value="dark">{t.dark}</option>
          </select>
        </label>
        <button className="setting danger" type="button" onClick={clearHistory}>
          {t.clearHistory}
        </button>
        <button className="setting" type="button" onClick={() => setModal('about')}>
          {t.about}
        </button>
        <a className="setting" href="mailto:feedback@quecable.app?subject=Feedback">
          {t.feedback}
        </a>
        <button className="setting" type="button" onClick={() => setModal('privacy')}>
          {t.privacy}
        </button>
        <button className="setting" type="button" onClick={() => setModal('terms')}>
          {t.terms}
        </button>
      </div>

      {modal ? (
        <div className="modal" role="dialog">
          <div className="modal-card">
            <p>{body}</p>
            <button className="btn primary" type="button" onClick={() => setModal(null)}>
              OK
            </button>
          </div>
        </div>
      ) : null}
    </Shell>
  )
}
