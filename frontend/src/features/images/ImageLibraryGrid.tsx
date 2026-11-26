import { Image, Upload } from 'lucide-react'
import { uploadImage } from '../../api/images.api'

const assets = [
  ['Workshop di innovazione', '16:9 · testo non verificato', 'seed 24891'],
  ['Paesaggio urbano sostenibile', '3:4 · OCR verificato', 'seed 91734'],
  ['Collaborazione digitale', '16:9 · testo non verificato', 'seed 66318'],
]

export function ImageLibraryGrid() {
  const onUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) await uploadImage(file)
  }
  return <section><div className="panel"><div className="panel-head"><h2>Libreria</h2><span className="muted small">24 asset</span></div><div className="panel-body"><div className="toolbar"><input className="field" placeholder="Cerca nella libreria..." /><select className="select"><option>Tutti i preset</option></select><select className="select"><option>Ogni formato</option></select><label className="upload-button button"><Upload size={13} /> Carica immagine<input type="file" accept="image/*" onChange={(event) => void onUpload(event)} hidden /></label></div>
    <div className="card-grid">{assets.map(([title, meta, seed], index) => <article className="asset-card" key={title}><div className="asset-visual"><Image size={27} /></div><h3>{title}</h3><p>{meta}</p><div className="asset-meta"><span>{seed}</span><span>gpt-image · $0,08</span></div><div className="asset-meta"><button className="button">Usa nel deck</button><button className="button">Varianti</button></div></article>)}</div>
  </div></div></section>
}
