import { apiClient } from './client'
export interface ImageAsset { id: string; title: string; aspect_ratio: string; ocr_verified: boolean; seed: number; model: string; cost: number; prompt: string; url?: string }
export const getImages = () => apiClient<ImageAsset[]>('/images')
export const generateImage = (payload: Record<string, unknown>) =>
  apiClient('/images', { method: 'POST', body: JSON.stringify(payload) })
export const uploadImage = (file: File) => {
  const body = new FormData()
  body.append('file', file)
  return apiClient('/images/upload', { method: 'POST', body })
}
