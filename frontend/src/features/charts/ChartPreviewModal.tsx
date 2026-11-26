import { useState } from 'react'
import { X } from 'lucide-react'

export function ChartPreviewModal({ title, onClose }: { title: string; onClose: () => void }) {
  const [values, setValues] = useState('42, 68, 51, 83')
  const valid = values.split(',').every((value) => Number.isFinite(Number(value.trim())))
  return <div className="modal-backdrop" onClick={onClose}><section className="modal panel" role="dialog" aria-modal="true" aria-labelledby="chart-title" onClick={(event) => event.stopPropagation()}><div className="panel-head"><h2 id="chart-title">{title}</h2><button className="icon-only" aria-label="Chiudi" onClick={onClose}><X size={15} /></button></div><div className="panel-body"><label className="form-field">Dati (valori separati da virgola)<input className="field" value={values} onChange={(event) => setValues(event.target.value)} /></label>{valid ? <div className="chart-preview">{values.split(',').map((value, index) => <div className="chart-bar" style={{ height: `${Math.min(100, Math.max(4, Number(value.trim())))}%` }} key={index}><span>{value.trim()}</span></div>)}</div> : <p className="small" role="alert">Inserisci una lista di valori numerici.</p>}<button disabled={!valid} className="button button-primary">Usa nel deck</button></div></section></div>
}
