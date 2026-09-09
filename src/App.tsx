import { HashRouter, Navigate, Route, Routes } from 'react-router-dom'
import { AppProvider } from './context/AppContext'
import { DevicePage, HomePage } from './pages/HomeDevices'
import { IdentifyPage } from './pages/IdentifyPage'
import { CameraPage } from './pages/CameraPage'
import { ScanPage } from './pages/ScanPage'
import { PortPage } from './pages/PortPage'
import { UsagePage } from './pages/UsagePage'
import { ResultPage } from './pages/ResultPage'
import { CablesPage } from './pages/CablesPage'
import { HistoryPage } from './pages/HistoryPage'
import { SettingsPage } from './pages/SettingsPage'

export default function App() {
  return (
    <AppProvider>
      <HashRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/dispositivo" element={<DevicePage />} />
          <Route path="/uso" element={<UsagePage />} />
          <Route path="/identificar" element={<IdentifyPage />} />
          <Route path="/foto" element={<CameraPage />} />
          <Route path="/foto-panel" element={<ScanPage />} />
          <Route path="/puerto" element={<PortPage />} />
          <Route path="/resultado" element={<ResultPage />} />
          <Route path="/cables" element={<CablesPage />} />
          <Route path="/historial" element={<HistoryPage />} />
          <Route path="/ajustes" element={<SettingsPage />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </HashRouter>
    </AppProvider>
  )
}
