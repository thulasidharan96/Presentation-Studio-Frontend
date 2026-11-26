import { useState } from 'react'
import { useMutation } from '@tanstack/react-query'
import { Dice5, Sparkles } from 'lucide-react'
import { generateImage } from '../../api/images.api'

const blockedTerms = ['coca-cola', 'disney', 'mickey mouse']
const chips = ['Innovazione', 'Sostenibilità', 'Teamwork', 'Futuro digitale']

export function ImageGeneratorForm() {
  const [prompt, setPrompt] = useState('')
  const [ratio, setRatio] = useState('16:9')
  const blocked = blockedTerms.find((term) => prompt.toLowerCase().includes(term))
  const mutation = useMutation({ mutationFn: () => generateImage({ prompt, aspect_ratio: ratio, variants: 1 }), onSuccess: () => setPrompt('') })
  return <section className="panel"><div className="panel-head"><h2>Genera</h2><span className="tag"><Sparkles size={12} /> AI Studio</span></div><div className="panel-body">
    <label className="form-field">Soggetto<textarea className="textarea" rows={5} maxLength={1000} value={prompt} onChange={(event) => setPrompt(event.target.value)} placeholder="Descrivi l'immagine che vuoi creare..." /></label><div className="asset-meta"><span>{prompt.length} / 1000</span><span className="muted">Prompt libero, niente testo nell'immagine</span></div>
    {blocked && <p className="warning" role="alert">Il prompt contiene un brand o termine non consentito: “{blocked}”. Rimuovilo prima di continuare.</p>}
    <div className="chip-row">{chips.map((chip) => <button className="tag chip" key={chip} onClick={() => setPrompt((current) => `${current}${current ? ', ' : ''}${chip.toLowerCase()}`)}>{chip}</button>)}</div>
    <div className="form-grid image-options"><label className="form-field">Formato<select className="select"><option>Aspect ratio</option><option>Box slide</option></select></label><label className="form-field">Stile BAMI <input type="checkbox" defaultChecked /></label><label className="form-field">Rapporto<select className="select" value={ratio} onChange={(event) => setRatio(event.target.value)}>{['16:9', '3:4', '21:9', '1:1'].map((value) => <option key={value}>{value}</option>)}</select></label><label className="form-field">Varianti<select className="select"><option>1</option><option>2</option><option>3</option><option>4</option></select></label></div>
    <label className="form-field" style={{ marginTop: 13 }}>Seed<div className="seed-field"><input className="field" type="number" placeholder="Casuale" /><button className="icon-only" aria-label="Genera seed casuale" onClick={() => { const input = document.querySelector<HTMLInputElement>('.seed-field input'); if (input) input.value = String(Math.floor(Math.random() * 1_000_000)) }}><Dice5 size={14} /></button></div></label>
    {mutation.isError && <p role="alert" className="small">Generazione non riuscita. Riprova.</p>}
    <button className="button button-primary full-width" style={{ marginTop: 16 }} disabled={!prompt.trim() || Boolean(blocked) || mutation.isPending} onClick={() => mutation.mutate()}>{mutation.isPending ? 'Generazione…' : 'Genera immagine'}</button>
  </div></section>
}
