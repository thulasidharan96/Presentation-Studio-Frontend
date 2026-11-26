import type { FlowDocument } from '../../api/types'
import { apiBlob } from '../../api/client'

export function FlowExportPanel({ flow }: { flow: FlowDocument }) {
  const download = async (format: string) => {
    try {
      const blob = format === 'json'
        ? new Blob([JSON.stringify(flow, null, 2)], { type: 'application/json' })
        : await apiBlob(`/flows/export?format=${encodeURIComponent(format)}`, { method: 'POST', body: JSON.stringify(flow) })
    const url = URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = url
    link.download = `${(flow.title || 'flow').toLowerCase().replaceAll(' ', '-')}.${format}`
    link.click()
    URL.revokeObjectURL(url)
    } catch {
      window.alert(`Esportazione ${format.toUpperCase()} non riuscita. Riprova tra poco.`)
    }
  }
  return <div className="export-bar"><strong>Esporta</strong>{['GIF', 'PNG', 'SVG', 'HTML', 'DOCX', 'JSON'].map((format) => <button className="button" key={format} onClick={() => void download(format.toLowerCase())}>{format}</button>)}<button className="button button-primary" onClick={() => void download('svg')}>Render completo · costo 0</button></div>
}
