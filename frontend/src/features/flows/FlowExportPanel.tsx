import type { FlowDocument } from '../../api/types'

export function FlowExportPanel({ flow }: { flow: FlowDocument }) {
  const download = (format: string) => {
    const blob = new Blob([JSON.stringify(flow, null, 2)], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = url
    link.download = `${(flow.title || 'flow').toLowerCase().replaceAll(' ', '-')}.${format}`
    link.click()
    URL.revokeObjectURL(url)
  }
  return <div className="export-bar"><strong>Esporta</strong>{['GIF', 'PNG', 'SVG', 'HTML', 'DOCX', 'JSON'].map((format) => <button className="button" key={format} onClick={() => download(format.toLowerCase())}>{format}</button>)}<button className="button button-primary" onClick={() => download('json')}>Render completo · costo 0</button></div>
}
