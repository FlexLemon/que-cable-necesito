import { useApp } from '../context/AppContext'

function FlagES() {
  return (
    <svg viewBox="0 0 21 15" aria-hidden>
      <rect width="21" height="15" rx="2" fill="#AA151B" />
      <rect y="4" width="21" height="7" fill="#F1BF00" />
    </svg>
  )
}

function FlagGB() {
  return (
    <svg viewBox="0 0 21 15" aria-hidden>
      <rect width="21" height="15" rx="2" fill="#012169" />
      <path d="M0 0 21 15M21 0 0 15" stroke="#fff" strokeWidth="3" />
      <path d="M0 0 21 15M21 0 0 15" stroke="#C8102E" strokeWidth="1.4" />
      <path d="M10.5 0v15M0 7.5h21" stroke="#fff" strokeWidth="5" />
      <path d="M10.5 0v15M0 7.5h21" stroke="#C8102E" strokeWidth="2.6" />
    </svg>
  )
}

export function PrefsBar() {
  const { t, theme, setTheme, lang, setLang } = useApp()
  const dark = theme === 'dark'

  return (
    <div className="prefs-bar">
      <div className="lang-flags" role="group" aria-label={t.language}>
        <button
          className={`flag-btn ${lang === 'es' ? 'on' : ''}`}
          type="button"
          onClick={() => setLang('es')}
          aria-pressed={lang === 'es'}
          aria-label="Español"
        >
          <FlagES />
        </button>
        <button
          className={`flag-btn ${lang === 'en' ? 'on' : ''}`}
          type="button"
          onClick={() => setLang('en')}
          aria-pressed={lang === 'en'}
          aria-label="English"
        >
          <FlagGB />
        </button>
      </div>
      <button
        className={`theme-switch ${dark ? 'on' : ''}`}
        type="button"
        onClick={() => setTheme(dark ? 'light' : 'dark')}
        aria-pressed={dark}
        aria-label={t.darkMode}
      >
        <span className="theme-switch-label">{t.darkMode}</span>
        <span className="theme-switch-track">
          <span className="theme-switch-knob" />
        </span>
      </button>
    </div>
  )
}
