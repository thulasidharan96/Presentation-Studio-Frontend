import { useState } from 'react'
import { Link } from 'react-router-dom'
import { ArrowUpRight, GitBranch, Plus, Upload } from 'lucide-react'

const flows = [
  { title: 'Onboarding cliente', slug: 'client-onboarding', version: 'v1', tags: ['Operations', 'Customer'], date: 'Aggiornato oggi' },
  { title: 'Gestione reclami', slug: 'claims-process', version: 'v3', tags: ['Service', 'Risk'], date: 'Aggiornato 2 giorni fa' },
  { title: 'Richiesta acquisto', slug: 'purchase-request', version: 'v2', tags: ['Finance'], date: 'Aggiornato 12 giugno' },
]

export function FlowGalleryPage() {
  const [filter, setFilter] = useState('')
  const [showImport, setShowImport] = useState(false)
  return <><div className="page-heading"><div><p className="eyebrow">PROCESS STUDIO</p><h1>Flow</h1><p>Processi chiari, condivisi e pronti a evolvere.</p></div><div><button className="button" onClick={() => setShowImport(true)}><Upload size={14} /> Importa JSON</button> <Link to="/flows/new" className="button button-primary"><Plus size={14} /> Nuova flow</Link></div></div>
    <div className="toolbar"><input className="field" placeholder="Cerca flow..." value={filter} onChange={(event) => setFilter(event.target.value)} /><span className="muted small">{flows.filter((flow) => flow.title.toLowerCase().includes(filter.toLowerCase())).length} processi</span></div>
    <div className="card-grid">{flows.filter((flow) => flow.title.toLowerCase().includes(filter.toLowerCase())).map((flow) => <Link className="asset-card flow-card" to="/flows/new" key={flow.slug}><div className="asset-visual"><GitBranch size={28} /></div><div className="asset-meta"><span className="tag">{flow.version}</span><span>{flow.date}</span></div><h3>{flow.title} <ArrowUpRight size={13} /></h3><p>{flow.slug}</p><div className="asset-meta">{flow.tags.map((tag) => <span className="tag" key={tag}>{tag}</span>)}</div></Link>)}</div>
    {showImport && <div className="modal-backdrop" onClick={() => setShowImport(false)}><div className="modal panel" role="dialog" aria-modal="true" onClick={(event) => event.stopPropagation()}><div className="panel-head"><h2>Importa flow JSON</h2><button className="icon-only" onClick={() => setShowImport(false)}>×</button></div><div className="panel-body"><input type="file" accept=".json,application/json" className="field" /><p className="muted small">Seleziona un file JSON conforme allo schema Flow.</p><button className="button button-primary" onClick={() => setShowImport(false)}>Importa</button></div></div></div>}
  </>
}
