import { apiClient } from './client'
export interface TemplateVersion { id: string; slug: string; version: string; name: string; active: boolean }
export const getTemplates = () => apiClient<TemplateVersion[]>('/templates')
export const uploadTemplate = (file: File) => {
  const body = new FormData()
  body.append('file', file)
  return apiClient('/templates', { method: 'POST', body })
}
