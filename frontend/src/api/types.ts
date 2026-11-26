export interface Deck {
  id: string
  title: string
  status: 'completed' | 'queued' | 'review' | 'error'
  template: string
  slides: number
  author: string
  origin: string
  date: string
  cost: number
}

export interface FlowSummary extends Omit<FlowDocument, 'title'> {
  title: string
  id: string
  slug: string
  version: number
  tags: string[]
  updated_at: string
}

export interface FlowNode {
  id: string
  label: string
  kind: string
  x: number
  y: number
  mode?: string
}

export interface FlowEdge {
  from: string
  to: string
  label?: string
}

export interface FlowDocument {
  title?: string
  nodes: FlowNode[]
  edges: FlowEdge[]
  notes?: string
}
