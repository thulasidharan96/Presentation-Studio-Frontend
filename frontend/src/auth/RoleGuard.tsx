import { Navigate } from 'react-router-dom'
import { useCurrentUser } from './useCurrentUser'

export function RoleGuard({ children, roles = ['Studio.Admin'] }: { children: React.ReactNode; roles?: string[] }) {
  const user = useCurrentUser()
  if (!roles.some((role) => user.roles.includes(role))) return <Navigate to="/decks" replace />
  return children
}
