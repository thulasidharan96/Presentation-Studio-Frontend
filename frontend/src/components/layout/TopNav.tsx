import { NavLink } from 'react-router-dom'
import { Moon, Sun, Presentation, ShieldCheck } from 'lucide-react'
import { useCurrentUser } from '../../auth/useCurrentUser'
import { env } from '../../config/env'
import { useStudioStore } from '../../app/store'

const links: Array<[string, string]> = [
  ['Nuova', '/decks/new'],
  ['Presentazioni', '/decks'],
  ['Template', '/templates'],
  ['Flow', '/flows'],
  ['Grafici', '/charts'],
  ['Immagini', '/images'],
  ['Stili', '/styles'],
  ['Costi', '/costs'],
]

export function TopNav() {
  const user = useCurrentUser()
  const theme = useStudioStore((state) => state.theme)
  const toggleTheme = useStudioStore((state) => state.toggleTheme)
  return (
    <header className="topbar">
      <NavLink to="/decks" className="brand">
        <span className="brand-mark"><Presentation size={18} /></span>
        <span><strong>Presentation Studio</strong><small>AI creative workspace</small></span>
      </NavLink>
      <nav className="main-nav" aria-label="Navigazione principale">
        {links.map(([label, to]) => (
          <NavLink key={to} to={to} className={({ isActive }) => `nav-link${isActive ? ' active' : ''}`}>
            {label}
          </NavLink>
        ))}
      </nav>
      <div className="top-controls">
        <button className="icon-button" aria-label={theme === 'light' ? 'Attiva tema scuro' : 'Attiva tema chiaro'} onClick={toggleTheme}>
          {theme === 'light' ? <Moon size={17} /> : <Sun size={17} />}
          <span>Scuro</span>
        </button>
        <span className="version-badge">{env.version}</span>
        {user.roles.includes('Studio.Admin') && <span className="admin-badge"><ShieldCheck size={13} /> Admin</span>}
        <span className="user-email">{user.email}</span>
        <span className="user-avatar" title={user.email}>{user.name.slice(0, 1).toUpperCase()}</span>
      </div>
    </header>
  )
}
