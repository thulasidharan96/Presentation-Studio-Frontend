import { useMemo } from 'react'
import { useMsal } from '@azure/msal-react'
import { env } from '../config/env'

export interface StudioUser {
  oid: string
  email: string
  name: string
  department: string
  roles: string[]
}

export function useCurrentUser(): StudioUser {
  const { accounts } = useMsal()
  return useMemo(() => {
    const claims = accounts[0]?.idTokenClaims as Record<string, unknown> | undefined
    if (env.authDisabled) {
      return {
        oid: 'local-admin',
        email: 'admin@presentation.studio',
        name: 'Studio Admin',
        department: 'Engineering',
        roles: ['Studio.Admin', 'Studio.Creator', 'Studio.Viewer'],
      }
    }
    const roles = Array.isArray(claims?.roles) ? claims.roles.filter((role): role is string => typeof role === 'string') : []
    return {
      oid: typeof claims?.oid === 'string' ? claims.oid : accounts[0]?.localAccountId ?? '',
      email: accounts[0]?.username ?? '',
      name: accounts[0]?.name ?? 'Utente',
      department: typeof claims?.department === 'string' ? claims.department : '',
      roles,
    }
  }, [accounts])
}
