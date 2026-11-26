import { PublicClientApplication, type Configuration } from '@azure/msal-browser'
import { env } from '../config/env'

const configuration: Configuration = {
  auth: {
    clientId: env.clientId || '00000000-0000-0000-0000-000000000000',
    authority: `https://login.microsoftonline.com/${env.tenantId}`,
    redirectUri: window.location.origin,
    postLogoutRedirectUri: window.location.origin,
  },
  cache: { cacheLocation: 'sessionStorage' },
}

export const msalInstance = new PublicClientApplication(configuration)
export const loginRequest = { scopes: env.apiScope ? [env.apiScope] : ['User.Read'] }
