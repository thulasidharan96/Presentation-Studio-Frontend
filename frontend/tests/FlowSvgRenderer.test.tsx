import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import type { FlowDocument } from '../src/api/types'
import { FlowSvgRenderer } from '../src/features/flows/FlowSvgRenderer'

describe('FlowSvgRenderer', () => {
  it('renders canonical flow nodes and labeled edges deterministically', () => {
    const flow: FlowDocument = { title: 'Review process', nodes: [{ id: 'in', label: 'Richiesta', kind: 'input', x: 0, y: 0 }, { id: 'out', label: 'Completato', kind: 'output', x: 1, y: 0 }], edges: [{ from: 'in', to: 'out', label: 'Approvato' }] }
    const { container } = render(<FlowSvgRenderer flow={flow} />)
    expect(screen.getByRole('img', { name: 'Review process' })).toBeInTheDocument()
    expect(screen.getByText('Richiesta')).toBeInTheDocument()
    expect(screen.getByText('Approvato')).toBeInTheDocument()
    expect(container.querySelectorAll('rect[rx="10"]')).toHaveLength(2)
    expect(container.querySelector('rect[rx="10"]')).toHaveAttribute('x', '45')
  })
})
