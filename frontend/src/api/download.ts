import { apiBlob } from './client'

export async function downloadDeckArtifact(deckId: string, artifact: string) {
  const blob = await apiBlob(`/decks/${encodeURIComponent(deckId)}/artifacts/${encodeURIComponent(artifact)}`)
  const url = URL.createObjectURL(blob)
  const anchor = document.createElement('a')
  anchor.href = url
  anchor.download = artifact
  anchor.click()
  URL.revokeObjectURL(url)
}
