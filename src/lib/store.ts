import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { v4 as uuidv4 } from 'uuid'
import { DiaryEntry, DiaryStore, Mood } from '@/types/diary'

export const useDiaryStore = create<DiaryStore>()(
  persist(
    (set) => ({
      entries: [],
      selectedEntry: null,
      searchQuery: '',
      filterMood: 'all',
      view: 'grid',

      addEntry: (entryData) => {
        const now = new Date().toISOString()
        const entry: DiaryEntry = {
          ...entryData,
          id: uuidv4(),
          createdAt: now,
          updatedAt: now,
        }
        set((state) => ({ entries: [entry, ...state.entries] }))
      },

      updateEntry: (id, data) => {
        set((state) => ({
          entries: state.entries.map((e) =>
            e.id === id ? { ...e, ...data, updatedAt: new Date().toISOString() } : e
          ),
          selectedEntry: state.selectedEntry?.id === id
            ? { ...state.selectedEntry, ...data, updatedAt: new Date().toISOString() }
            : state.selectedEntry,
        }))
      },

      deleteEntry: (id) => {
        set((state) => ({
          entries: state.entries.filter((e) => e.id !== id),
          selectedEntry: state.selectedEntry?.id === id ? null : state.selectedEntry,
        }))
      },

      setSelectedEntry: (entry) => set({ selectedEntry: entry }),
      setSearchQuery: (query) => set({ searchQuery: query }),
      setFilterMood: (mood) => set({ filterMood: mood }),
      setView: (view) => set({ view }),

      toggleFavorite: (id) => {
        set((state) => ({
          entries: state.entries.map((e) =>
            e.id === id ? { ...e, isFavorite: !e.isFavorite } : e
          ),
        }))
      },
    }),
    {
      name: 'memory-diary-storage',
    }
  )
)
