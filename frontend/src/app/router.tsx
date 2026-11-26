import { Navigate, Route, Routes } from 'react-router-dom'
import { RoleGuard } from '../auth/RoleGuard'
import { AppShell } from '../components/layout/AppShell'
import { DeckListPage } from '../features/decks/DeckListPage'
import { DeckCreatePage } from '../features/decks/DeckCreatePage'
import { DeckDetailPage } from '../features/decks/DeckDetailPage'
import { FlowGalleryPage } from '../features/flows/FlowGalleryPage'
import { FlowStudioPage } from '../features/flows/FlowStudioPage'
import { ChartLibraryPage } from '../features/charts/ChartLibraryPage'
import { ImageStudioPage } from '../features/images/ImageStudioPage'
import { TemplateManagerPage } from '../features/governance/TemplateManagerPage'
import { StylePresetsPage } from '../features/governance/StylePresetsPage'
import { CostDashboardPage } from '../features/costs/CostDashboardPage'

export function AppRouter() {
  return (
    <Routes>
      <Route element={<AppShell />}>
        <Route index element={<Navigate to="/decks" replace />} />
        <Route path="/decks" element={<DeckListPage />} />
        <Route path="/decks/new" element={<DeckCreatePage />} />
        <Route path="/decks/:deckId" element={<DeckDetailPage />} />
        <Route path="/flows" element={<FlowGalleryPage />} />
        <Route path="/flows/new" element={<FlowStudioPage />} />
        <Route path="/flows/:flowId" element={<FlowStudioPage />} />
        <Route path="/charts" element={<ChartLibraryPage />} />
        <Route path="/images" element={<ImageStudioPage />} />
        <Route path="/templates" element={<RoleGuard><TemplateManagerPage /></RoleGuard>} />
        <Route path="/styles" element={<RoleGuard><StylePresetsPage /></RoleGuard>} />
        <Route path="/costs" element={<CostDashboardPage />} />
        <Route path="*" element={<Navigate to="/decks" replace />} />
      </Route>
    </Routes>
  )
}
