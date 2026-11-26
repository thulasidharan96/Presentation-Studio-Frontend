import { useMemo, useState } from 'react'
import { useMutation } from '@tanstack/react-query'
import { X } from 'lucide-react'
import { rebuildDeck } from '../../api/decks.api'
import { Rfc6902PatchEditor } from '../../components/editors/Rfc6902PatchEditor'
import { parseJsonPatch } from '../../components/editors/patchValidation'

export function RebuildDeckModal({ deckId, onClose }: { deckId: string; onClose: () => void }) {
  const [showPatch, setShowPatch] = useState(false)
  const [templateVersion, setTemplateVersion] = useState('1.0.0')
  const [patchText, setPatchText] = useState('[]')
  const patch = useMemo(() => parseJsonPatch(patchText), [patchText])
  const mutation = useMutation({ mutationFn: () => rebuildDeck(deckId, { template_version: templateVersion, patch: patch ?? undefined }), onSuccess: onClose })
  return (
    <div className="modal-backdrop" role="presentation" onMouseDown={(event) => { if (event.target === event.currentTarget) onClose() }}>
      <section className="modal panel" role="dialog" aria-modal="true" aria-labelledby="rebuild-title">
        <div className="panel-head"><h2 id="rebuild-title">Ricostruisci presentazione</h2><button className="icon-only" aria-label="Chiudi" onClick={onClose}><X size={15} /></button></div>
        <div className="panel-body"><p className="muted small">Ricompila il PowerPoint in modo deterministico a partire dal deck.json esistente. Nessuna chiamata LLM: costo <strong>$0.00</strong>.</p>
          <label className="form-field">Versione del template<select className="select" value={templateVersion} onChange={(event) => setTemplateVersion(event.target.value)}><option value="1.0.0">bami-standard@1.0.0</option><option value="2.1.0">executive@2.1.0</option></select></label>
          <button className="patch-toggle" onClick={() => setShowPatch(!showPatch)}>{showPatch ? '−' : '+'} Patch JSON opzionale (RFC 6902)</button>
          {showPatch && <Rfc6902PatchEditor value={patchText} onChange={setPatchText} />}
          {mutation.isError && <p role="alert" className="small">Ricostruzione non riuscita. Riprova tra poco.</p>}
          <div className="modal-actions"><button className="button" onClick={onClose}>Annulla</button><button className="button button-primary" disabled={mutation.isPending || patch === null} onClick={() => mutation.mutate()}>{mutation.isPending ? 'Ricostruzione…' : 'Ricostruisci · $0.00'}</button></div>
        </div>
      </section>
    </div>
  )
}
