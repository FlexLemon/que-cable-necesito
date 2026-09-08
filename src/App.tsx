import { HashRouter, Navigate, Route, Routes } from 'react-router-dom'
import { AppProvider } from './context/AppContext'
import { DevicePage, HomePage } from './pages/HomeDevices'
import { CameraPage } from './pages/CameraPage'
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
          <Route path="/foto/a" element={<CameraPage side="a" />} />
          <Route path="/foto/b" element={<CameraPage side="b" />} />
          <Route path="/dispositivo/a" element={<DevicePage side="a" />} />
          <Route path="/dispositivo/b" element={<DevicePage side="b" />} />
          <Route path="/puerto/a" element={<PortPage side="a" />} />
          <Route path="/puerto/b" element={<PortPage side="b" />} />
          <Route path="/uso" element={<UsagePage />} />
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
