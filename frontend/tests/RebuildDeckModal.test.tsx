import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { fireEvent, render, screen, waitFor } from '@testing-library/react'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import { rebuildDeck } from '../src/api/decks.api'
import { RebuildDeckModal } from '../src/features/decks/RebuildDeckModal'

vi.mock('../src/api/decks.api', () => ({ rebuildDeck: vi.fn() }))

describe('RebuildDeckModal', () => {
  beforeEach(() => vi.clearAllMocks())
  it('validates JSON Patch and submits the deterministic zero-cost payload', async () => {
    vi.mocked(rebuildDeck).mockResolvedValue({})
    render(<QueryClientProvider client={new QueryClient({ defaultOptions: { mutations: { retry: false } } })}><RebuildDeckModal deckId="deck-1" onClose={vi.fn()} /></QueryClientProvider>)
    expect(screen.getByText(/costo.*\$0\.00/i)).toBeInTheDocument()
    fireEvent.click(screen.getByRole('button', { name: /Patch JSON opzionale/i }))
    expect(await screen.findByText('Patch RFC 6902 valida')).toBeInTheDocument()
    fireEvent.click(screen.getByRole('button', { name: /Ricostruisci · \$0\.00/i }))
    await waitFor(() => expect(rebuildDeck).toHaveBeenCalledWith('deck-1', { template_version: '1.0.0', patch: [] }))
  })
})
