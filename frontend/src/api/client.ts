import { InteractionRequiredAuthError } from '@azure/msal-browser'
import { msalInstance, loginRequest } from '../auth/msalConfig'
import { env } from '../config/env'

export async function apiClient<T>(path: string, init: RequestInit = {}): Promise<T> {
  const account = msalInstance.getActiveAccount() ?? msalInstance.getAllAccounts()[0]
  const headers = new Headers(init.headers)
  if (init.body && !(init.body instanceof FormData)) headers.set('Content-Type', 'application/json')
  if (!env.authDisabled && account) {
    try {
      const token = await msalInstance.acquireTokenSilent({ ...loginRequest, account })
      headers.set('Authorization', ['Bearer', token.accessToken].join(' '))
    } catch (error) {
      if (error instanceof InteractionRequiredAuthError) {
        await msalInstance.acquireTokenRedirect({ ...loginRequest, account })
      }
      throw error
    }
  }
  const response = await fetch(`${env.apiBaseUrl}${path}`, { ...init, headers })
  if (!response.ok) throw new Error(`Richiesta non riuscita (${response.status})`)
  if (response.status === 204) return undefined as T
  return response.json() as Promise<T>
}
