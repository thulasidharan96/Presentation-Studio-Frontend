const phases = [['Brief', 44], ['Asset', 68], ['Build', 32], ['Controlli', 54]]
export function PipelineMetricsCard() {
  return <section className="panel"><div className="panel-head"><h2>Durata media per fase</h2><span className="muted small">secondi</span></div><div className="panel-body">{phases.map(([label, amount]) => <div className="metric-row" key={label as string}><span>{label}</span><div className="progress-track"><div className="progress-fill" style={{ width: `${amount}%` }} /></div><strong>{amount}s</strong></div>)}</div></section>
}
