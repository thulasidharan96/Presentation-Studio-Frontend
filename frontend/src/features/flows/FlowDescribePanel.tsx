import { useState } from 'react'
import { useMutation } from '@tanstack/react-query'
import { describeFlow } from '../../api/flows.api'

export function FlowDescribePanel({ onGenerated }: { onGenerated: (value: string) => void }) {
  const [prompt, setPrompt] = useState('')
  const mutation = useMutation({ mutationFn: () => describeFlow(prompt, 'it'), onSuccess: (flow) => onGenerated(JSON.stringify(flow, null, 2)) })
  return <section className="panel"><div className="panel-head"><h2>Descrivi a parole</h2><span className="tag">~0,01 USD</span></div><div className="panel-body"><label className="form-field">Il tuo processo<textarea className="textarea" rows={4} value={prompt} onChange={(event) => setPrompt(event.target.value)} placeholder="Descrivi il flusso di lavoro..." /></label><div className="asset-meta"><select className="select" aria-label="Lingua output"><option>Italiano</option><option>English</option></select><button className="button button-primary" disabled={!prompt.trim() || mutation.isPending} onClick={() => mutation.mutate()}>{mutation.isPending ? 'Generazione…' : 'Genera flow'}</button></div>{mutation.isError && <p role="alert" className="small">Generazione non riuscita.</p>}</div></section>
}
