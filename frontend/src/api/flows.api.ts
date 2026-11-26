import { apiClient } from './client'
import type { FlowDocument, FlowSummary } from './types'

export const getFlows = () => apiClient<FlowSummary[]>('/flows')
export const describeFlow = (prompt: string, language: string) =>
  apiClient<FlowDocument>('/flows/describe', { method: 'POST', body: JSON.stringify({ prompt, language }) })
export const saveFlow = (flow: FlowDocument) =>
  apiClient<FlowDocument>('/flows', { method: 'POST', body: JSON.stringify(flow) })
