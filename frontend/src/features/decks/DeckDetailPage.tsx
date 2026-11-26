import { useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { Download, Eye, FileJson, RefreshCw } from 'lucide-react'
import { JobCostCard } from '../../components/telemetry/JobCostCard'
import { RebuildDeckModal } from './RebuildDeckModal'

export function DeckDetailPage() {
  const { deckId = 'deck-01' } = useParams()
  const [rebuild, setRebuild] = useState(false)
  const [lightbox, setLightbox] = useState<number | null>(null)
  return (
    <>
      <div className="page-heading"><div><Link to="/decks" className="muted small">← Presentazioni</Link><p className="eyebrow" style={{ marginTop: 15 }}>PRESENTAZIONE · {deckId}</p><h1>Strategia di crescita 2025</h1><p>bami-standard@1.0.0 · 18 slide · Completato oggi alle 09:42</p></div><button className="button button-primary"><Download size={14} /> PowerPoint (.pptx)</button></div>
      <div className="two-column">
        <section className="panel"><div className="panel-head"><h2>Anteprime (18)</h2><span className="muted small">Seleziona una slide per ingrandire</span></div><div className="panel-body"><div className="card-grid">{Array.from({ length: 6 }, (_, index) => <button className="asset-card" key={index} onClick={() => setLightbox(index + 1)}><div className="asset-visual"><Eye size={23} /></div><h3>Slide {String(index + 1).padStart(2, '0')}</h3><p>Visualizza anteprima</p></button>)}</div></div></section>
        <div style={{ display: 'grid', alignContent: 'start', gap: 14 }}>
          <section className="panel"><div className="panel-head"><h2>Azioni</h2></div><div className="panel-body" style={{ display: 'grid', gap: 9 }}><button className="button"><FileJson size={14} /> Scarica deck.json</button><button className="button" onClick={() => setRebuild(true)}><RefreshCw size={14} /> Ricostruisci (costo 0)</button><button className="button">Rigenera (con costo)</button><div className="asset-meta"><a href="#">brief.yml</a><a href="#">outline.json</a><a href="#">log</a></div></div></section>
          <JobCostCard />
        </div>
      </div>
      {rebuild && <RebuildDeckModal deckId={deckId} onClose={() => setRebuild(false)} />}
      {lightbox && <div className="lightbox" role="dialog" aria-modal="true" aria-label={`Anteprima slide ${lightbox}`} onClick={() => setLightbox(null)}><div className="lightbox-content"><button className="icon-only" aria-label="Chiudi" onClick={() => setLightbox(null)}>×</button><div className="asset-visual" style={{ height: '60vh' }}><h2>Slide {lightbox}</h2></div></div></div>}
    </>
  )
}
