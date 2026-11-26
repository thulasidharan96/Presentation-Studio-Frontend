import { Outlet } from 'react-router-dom'
import { TopNav } from './TopNav'

export function AppShell() {
  return (
    <div className="app-frame">
      <TopNav />
      <main className="main-content"><Outlet /></main>
      <footer className="app-footer">Presentation Studio <span>•</span> Workspace aziendale</footer>
    </div>
  )
}
