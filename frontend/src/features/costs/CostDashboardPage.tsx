import { useQuery } from '@tanstack/react-query'
import { Download, TrendingDown, TrendingUp } from 'lucide-react'
import { useCurrentUser } from '../../auth/useCurrentUser'
import { downloadCostCsv, getCostRows, getCostSummary } from '../../api/costs.api'
import { PipelineMetricsCard } from './PipelineMetricsCard'
import { env } from '../../config/env'

export function CostDashboardPage() {
  const user = useCurrentUser()
  const { data } = useQuery({ queryKey: ['cost-summary', user.oid, user.roles], queryFn: () => getCostSummary(user), retry: false })
  const { data: costRows } = useQuery({ queryKey: ['cost-breakdown', user.oid, user.roles], queryFn: () => getCostRows(user), retry: false })
  const demoMode = import.meta.env.DEV && env.authDisabled
  const mockRows = demoMode && user.roles.includes('Studio.Admin') ? [{ user: 'Laura Bianchi', usd: 438.2, eur: 402.15, tokens: 1_820_000, images: 84, jobs: 46 }, { user: 'Marco Riva', usd: 362.74, eur: 332.9, tokens: 1_340_000, images: 63, jobs: 39 }] : []
  const rows = costRows ?? mockRows
  const metrics = [['Mese corrente USD', data ? `$${data.total_usd.toLocaleString('it-IT', { minimumFractionDigits: 2 })}` : demoMode ? '$1.248,32' : '—', '↑ 8,4% dal mese scorso'], ['Presentazioni / Job', data?.jobs ?? (demoMode ? 186 : '—'), '12 in elaborazione'], ['Immagini', data?.images ?? (demoMode ? 342 : '—'), '51 questa settimana'], ['Costo medio per deck', data ? `$${data.average_deck.toFixed(2)}` : demoMode ? '$6.71' : '—', '↓ 4,2% vs media'], ['Rispetto al mese prima', data ? `${data.month_change}%` : demoMode ? '-8.4%' : '—', 'Efficienza in crescita']]
  return <><div className="page-heading"><div><p className="eyebrow">FINOPS · USO RESPONSABILE</p><h1>Costi</h1><p>{user.roles.includes('Studio.Admin') ? 'Panoramica dei consumi e delle performance AI.' : 'I tuoi consumi e le tue performance AI.'}</p></div><button className="button" onClick={() => void downloadCostCsv(user)}><Download size={14} /> Esporta CSV</button></div>
    <div className="kpi-grid">{metrics.map(([label, value, note], index) => <section className="panel kpi" key={label as string}><span>{label}</span><strong>{value}</strong><small>{index === 4 && Number(data?.month_change ?? -8.4) < 0 ? <TrendingDown size={12} /> : <TrendingUp size={12} />} {note}</small></section>)}</div>
    <div className="panel table-wrap" style={{ marginBottom: 15 }}><div className="panel-head"><h2>Dettaglio</h2><div className="toolbar" style={{ margin: 0 }}><label className="small muted">Raggruppa per <select className="select"><option>Utente</option><option>Dipartimento</option></select></label><label className="small muted">Periodo <select className="select"><option>Mese corrente</option><option>Mese precedente</option><option>Tutto</option></select></label></div></div><table><thead><tr><th>UTENTE</th><th>USD</th><th>EUR</th><th>TOKEN</th><th>IMMAGINI</th><th>JOB</th><th>TOTALE</th></tr></thead><tbody>{rows.map((row) => <tr key={row.user}><td>{row.user}</td><td>${row.usd.toFixed(2)}</td><td>€{row.eur.toFixed(2)}</td><td>{row.tokens.toLocaleString('it-IT')}</td><td>{row.images}</td><td>{row.jobs}</td><td>${row.usd.toFixed(2)}</td></tr>)}</tbody></table>{rows.length === 0 && <div className="empty-state">Nessun dato costi disponibile per il periodo selezionato.</div>}</div>
    <div className="two-column"><section className="panel"><div className="panel-head"><h2>Metriche del periodo</h2></div><div className="panel-body metric-summary"><span>Job nel periodo <strong>186</strong></span><span>Presentazioni <strong>72</strong></span><span>Costo medio per deck <strong>$6.71</strong></span><span>Tasso di correzione <strong>12.8%</strong></span></div></section><PipelineMetricsCard /></div>
  </>
}
