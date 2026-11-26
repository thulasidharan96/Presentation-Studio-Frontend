import { useState } from 'react'
import { useMutation } from '@tanstack/react-query'
import { ArrowLeft, Sparkles } from 'lucide-react'
import { Link, useNavigate } from 'react-router-dom'
import { createDeck } from '../../api/decks.api'
import { JobProgressBanner } from '../../components/layout/JobProgressBanner'
import { useJobStream } from '../../api/useJobStream'

export function DeckCreatePage() {
  const [origin, setOrigin] = useState('Prompt')
  const [prompt, setPrompt] = useState('')
  const [jobId, setJobId] = useState('')
  const navigate = useNavigate()
  const event = useJobStream(jobId)
  const mutation = useMutation({
    mutationFn: createDeck,
    onSuccess: (result) => {
      if (result.job_id) setJobId(result.job_id)
      else if (result.id) navigate(`/decks/${result.id}`)
    },
  })
  return (
    <>
      <div className="page-heading"><div><Link to="/decks" className="muted small"><ArrowLeft size={13} /> Presentazioni</Link><p className="eyebrow" style={{ marginTop: 16 }}>NUOVO PROGETTO</p><h1>Una nuova storia</h1><p>Parti da un'idea, dalla knowledge base o da SharePoint.</p></div></div>
      <div className="two-column">
        <section className="panel"><div className="panel-head"><h2>Brief della presentazione</h2><span className="tag">01 / 03</span></div><div className="panel-body">
          <div className="form-grid">
            <label className="form-field full">Titolo progetto<input className="field" placeholder="Es. Strategia di crescita 2025" /></label>
            <label className="form-field">Origine<select className="select" value={origin} onChange={(event) => setOrigin(event.target.value)}><option>Prompt</option><option>Projects KB</option><option>SharePoint</option></select></label>
            <label className="form-field">Template<select className="select"><option>bami-standard@1.0.0</option><option>executive@2.1.0</option></select></label>
            <label className="form-field">Numero slide<select className="select"><option>12 slide</option><option>8 slide</option><option>16 slide</option><option>20 slide</option></select></label>
            <label className="form-field">Lingua<select className="select"><option>Italiano</option><option>English</option></select></label>
            <label className="form-field full">Raccontaci cosa vuoi presentare<textarea className="textarea" rows={6} maxLength={2000} value={prompt} onChange={(event) => setPrompt(event.target.value)} placeholder="Descrivi obiettivi, pubblico e messaggio chiave..." /></label>
          </div>
          {mutation.isError && <p className="small" role="alert">Non è stato possibile creare il progetto. Verifica la connessione al servizio.</p>}
          <button className="button button-primary" style={{ marginTop: 17 }} disabled={mutation.isPending || !prompt.trim()} onClick={() => mutation.mutate({ origin, prompt, template: 'bami-standard@1.0.0', slide_count: 12 })}><Sparkles size={14} /> Genera presentazione</button>
        </div></section>
        <section className="panel"><div className="panel-head"><h2>La generazione, passo dopo passo</h2></div><div className="panel-body"><p className="muted small">Il tuo brief diventa una presentazione coerente, editabile e pronta da condividere.</p>{jobId ? <><JobProgressBanner current={event?.step === 'Build' ? 4 : 2} /><p className="muted small" role="status">{event?.message ?? 'Connessione al flusso di lavoro…'}</p></> : <div className="empty-state"><Sparkles size={25} /><p>Il flusso di generazione apparirà qui.</p></div>}</div></section>
      </div>
    </>
  )
}
