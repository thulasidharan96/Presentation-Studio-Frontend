import { useEffect, useRef } from 'react'
import { useMsal } from '@azure/msal-react'
import { InteractionStatus } from '@azure/msal-browser'
import { env } from '../config/env'
import { loginRequest } from './msalConfig'

export function AuthGate({ children }: { children: React.ReactNode }) {
  const { instance, inProgress, accounts } = useMsal()
  const attempted = useRef(false)
  useEffect(() => {
    if (!env.authDisabled && inProgress === InteractionStatus.None && accounts.length === 0 && !attempted.current) {
      attempted.current = true
      void instance.ssoSilent(loginRequest).catch(() => undefined)
    }
  }, [accounts.length, inProgress, instance])
  if (env.authDisabled || accounts.length > 0) return children
  return (
    <main className="auth-screen">
      <div className="auth-card">
        <div className="brand-mark">P</div>
        <p className="eyebrow">PRESENTATION STUDIO</p>
        <h1>Idee chiare.<br />Storie memorabili.</h1>
        <p>Accedi con il tuo account aziendale per creare e condividere contenuti.</p>
        <button className="button button-primary full-width" onClick={() => void instance.loginRedirect(loginRequest)}>
          Accedi con Microsoft
        </button>
      </div>
    </main>
  )
}
