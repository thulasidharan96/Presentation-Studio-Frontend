import { Image, Upload } from 'lucide-react'
import type { ChangeEvent } from 'react'
import { useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { getImages, uploadImage, type ImageAsset } from '../../api/images.api'

const demoAssets: ImageAsset[] = [
  { id: 'demo-1', title: 'Workshop di innovazione', aspect_ratio: '16:9', ocr_verified: false, seed: 24891, model: 'gpt-image', cost: 0.08, prompt: 'Collaborazione e workshop creativo' },
  { id: 'demo-2', title: 'Paesaggio urbano sostenibile', aspect_ratio: '3:4', ocr_verified: true, seed: 91734, model: 'gpt-image', cost: 0.08, prompt: 'Architettura sostenibile' },
  { id: 'demo-3', title: 'Collaborazione digitale', aspect_ratio: '16:9', ocr_verified: false, seed: 66318, model: 'gpt-image', cost: 0.08, prompt: 'Team che collabora' },
]

export function ImageLibraryGrid() {
  const [search, setSearch] = useState('')
  const { data } = useQuery({ queryKey: ['images'], queryFn: getImages, retry: false })
  const assets = (data ?? (import.meta.env.DEV ? demoAssets : [])).filter((asset) => asset.title.toLowerCase().includes(search.toLowerCase()))
  const onUpload = async (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      try { await uploadImage(file) }
      catch { window.alert('Caricamento immagine non riuscito. Riprova.') }
    }
  }
  return <section><div className="panel"><div className="panel-head"><h2>Libreria</h2><span className="muted small">{assets.length} asset</span></div><div className="panel-body"><div className="toolbar"><input className="field" placeholder="Cerca nella libreria..." value={search} onChange={(event) => setSearch(event.target.value)} /><select className="select"><option>Tutti i preset</option></select><select className="select"><option>Ogni formato</option></select><label className="upload-button button"><Upload size={13} /> Carica immagine<input type="file" accept="image/*" onChange={(event) => void onUpload(event)} hidden /></label></div>
    <div className="card-grid">{assets.map((asset) => <article className="asset-card" key={asset.id}><div className="asset-visual">{asset.url ? <img src={asset.url} alt={asset.title} /> : <Image size={27} />}</div><h3>{asset.title}</h3><p>{asset.aspect_ratio} · {asset.ocr_verified ? 'testo rilevato' : 'testo non verificato'}</p><div className="asset-meta"><span>seed {asset.seed}</span><span>{asset.model} · ${asset.cost.toFixed(2)}</span></div><p className="asset-prompt">{asset.prompt}</p><div className="asset-meta"><button className="button">Usa nel deck</button><button className="button">Varianti</button></div></article>)}</div>{assets.length === 0 && <div className="empty-state">Nessun asset trovato.</div>}
  </div></div></section>
}
