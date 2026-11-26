import { useState } from 'react'
import { Plus, ShieldAlert } from 'lucide-react'

const initialPresets = [{ name: 'Stile BAMI', suffix: 'Corporate photography, soft natural light, neutral palette', blocklist: 'competitor brands, real people' }, { name: 'Editoriale', suffix: 'Minimal editorial illustration, crisp geometry', blocklist: 'brand names, logos' }]
export function StylePresetsPage() {
  const [presets, setPresets] = useState(initialPresets)
  return <><div className="page-heading"><div><p className="eyebrow">GOVERNANCE · ADMIN</p><h1>Stili</h1><p>Preset creativi e regole condivise per immagini coerenti e sicure.</p></div><button className="button button-primary" onClick={() => setPresets([...presets, { name: `Nuovo stile ${presets.length}`, suffix: '', blocklist: '' }])}><Plus size={14} /> Nuovo stile</button></div>
    <div className="card-grid">{presets.map((preset) => <article className="asset-card" key={preset.name}><div className="asset-visual"><span className="tag">PRESET</span></div><h3>{preset.name}</h3><label className="form-field">Suffisso prompt<textarea className="textarea" rows={3} defaultValue={preset.suffix} /></label><label className="form-field" style={{ marginTop: 12 }}><span><ShieldAlert size={12} /> Blocklist</span><input className="field" defaultValue={preset.blocklist} /></label><div className="asset-meta"><button className="button">Annulla</button><button className="button button-primary">Salva</button></div></article>)}</div>
  </>
}
