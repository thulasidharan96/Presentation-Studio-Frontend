import { apiClient } from './client'
export const generateImage = (payload: Record<string, unknown>) =>
  apiClient('/images', { method: 'POST', body: JSON.stringify(payload) })
export const uploadImage = (file: File) => {
  const body = new FormData()
  body.append('file', file)
  return apiClient('/images/upload', { method: 'POST', body })
}
