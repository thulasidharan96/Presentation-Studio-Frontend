import { useState } from 'react'
import { BarChart3, Table2, TrendingUp } from 'lucide-react'
import { ChartPreviewModal } from './ChartPreviewModal'

const charts = [
  ['Ricavi per trimestre', 'Colonne', 'native'], ['Evoluzione temporale', 'Timeline', 'native'], ['Ripartizione costi', 'Anello', 'image'],
  ['Performance team', 'Barre', 'native'], ['Composizione portafoglio', 'Treemap', 'image'], ['KPI di servizio', 'Indicatore', 'native'],
  ['Scostamento budget', 'Waterfall', 'native'], ['Distribuzione', 'Istogramma', 'image'], ['Priorità operative', 'Heatmap', 'image'],
]

export function ChartLibraryPage() {
  const [selected, setSelected] = useState('')
  const [search, setSearch] = useState('')
  return <><div className="page-heading"><div><p className="eyebrow">VISUAL LIBRARY</p><h1>Grafici</h1><p>Visualizzazioni governate, coerenti con il tuo brand e pronte per PowerPoint.</p></div><button className="button">Richiedi un grafico</button></div>
    <div className="toolbar"><input className="field" placeholder="Cerca nel catalogo..." value={search} onChange={(event) => setSearch(event.target.value)} /><select className="select"><option>Tutti i tipi</option><option>Colonne</option><option>Timeline</option></select><span className="muted small">{charts.filter(([title]) => title.toLowerCase().includes(search.toLowerCase())).length} visual</span></div>
    <div className="card-grid">{charts.filter(([title]) => title.toLowerCase().includes(search.toLowerCase())).map(([title, type, mode], index) => <button className="asset-card chart-card" key={title} onClick={() => setSelected(title)}><div className="asset-visual">{index % 2 ? <TrendingUp size={28} /> : <BarChart3 size={28} />}</div><div className="asset-meta"><span className="tag">{type}</span><span className="tag">{mode === 'native' ? 'nativo pptx' : 'immagine'}</span></div><h3>{title}</h3><p>Preset aziendale · v1</p></button>)}</div>
    {selected && <ChartPreviewModal title={selected} onClose={() => setSelected('')} />}
  </>
}
