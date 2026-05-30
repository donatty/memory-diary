export type Mood = 'happy' | 'sad' | 'excited' | 'calm' | 'anxious' | 'grateful' | 'nostalgic' | 'love'

export interface MediaFile {
  id: string
  type: 'image' | 'video'
  url: string
  name: string
  size: number
  createdAt: string
}

export interface DiaryEntry {
  id: string
  title: string
  content: string
  mood: Mood
  tags: string[]
  media: MediaFile[]
  createdAt: string
  updatedAt: string
  color: string
  isFavorite: boolean
  weather?: string
  location?: string
}

export interface DiaryStore {
  entries: DiaryEntry[]
  selectedEntry: DiaryEntry | null
  searchQuery: string
  filterMood: Mood | 'all'
  view: 'grid' | 'list' | 'timeline'
  addEntry: (entry: Omit<DiaryEntry, 'id' | 'createdAt' | 'updatedAt'>) => void
  updateEntry: (id: string, entry: Partial<DiaryEntry>) => void
  deleteEntry: (id: string) => void
  setSelectedEntry: (entry: DiaryEntry | null) => void
  setSearchQuery: (query: string) => void
  setFilterMood: (mood: Mood | 'all') => void
  setView: (view: 'grid' | 'list' | 'timeline') => void
  toggleFavorite: (id: string) => void
}

export const MOOD_CONFIG: Record<Mood, { label: string; emoji: string; color: string; bg: string }> = {
  happy: { label: 'มีความสุข', emoji: '😊', color: '#f59e0b', bg: '#fef3c7' },
  sad: { label: 'เศร้า', emoji: '😢', color: '#6366f1', bg: '#ede9fe' },
  excited: { label: 'ตื่นเต้น', emoji: '🎉', color: '#f43f5e', bg: '#ffe4e6' },
  calm: { label: 'สงบ', emoji: '🌿', color: '#10b981', bg: '#d1fae5' },
  anxious: { label: 'กังวล', emoji: '😰', color: '#8b5cf6', bg: '#f5f3ff' },
  grateful: { label: 'ขอบคุณ', emoji: '🙏', color: '#ec4899', bg: '#fce7f3' },
  nostalgic: { label: 'คิดถึง', emoji: '🌙', color: '#3b82f6', bg: '#dbeafe' },
  love: { label: 'รัก', emoji: '💕', color: '#e11d48', bg: '#fff1f2' },
}

export const ENTRY_COLORS = [
  '#fdf4e7', '#fce7f3', '#ede9fe', '#dbeafe',
  '#d1fae5', '#fff1f2', '#fef3c7', '#e0f2fe',
]
