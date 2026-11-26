import { useEffect, useState } from 'react'
import { msalInstance, loginRequest } from '../auth/msalConfig'
import { env } from '../config/env'

export interface JobEvent { step?: string; status?: string; message?: string }
export function useJobStream(jobId?: string) {
  const [event, setEvent] = useState<JobEvent | null>(null)
  useEffect(() => {
    if (!jobId) return
    let source: EventSource | undefined
    let cancelled = false
    let retry: ReturnType<typeof setTimeout> | undefined
    const connect = async () => {
      try {
        const account = msalInstance.getActiveAccount() ?? msalInstance.getAllAccounts()[0]
        const token = !env.authDisabled && account
          ? (await msalInstance.acquireTokenSilent({ ...loginRequest, account })).accessToken
          : ''
        if (cancelled) return
        const url = new URL(`${env.apiBaseUrl}/streams/jobs/${encodeURIComponent(jobId)}`, window.location.origin)
        if (token) url.searchParams.set('access_token', token)
        source = new EventSource(url.toString())
        source.onmessage = (message) => {
          try { setEvent(JSON.parse(message.data) as JobEvent) } catch { setEvent({ message: 'Aggiornamento ricevuto' }) }
        }
        source.onerror = () => {
          source?.close()
          if (!cancelled) retry = setTimeout(() => void connect(), 2500)
        }
      } catch {
        if (!cancelled) retry = setTimeout(() => void connect(), 2500)
      }
    }
    void connect()
    return () => { cancelled = true; source?.close(); if (retry) clearTimeout(retry) }
  }, [jobId])
  return event
}
