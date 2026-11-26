import { useState } from 'react'
import { FileUp, Layers3 } from 'lucide-react'
import { useQuery } from '@tanstack/react-query'
import { getTemplates, uploadTemplate } from '../../api/templates.api'

const demoTemplates = [{ id: 'bami-standard', slug: 'bami-standard', version: '1.0.0', name: 'BAMI Standard', active: true }, { id: 'executive', slug: 'executive', version: '2.1.0', name: 'Executive', active: true }, { id: 'strategy-dark', slug: 'strategy-dark', version: '1.3.2', name: 'Strategy Dark', active: false }]

export function TemplateManagerPage() {
  const [file, setFile] = useState<File | null>(null)
  const [message, setMessage] = useState('')
  const { data } = useQuery({ queryKey: ['templates'], queryFn: getTemplates, retry: false })
  const templates = data ?? (import.meta.env.DEV ? demoTemplates : [])
  const submit = async () => {
    if (!file) return
    try { await uploadTemplate(file); setMessage('Template caricato correttamente.') }
    catch { setMessage('Caricamento non riuscito. Verifica il file e riprova.') }
  }
  return <><div className="page-heading"><div><p className="eyebrow">GOVERNANCE · ADMIN</p><h1>Template</h1><p>Gestisci i master template aziendali e le relative versioni.</p></div><label className="button button-primary"><FileUp size={14} /> Carica .pptx<input type="file" accept=".pptx,application/vnd.openxmlformats-officedocument.presentationml.presentation" hidden onChange={(event) => setFile(event.target.files?.[0] ?? null)} /></label></div>
    {file && <div className="panel upload-confirm"><span>{file.name}</span><button className="button button-primary" onClick={() => void submit()}>Carica template</button></div>}{message && <p role="status" className="muted small">{message}</p>}
    <section className="panel table-wrap"><table><thead><tr><th>TEMPLATE</th><th>VERSIONE</th><th>STATO</th><th>ULTIMA MODIFICA</th><th>AZIONI</th></tr></thead><tbody>{templates.map((template) => <tr key={template.id}><td><Layers3 size={14} /> {template.name}</td><td>{template.slug}@{template.version}</td><td><span className="tag status">{template.active ? 'Attivo' : 'Bozza'}</span></td><td>Oggi · 09:42</td><td><button className="button">Gestisci</button></td></tr>)}</tbody></table>{templates.length === 0 && <div className="empty-state">Nessun template disponibile.</div>}</section>
  </>
}
