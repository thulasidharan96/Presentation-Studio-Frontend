import { useState } from 'react'
import { FileUp, Layers3 } from 'lucide-react'
import { uploadTemplate } from '../../api/templates.api'

const templates = [['bami-standard', '1.0.0', 'Attivo'], ['executive', '2.1.0', 'Attivo'], ['strategy-dark', '1.3.2', 'Bozza']]

export function TemplateManagerPage() {
  const [file, setFile] = useState<File | null>(null)
  const [message, setMessage] = useState('')
  const submit = async () => {
    if (!file) return
    try { await uploadTemplate(file); setMessage('Template caricato correttamente.') }
    catch { setMessage('Caricamento non riuscito. Verifica il file e riprova.') }
  }
  return <><div className="page-heading"><div><p className="eyebrow">GOVERNANCE · ADMIN</p><h1>Template</h1><p>Gestisci i master template aziendali e le relative versioni.</p></div><label className="button button-primary"><FileUp size={14} /> Carica .pptx<input type="file" accept=".pptx,application/vnd.openxmlformats-officedocument.presentationml.presentation" hidden onChange={(event) => setFile(event.target.files?.[0] ?? null)} /></label></div>
    {file && <div className="panel upload-confirm"><span>{file.name}</span><button className="button button-primary" onClick={() => void submit()}>Carica template</button></div>}{message && <p role="status" className="muted small">{message}</p>}
    <section className="panel table-wrap"><table><thead><tr><th>TEMPLATE</th><th>VERSIONE</th><th>STATO</th><th>ULTIMA MODIFICA</th><th>AZIONI</th></tr></thead><tbody>{templates.map(([name, version, status]) => <tr key={name}><td><Layers3 size={14} /> {name}</td><td>{name}@{version}</td><td><span className="tag status">{status}</span></td><td>Oggi · 09:42</td><td><button className="button">Gestisci</button></td></tr>)}</tbody></table></section>
  </>
}
