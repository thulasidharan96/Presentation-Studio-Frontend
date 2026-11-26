import { useMemo, useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { Link } from 'react-router-dom'
import { Download, Plus, Search, SlidersHorizontal } from 'lucide-react'
import { getDecks } from '../../api/decks.api'
import type { Deck } from '../../api/types'
import { RebuildDeckModal } from './RebuildDeckModal'

const demoDecks: Deck[] = [
  { id: 'deck-01', title: 'Strategia di crescita 2025', status: 'completed', template: 'bami-standard@1.0.0', slides: 18, author: 'Laura Bianchi', origin: 'Projects KB', date: 'Oggi, 09:42', cost: 0.84 },
  { id: 'deck-02', title: 'Quarterly business review', status: 'review', template: 'bami-standard@1.0.0', slides: 12, author: 'Marco Riva', origin: 'Prompt', date: 'Ieri, 16:18', cost: 0.63 },
  { id: 'deck-03', title: 'Digital transformation roadmap', status: 'queued', template: 'executive@2.1.0', slides: 16, author: 'Laura Bianchi', origin: 'SharePoint', date: 'Ieri, 11:03', cost: 0.00 },
]

const statusLabel = { completed: 'Completato', queued: 'In coda', review: 'Attende revisione', error: 'Errore' }

export function DeckListPage() {
  const { data } = useQuery({ queryKey: ['decks'], queryFn: getDecks, retry: false })
  const [query, setQuery] = useState('')
  const [status, setStatus] = useState('Tutti')
  const [mine, setMine] = useState(false)
  const [rebuild, setRebuild] = useState<string | null>(null)
  const decks = useMemo(() => (data?.length ? data : demoDecks).filter((deck) =>
    deck.title.toLowerCase().includes(query.toLowerCase()) &&
    (status === 'Tutti' || statusLabel[deck.status] === status) &&
    (!mine || deck.author === 'Laura Bianchi')), [data, mine, query, status])
  return (
    <>
      <div className="page-heading">
        <div><p className="eyebrow">IL TUO WORKSPACE</p><h1>Presentazioni</h1><p>Tutte le tue storie, pronte a prendere forma.</p></div>
        <Link to="/decks/new" className="button button-primary"><Plus size={15} /> Nuova presentazione</Link>
      </div>
      <div className="toolbar">
        <div style={{ position: 'relative' }}><Search size={14} style={{ position: 'absolute', top: 10, left: 12, color: 'var(--muted)' }} /><input aria-label="Cerca presentazioni" className="field" style={{ paddingLeft: 34 }} placeholder="Cerca per titolo o cliente..." value={query} onChange={(event) => setQuery(event.target.value)} /></div>
        <select className="select" aria-label="Filtra per stato" value={status} onChange={(event) => setStatus(event.target.value)}><option>Tutti</option>{Object.values(statusLabel).map((label) => <option key={label}>{label}</option>)}</select>
        <select className="select" aria-label="Filtra per origine"><option>Origine: tutte</option><option>Prompt</option><option>Projects KB</option><option>SharePoint</option></select>
        <select className="select" aria-label="Filtra per template"><option>Template: tutti</option><option>bami-standard</option></select>
        <button className={`button ${mine ? 'button-primary' : ''}`} onClick={() => setMine(!mine)}><SlidersHorizontal size={13} /> Solo le mie {mine ? '✓' : ''}</button>
        <span className="muted small" style={{ marginLeft: 'auto' }}>{decks.length} presentazioni</span>
      </div>
      <section className="panel table-wrap">
        <table><thead><tr><th>TITOLO</th><th>STATO</th><th>TEMPLATE</th><th>SLIDE</th><th>AUTORE</th><th>ORIGINE</th><th>DATA</th><th>COSTO</th><th>AZIONI</th></tr></thead>
          <tbody>{decks.map((deck) => <tr key={deck.id}>
            <td><Link to={`/decks/${deck.id}`}><strong>{deck.title}</strong></Link></td>
            <td><span className={`tag status ${deck.status === 'queued' || deck.status === 'review' ? 'pending' : deck.status === 'error' ? 'error' : ''}`}>{statusLabel[deck.status]}</span></td>
            <td>{deck.template}</td><td>{deck.slides}</td><td>{deck.author}</td><td>{deck.origin}</td><td>{deck.date}</td><td>${deck.cost.toFixed(2)}</td>
            <td><button className="icon-only" title="Scarica PowerPoint" aria-label="Scarica PowerPoint"><Download size={14} /></button> <button className="button" onClick={() => setRebuild(deck.id)}>Ricostruisci</button></td>
          </tr>)}</tbody>
        </table>
        {decks.length === 0 && <div className="empty-state">Nessuna presentazione corrisponde alla ricerca.</div>}
      </section>
      {rebuild && <RebuildDeckModal deckId={rebuild} onClose={() => setRebuild(null)} />}
    </>
  )
}
