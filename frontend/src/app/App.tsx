import { useEffect } from 'react'
import { MsalProvider } from '@azure/msal-react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { BrowserRouter } from 'react-router-dom'
import { msalInstance } from '../auth/msalConfig'
import { AuthGate } from '../auth/AuthGate'
import { AppRouter } from './router'
import { useStudioStore } from './store'

const queryClient = new QueryClient({
  defaultOptions: { queries: { retry: 1, staleTime: 30_000, refetchOnWindowFocus: false } },
})

function ThemeSync() {
  const theme = useStudioStore((state) => state.theme)
  useEffect(() => {
    document.documentElement.dataset.theme = theme
  }, [theme])
  return null
}

export function App() {
  return (
    <MsalProvider instance={msalInstance}>
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <ThemeSync />
          <AuthGate><AppRouter /></AuthGate>
        </BrowserRouter>
      </QueryClientProvider>
    </MsalProvider>
  )
}
