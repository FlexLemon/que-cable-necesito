import type { HistoryItem, Lang, Theme, WizardState } from '../types'

const WIZARD = 'qcn-wizard'
const HISTORY = 'qcn-history'
const THEME = 'qcn-theme'
const LANG = 'qcn-lang'
const NOTIF = 'qcn-notif'

export function loadWizard(): WizardState {
  try {
    return JSON.parse(sessionStorage.getItem(WIZARD) ?? '{}') as WizardState
  } catch {
    return {}
  }
}

export function saveWizard(state: WizardState) {
  sessionStorage.setItem(WIZARD, JSON.stringify(state))
}

export function loadHistory(): HistoryItem[] {
  try {
    return JSON.parse(localStorage.getItem(HISTORY) ?? '[]') as HistoryItem[]
  } catch {
    return []
  }
}

export function saveHistory(items: HistoryItem[]) {
  localStorage.setItem(HISTORY, JSON.stringify(items))
}

export function loadTheme(): Theme {
  return localStorage.getItem(THEME) === 'dark' ? 'dark' : 'light'
}

export function saveTheme(theme: Theme) {
  localStorage.setItem(THEME, theme)
}

export function loadLang(): Lang {
  return localStorage.getItem(LANG) === 'en' ? 'en' : 'es'
}

export function saveLang(lang: Lang) {
  localStorage.setItem(LANG, lang)
}

export function loadNotif(): boolean {
  return localStorage.getItem(NOTIF) !== 'off'
}

export function saveNotif(on: boolean) {
  localStorage.setItem(NOTIF, on ? 'on' : 'off')
}
