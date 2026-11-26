export function JobCostCard({ total = 0.18 }: { total?: number }) {
  return <section className="panel"><div className="panel-head"><h2>Costo generazione</h2><strong>${total.toFixed(2)}</strong></div><div className="table-wrap"><table><thead><tr><th>Passo</th><th>Modello</th><th>Token in</th><th>Cache</th><th>Totale</th></tr></thead><tbody><tr><td>Outline</td><td>gpt-4o-mini</td><td>2.4k</td><td>42%</td><td>$0.04</td></tr><tr><td>Composition</td><td>gpt-4.1</td><td>8.1k</td><td>18%</td><td>$0.14</td></tr></tbody></table></div></section>
}
