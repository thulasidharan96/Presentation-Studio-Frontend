import { useMemo, useState } from 'react'
import { Plus, ZoomIn, ZoomOut } from 'lucide-react'
import { useParams } from 'react-router-dom'
import { useMutation } from '@tanstack/react-query'
import { saveFlow } from '../../api/flows.api'
import { JsonIrEditor } from '../../components/editors/JsonIrEditor'
import type { FlowDocument } from '../../api/types'
import { FlowSvgRenderer } from './FlowSvgRenderer'
import { FlowDescribePanel } from './FlowDescribePanel'
import { FlowExportPanel } from './FlowExportPanel'

const initialFlow: FlowDocument = { title: 'Onboarding cliente', nodes: [{ id: 'start', label: 'Nuovo cliente', kind: 'input', x: 0, y: 1 }, { id: 'verify', label: 'Verifica documenti', kind: 'step', x: 1, y: 1, mode: 'manual' }, { id: 'review', label: 'Valutazione', kind: 'decision', x: 2, y: 1 }, { id: 'done', label: 'Attivazione', kind: 'output', x: 3, y: 1 }], edges: [{ from: 'start', to: 'verify' }, { from: 'verify', to: 'review' }, { from: 'review', to: 'done', label: 'Approvato' }], notes: 'Processo standard · SLA 3 giorni' }

export function FlowStudioPage() {
  const { flowId } = useParams()
  const [source, setSource] = useState(JSON.stringify(initialFlow, null, 2))
  const [animated, setAnimated] = useState(false)
  const [grid, setGrid] = useState(true)
  const [zoom, setZoom] = useState(100)
  const flow = useMemo(() => { try { return JSON.parse(source) as FlowDocument } catch { return null } }, [source])
  const saveMutation = useMutation({ mutationFn: saveFlow })
  return <><div className="page-heading"><div><p className="eyebrow">FLOW STUDIO {flowId ? `· ${flowId}` : '· NUOVO'}</p><h1>Modella un processo</h1><p>Descrivi la logica, visualizza il flusso e condividilo con il team.</p></div><button className="button button-primary" disabled={!flow || saveMutation.isPending} onClick={() => { if (flow) saveMutation.mutate(flow) }}>{saveMutation.isPending ? 'Salvataggio…' : 'Salva flow'}</button></div>
    {saveMutation.isError && <p role="alert" className="small">Salvataggio non riuscito.</p>}{saveMutation.isSuccess && <p role="status" className="small">Flow salvato.</p>}
    <div className="flow-layout"><div style={{ display: 'grid', alignContent: 'start', gap: 14 }}><section className="panel"><div className="panel-head"><h2>JSON del flow</h2><button className="button" onClick={() => setSource(JSON.stringify({ ...initialFlow, nodes: [...initialFlow.nodes, { id: `step-${Date.now()}`, label: 'Nuovo step', kind: 'step', x: 1, y: 2 }] }, null, 2))}><Plus size={13} /> Aggiungi nodo</button></div><div className="panel-body"><JsonIrEditor value={source} onChange={setSource} /><details className="legend"><summary>Legenda dei colori (kind e mode)</summary><p className="muted small">Input · Step · Store · Decision · Review · Agent · Actor · Output</p></details></div></section><FlowDescribePanel onGenerated={setSource} /></div>
      <section className="panel preview-panel"><div className="panel-head"><h2>Anteprima</h2><div className="preview-controls"><select className="select" aria-label="Layout"><option>Wide</option><option>Onepager</option><option>Full</option></select><button className="icon-only" aria-label="Riduci zoom" onClick={() => setZoom(Math.max(50, zoom - 10))}><ZoomOut size={14} /></button><span className="muted small">{zoom}%</span><button className="icon-only" aria-label="Aumenta zoom" onClick={() => setZoom(Math.min(150, zoom + 10))}><ZoomIn size={14} /></button></div></div><div className="flow-canvas">{flow ? <div style={{ width: `${zoom}%` }}><FlowSvgRenderer flow={flow} animated={animated} showGrid={grid} /></div> : <div className="empty-state">Il JSON non è valido: correggi gli errori per visualizzare il diagramma.</div>}</div><div className="preview-controls preview-bottom"><label><input type="checkbox" checked={animated} onChange={(event) => setAnimated(event.target.checked)} /> Mostra animazione</label><label><input type="checkbox" checked={grid} onChange={(event) => setGrid(event.target.checked)} /> Griglia documento</label></div>{flow && <FlowExportPanel flow={flow} />}</section></div>
  </>
}
