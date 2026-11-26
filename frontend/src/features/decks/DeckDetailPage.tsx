import { useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import { Download, Eye, FileJson, RefreshCw } from 'lucide-react'
import { JobCostCard } from '../../components/telemetry/JobCostCard'
import { downloadDeckArtifact } from '../../api/download'
import { getDeck } from '../../api/decks.api'
import { RebuildDeckModal } from './RebuildDeckModal'

export function DeckDetailPage() {
  const { deckId = 'deck-01' } = useParams()
  const { data: deck } = useQuery({ queryKey: ['deck', deckId], queryFn: () => getDeck(deckId), retry: false })
  const [rebuild, setRebuild] = useState(false)
  const [lightbox, setLightbox] = useState<number | null>(null)
  return (
    <>
      <div className="page-heading"><div><Link to="/decks" className="muted small">← Presentazioni</Link><p className="eyebrow" style={{ marginTop: 15 }}>PRESENTAZIONE · {deckId}</p><h1>{deck?.title ?? (import.meta.env.DEV ? 'Strategia di crescita 2025' : 'Presentazione')}</h1><p>{deck?.template ?? 'bami-standard@1.0.0'} · {deck?.slides ?? 18} slide · Completato</p></div><button className="button button-primary" onClick={() => void downloadDeckArtifact(deckId, 'presentation.pptx')}><Download size={14} /> PowerPoint (.pptx)</button></div>
      <div className="two-column">
        <section className="panel"><div className="panel-head"><h2>Anteprime (18)</h2><span className="muted small">Seleziona una slide per ingrandire</span></div><div className="panel-body"><div className="card-grid">{Array.from({ length: 6 }, (_, index) => <button className="asset-card" key={index} onClick={() => setLightbox(index + 1)}><div className="asset-visual"><Eye size={23} /></div><h3>Slide {String(index + 1).padStart(2, '0')}</h3><p>Visualizza anteprima</p></button>)}</div></div></section>
        <div style={{ display: 'grid', alignContent: 'start', gap: 14 }}>
          <section className="panel"><div className="panel-head"><h2>Azioni</h2></div><div className="panel-body" style={{ display: 'grid', gap: 9 }}><button className="button" onClick={() => void downloadDeckArtifact(deckId, 'deck.json')}><FileJson size={14} /> Scarica deck.json</button><button className="button" onClick={() => setRebuild(true)}><RefreshCw size={14} /> Ricostruisci (costo 0)</button><button className="button">Rigenera (con costo)</button><div className="asset-meta"><button className="button" onClick={() => void downloadDeckArtifact(deckId, 'brief.yml')}>brief.yml</button><button className="button" onClick={() => void downloadDeckArtifact(deckId, 'outline.json')}>outline.json</button><button className="button" onClick={() => void downloadDeckArtifact(deckId, 'log')}>log</button></div></div></section>
          <JobCostCard />
        </div>
      </div>
      {rebuild && <RebuildDeckModal deckId={deckId} onClose={() => setRebuild(false)} />}
      {lightbox && <div className="lightbox" role="dialog" aria-modal="true" aria-label={`Anteprima slide ${lightbox}`} onClick={() => setLightbox(null)}><div className="lightbox-content"><button className="icon-only" aria-label="Chiudi" onClick={() => setLightbox(null)}>×</button><div className="asset-visual" style={{ height: '60vh' }}><h2>Slide {lightbox}</h2></div></div></div>}
    </>
  )
}
