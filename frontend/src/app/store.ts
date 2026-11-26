import { create } from 'zustand'

interface StudioState {
  theme: 'light' | 'dark'
  activeJobs: string[]
  drawerOpen: boolean
  toggleTheme: () => void
  setDrawerOpen: (open: boolean) => void
  addJob: (id: string) => void
}

const storedTheme = localStorage.getItem('studio-theme')

export const useStudioStore = create<StudioState>((set) => ({
  theme: storedTheme === 'dark' ? 'dark' : 'light',
  activeJobs: [],
  drawerOpen: false,
  toggleTheme: () =>
    set((state) => {
      const theme = state.theme === 'light' ? 'dark' : 'light'
      localStorage.setItem('studio-theme', theme)
      document.documentElement.dataset.theme = theme
      return { theme }
    }),
  setDrawerOpen: (drawerOpen) => set({ drawerOpen }),
  addJob: (id) => set((state) => ({ activeJobs: [...new Set([...state.activeJobs, id])] })),
}))

document.documentElement.dataset.theme = storedTheme === 'dark' ? 'dark' : 'light'
