declare global {
  interface Window {
    __ENV__?: Record<string, string | undefined>
  }
}

const read = (key: string, fallback = ''): string =>
  window.__ENV__?.[key] || (import.meta.env[key] as string | undefined) || fallback

export const env = {
  apiBaseUrl: read('VITE_API_BASE_URL', '/api/v1'),
  tenantId: read('VITE_AZURE_TENANT_ID', 'common'),
  clientId: read('VITE_AZURE_CLIENT_ID'),
  apiScope: read('VITE_AZURE_API_SCOPE'),
  promptBlocklist: read('VITE_PROMPT_BLOCKLIST').split(',').map((term) => term.trim()).filter(Boolean),
  authDisabled: read('VITE_AUTH_DISABLED') === 'true',
  version: read('VITE_APP_VERSION', 'v0.1.2_dev'),
}

export {}
