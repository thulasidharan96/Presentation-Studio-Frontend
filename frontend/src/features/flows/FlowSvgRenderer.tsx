import type { FlowDocument, FlowNode } from '../../api/types'

const colors: Record<string, string> = {
  input: '#e8e4ff', step: '#eaf2ff', store: '#dcf5ee', decision: '#fff1d9',
  review: '#ffe9e8', agent: '#eee8ff', actor: '#f0f2f6', output: '#dcf5ee',
}
const nodeWidth = 160
const nodeHeight = 65

function nodePosition(node: FlowNode) {
  return { x: 45 + node.x * 220, y: 58 + node.y * 115 }
}

export function FlowSvgRenderer({ flow, animated = false, showGrid = true }: { flow: FlowDocument; animated?: boolean; showGrid?: boolean }) {
  const width = Math.max(620, ...flow.nodes.map((node) => 90 + node.x * 220 + nodeWidth))
  const height = Math.max(300, ...flow.nodes.map((node) => 80 + node.y * 115 + nodeHeight))
  const positions = new Map(flow.nodes.map((node) => [node.id, nodePosition(node)]))
  return (
    <svg role="img" aria-label={flow.title || 'Anteprima del flow'} viewBox={`0 0 ${width} ${height}`} className="flow-svg">
      <defs><pattern id="flow-grid" width="22" height="22" patternUnits="userSpaceOnUse"><circle cx="1" cy="1" r="1" fill="#b9c1d0" opacity=".42" /></pattern><marker id="arrow" markerWidth="8" markerHeight="8" refX="7" refY="4" orient="auto"><path d="M0,0 L8,4 L0,8 Z" fill="#a5afc0" /></marker></defs>
      {showGrid && <rect width="100%" height="100%" fill="url(#flow-grid)" />}
      {flow.edges.map((edge, index) => {
        const from = positions.get(edge.from)
        const to = positions.get(edge.to)
        if (!from || !to) return null
        const x1 = from.x + nodeWidth
        const y1 = from.y + nodeHeight / 2
        const x2 = to.x
        const y2 = to.y + nodeHeight / 2
        const mid = (x1 + x2) / 2
        return <g key={`${edge.from}-${edge.to}-${index}`}><path d={`M ${x1} ${y1} C ${mid} ${y1}, ${mid} ${y2}, ${x2} ${y2}`} fill="none" stroke="#a5afc0" strokeWidth="2" markerEnd="url(#arrow)" />{edge.label && <text x={mid} y={(y1 + y2) / 2 - 7} textAnchor="middle" className="flow-edge-label">{edge.label}</text>}{animated && <circle r="3" fill="#6558d3"><animateMotion dur="3s" repeatCount="indefinite" path={`M ${x1} ${y1} C ${mid} ${y1}, ${mid} ${y2}, ${x2} ${y2}`} /></circle>}</g>
      })}
      {flow.nodes.map((node) => {
        const pos = positions.get(node.id)!
        return <g key={node.id}><rect x={pos.x} y={pos.y} width={nodeWidth} height={nodeHeight} rx="10" fill={colors[node.kind] || '#f0f2f6'} stroke="#cfd5e0" /><text x={pos.x + 13} y={pos.y + 24} className="flow-node-title">{node.label}</text><text x={pos.x + 13} y={pos.y + 45} className="flow-node-meta">{node.kind.toUpperCase()} {node.mode ? `· ${node.mode.toUpperCase()}` : ''}</text></g>
      })}
      {flow.notes && <text x="30" y={height - 18} className="flow-edge-label">{flow.notes}</text>}
    </svg>
  )
}
