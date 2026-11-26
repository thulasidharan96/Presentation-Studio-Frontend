import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { msalInstance } from './auth/msalConfig'
import { App } from './app/App'
import './index.css'

async function start() {
  await msalInstance.initialize()
  const response = await msalInstance.handleRedirectPromise()
  if (response?.account) msalInstance.setActiveAccount(response.account)
  else if (!msalInstance.getActiveAccount() && msalInstance.getAllAccounts()[0]) {
    msalInstance.setActiveAccount(msalInstance.getAllAccounts()[0]!)
  }
  createRoot(document.getElementById('root')!).render(<StrictMode><App /></StrictMode>)
}

void start()
