import { apiClient } from './client'
export interface ChartPreset { id: string; title: string; type: string; mode: 'native' | 'image'; version: number }
export const getCharts = () => apiClient<ChartPreset[]>('/charts')
