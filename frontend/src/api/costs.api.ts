import { apiClient } from './client'
import type { StudioUser } from '../auth/useCurrentUser'

export interface CostSummary { total_usd: number; jobs: number; images: number; average_deck: number; month_change: number }
export const getCostSummary = (user: StudioUser) =>
  apiClient<CostSummary>(`/costs/summary${user.roles.includes('Studio.Admin') ? '' : `?user_oid=${encodeURIComponent(user.oid)}`}`)
export async function downloadCostCsv(user: StudioUser) {
  const scope = user.roles.includes('Studio.Admin') ? '' : `?user_oid=${encodeURIComponent(user.oid)}`
  const response = await fetch(`/api/v1/costs/export${scope}`)
  if (!response.ok) throw new Error('Impossibile esportare il report costi')
  const blob = await response.blob()
  const url = URL.createObjectURL(blob)
  const anchor = document.createElement('a')
  anchor.href = url
  anchor.download = 'presentation-studio-costs.csv'
  anchor.click()
  URL.revokeObjectURL(url)
}
