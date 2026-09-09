import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from 'react'
import { getCopy, type Copy } from '../lib/i18n'
import {
  loadHistory,
  loadLang,
  loadNotif,
  loadTheme,
  loadWizard,
  saveHistory,
  saveLang,
  saveNotif,
  saveTheme,
  saveWizard,
} from '../lib/storage'
import type { HistoryItem, Lang, Theme, WizardState } from '../types'

type AppContextValue = {
  wizard: WizardState
  patchWizard: (partial: WizardState) => void
  resetWizard: () => void
  history: HistoryItem[]
  addHistory: (item: HistoryItem) => void
  clearHistory: () => void
  theme: Theme
  setTheme: (theme: Theme) => void
  lang: Lang
  setLang: (lang: Lang) => void
  notif: boolean
  setNotif: (on: boolean) => void
  t: Copy
}

const AppContext = createContext<AppContextValue | null>(null)

export function AppProvider({ children }: { children: ReactNode }) {
  const [wizard, setWizard] = useState<WizardState>(loadWizard)
  const [history, setHistory] = useState<HistoryItem[]>(loadHistory)
  const [theme, setThemeState] = useState<Theme>(loadTheme)
  const [lang, setLangState] = useState<Lang>(loadLang)
  const [notif, setNotifState] = useState<boolean>(loadNotif)

  useEffect(() => saveWizard(wizard), [wizard])
  useEffect(() => saveHistory(history), [history])
  useEffect(() => {
    saveTheme(theme)
    document.documentElement.dataset.theme = theme
  }, [theme])
  useEffect(() => {
    saveLang(lang)
    document.documentElement.lang = lang
  }, [lang])
  useEffect(() => saveNotif(notif), [notif])

  useEffect(() => {
    document.documentElement.dataset.theme = loadTheme()
  }, [])

  const patchWizard = useCallback((partial: WizardState) => {
    setWizard((w) => ({ ...w, ...partial }))
  }, [])

  const resetWizard = useCallback(() => setWizard({}), [])

  const addHistory = useCallback((item: HistoryItem) => {
    setHistory((list) => [item, ...list.filter((x) => x.id !== item.id)].slice(0, 50))
  }, [])

  const clearHistory = useCallback(() => setHistory([]), [])

  const value = useMemo<AppContextValue>(
    () => ({
      wizard,
      patchWizard,
      resetWizard,
      history,
      addHistory,
      clearHistory,
      theme,
      setTheme: setThemeState,
      lang,
      setLang: setLangState,
      notif,
      setNotif: setNotifState,
      t: getCopy(lang),
    }),
    [wizard, patchWizard, resetWizard, history, addHistory, clearHistory, theme, lang, notif],
  )

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>
}

export function useApp() {
  const ctx = useContext(AppContext)
  if (!ctx) throw new Error('useApp outside provider')
  return ctx
}
