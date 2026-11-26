import { apiClient } from './client'
import type { Deck } from './types'

export const getDecks = () => apiClient<Deck[]>('/decks')
export const getDeck = (id: string) => apiClient<Deck>(`/decks/${encodeURIComponent(id)}`)
export const createDeck = (payload: Record<string, unknown>) =>
  apiClient<{ id: string; job_id?: string }>('/decks', { method: 'POST', body: JSON.stringify(payload) })
export const rebuildDeck = (id: string, payload: { template_version?: string; patch?: unknown[] }) =>
  apiClient(`/decks/${encodeURIComponent(id)}/rebuild`, { method: 'POST', body: JSON.stringify(payload) })
export const deleteDeck = (id: string) =>
  apiClient<void>(`/decks/${encodeURIComponent(id)}`, { method: 'DELETE' })
