import { useQuery } from '@tanstack/react-query'
import { Download, TrendingDown, TrendingUp } from 'lucide-react'
import { useCurrentUser } from '../../auth/useCurrentUser'
import { downloadCostCsv, getCostSummary } from '../../api/costs.api'
import { PipelineMetricsCard } from './PipelineMetricsCard'

export function CostDashboardPage() {
  const user = useCurrentUser()
  const { data } = useQuery({ queryKey: ['cost-summary', user.oid, user.roles], queryFn: () => getCostSummary(user), retry: false })
  const metrics = [['Mese corrente USD', `$${(data?.total_usd ?? 1248.32).toLocaleString('it-IT', { minimumFractionDigits: 2 })}`, '↑ 8,4% dal mese scorso'], ['Presentazioni / Job', data?.jobs ?? 186, '12 in elaborazione'], ['Immagini', data?.images ?? 342, '51 questa settimana'], ['Costo medio per deck', `$${(data?.average_deck ?? 6.71).toFixed(2)}`, '↓ 4,2% vs media'], ['Rispetto al mese prima', `${data?.month_change ?? -8.4}%`, 'Efficienza in crescita']]
  return <><div className="page-heading"><div><p className="eyebrow">FINOPS · USO RESPONSABILE</p><h1>Costi</h1><p>{user.roles.includes('Studio.Admin') ? 'Panoramica dei consumi e delle performance AI.' : 'I tuoi consumi e le tue performance AI.'}</p></div><button className="button" onClick={() => void downloadCostCsv(user)}><Download size={14} /> Esporta CSV</button></div>
    <div className="kpi-grid">{metrics.map(([label, value, note], index) => <section className="panel kpi" key={label as string}><span>{label}</span><strong>{value}</strong><small>{index === 4 && Number(data?.month_change ?? -8.4) < 0 ? <TrendingDown size={12} /> : <TrendingUp size={12} />} {note}</small></section>)}</div>
    <div className="panel table-wrap" style={{ marginBottom: 15 }}><div className="panel-head"><h2>Dettaglio</h2><div className="toolbar" style={{ margin: 0 }}><label className="small muted">Raggruppa per <select className="select"><option>Utente</option><option>Dipartimento</option></select></label><label className="small muted">Periodo <select className="select"><option>Mese corrente</option><option>Mese precedente</option><option>Tutto</option></select></label></div></div><table><thead><tr><th>UTENTE</th><th>USD</th><th>EUR</th><th>TOKEN</th><th>IMMAGINI</th><th>JOB</th><th>TOTALE</th></tr></thead><tbody><tr><td>{user.roles.includes('Studio.Admin') ? 'Laura Bianchi' : user.email}</td><td>$438.20</td><td>€402,15</td><td>1.82M</td><td>84</td><td>46</td><td>$438.20</td></tr><tr><td>{user.roles.includes('Studio.Admin') ? 'Marco Riva' : user.department}</td><td>$362.74</td><td>€332,90</td><td>1.34M</td><td>63</td><td>39</td><td>$362.74</td></tr></tbody></table></div>
    <div className="two-column"><section className="panel"><div className="panel-head"><h2>Metriche del periodo</h2></div><div className="panel-body metric-summary"><span>Job nel periodo <strong>186</strong></span><span>Presentazioni <strong>72</strong></span><span>Costo medio per deck <strong>$6.71</strong></span><span>Tasso di correzione <strong>12.8%</strong></span></div></section><PipelineMetricsCard /></div>
  </>
}
