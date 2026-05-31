'use client'

import { motion } from 'framer-motion'
import { BookOpen, Heart, Grid3X3, List, Clock, Search, X } from 'lucide-react'
import { useDiaryStore } from '@/lib/store'
import { Mood, MOOD_CONFIG } from '@/types/diary'
import { cn } from '@/lib/utils'

interface SidebarProps {
  isOpen: boolean
  onClose: () => void
}

export default function Sidebar({ isOpen, onClose }: SidebarProps) {
  const { entries, filterMood, setFilterMood, view, setView, searchQuery, setSearchQuery } = useDiaryStore()

  const totalEntries = entries.length
  const favoriteEntries = entries.filter((e) => e.isFavorite).length
  const moodCounts = entries.reduce((acc, e) => {
    acc[e.mood] = (acc[e.mood] || 0) + 1
    return acc
  }, {} as Record<string, number>)

  return (
    <>
      {/* Mobile overlay */}
      {isOpen && (
        <div className="fixed inset-0 z-30 bg-black/30 md:hidden" onClick={onClose} />
      )}

      <motion.aside
        initial={false}
        animate={{ x: isOpen ? 0 : '-100%' }}
        transition={{ type: 'spring', damping: 25, stiffness: 300 }}
        className="fixed left-0 top-0 bottom-0 z-40 w-64 md:relative md:translate-x-0 md:z-auto flex flex-col"
        style={{
          background: 'linear-gradient(180deg, #fdfaf5 0%, #faf3e7 100%)',
          boxShadow: '4px 0 20px rgba(180, 140, 100, 0.1), inset -1px 0 0 rgba(180, 140, 100, 0.15)',
        }}
      >
        {/* Spine decoration */}
        <div className="diary-spine absolute right-0 top-0 bottom-0 w-1" />

        <div className="p-5 flex-1 overflow-y-auto">
          {/* Logo */}
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-2">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-rose-petal to-rose-blush flex items-center justify-center shadow-glow-rose animate-bounce-soft">
                <BookOpen size={18} className="text-white" />
              </div>
              <div>
                <h1 className="font-display font-bold text-ink-dark text-sm leading-tight">ไดอารี่</h1>
                <p className="text-[10px] text-ink-light">ความทรงจำ</p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-1.5 rounded-lg hover:bg-cream-100 text-ink-light md:hidden"
            >
              <X size={16} />
            </button>
          </div>

          {/* Search */}
          <div className="relative mb-5">
            <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-ink-light" />
            <input
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="ค้นหา..."
              className="w-full pl-8 pr-3 py-2 bg-cream-100/80 rounded-xl text-sm text-ink-mid outline-none focus:bg-cream-100 transition-colors placeholder:text-ink-light/50"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-2 top-1/2 -translate-y-1/2 text-ink-light hover:text-ink-dark"
              >
                <X size={14} />
              </button>
            )}
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 gap-2 mb-5">
            <div className="bg-cream-100/60 rounded-xl p-3 text-center">
              <p className="text-xl font-display font-bold text-ink-dark">{totalEntries}</p>
              <p className="text-[10px] text-ink-light">บันทึก</p>
            </div>
            <div className="bg-rose-petal/20 rounded-xl p-3 text-center">
              <p className="text-xl font-display font-bold text-rose-deep">{favoriteEntries}</p>
              <p className="text-[10px] text-ink-light">โปรด 💕</p>
            </div>
          </div>

          {/* View toggle */}
          <div className="mb-5">
            <p className="text-[10px] font-medium text-ink-light uppercase tracking-wider mb-2">มุมมอง</p>
            <div className="flex gap-1 bg-cream-100/60 rounded-xl p-1">
              {([
                { id: 'grid', icon: Grid3X3, label: 'ตาราง' },
                { id: 'list', icon: List, label: 'รายการ' },
                { id: 'timeline', icon: Clock, label: 'เวลา' },
              ] as const).map(({ id, icon: Icon, label }) => (
                <button
                  key={id}
                  onClick={() => setView(id)}
                  className={cn(
                    'flex-1 flex items-center justify-center gap-1 py-1.5 rounded-lg text-xs transition-all duration-200',
                    view === id ? 'bg-white text-ink-dark shadow-sm' : 'text-ink-light hover:text-ink-mid'
                  )}
                >
                  <Icon size={12} />
                  <span className="hidden sm:inline">{label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Filter by mood */}
          <div>
            <p className="text-[10px] font-medium text-ink-light uppercase tracking-wider mb-2">กรองอารมณ์</p>
            <button
              onClick={() => setFilterMood('all')}
              className={cn(
                'w-full text-left px-3 py-2 rounded-xl text-sm transition-all duration-200 mb-1',
                filterMood === 'all'
                  ? 'bg-ink-dark text-cream-50'
                  : 'text-ink-mid hover:bg-cream-100/80'
              )}
            >
              ✨ ทั้งหมด ({totalEntries})
            </button>
            <button
              className={cn(
                'w-full text-left px-3 py-2 rounded-xl text-sm transition-all duration-200 mb-1',
                'text-rose-deep hover:bg-rose-petal/20'
              )}
              onClick={() => setFilterMood('all')}
            >
              <Heart size={12} className="inline mr-1" fill="currentColor" />
              รายการโปรด ({favoriteEntries})
            </button>
            <div className="space-y-0.5 mt-2">
              {(Object.entries(MOOD_CONFIG) as [Mood, typeof MOOD_CONFIG[Mood]][]).map(([mood, config]) => (
                moodCounts[mood] ? (
                  <button
                    key={mood}
                    onClick={() => setFilterMood(filterMood === mood ? 'all' : mood)}
                    className={cn(
                      'w-full text-left px-3 py-1.5 rounded-xl text-xs transition-all duration-200 flex items-center justify-between',
                      filterMood === mood
                        ? 'text-ink-dark font-medium'
                        : 'text-ink-mid hover:bg-cream-100/80'
                    )}
                    style={{
                      background: filterMood === mood ? config.bg : undefined,
                    }}
                  >
                    <span>{config.emoji} {config.label}</span>
                    <span className="text-[10px] text-ink-light">{moodCounts[mood] || 0}</span>
                  </button>
                ) : null
              ))}
            </div>
          </div>
        </div>

        {/* Bottom decoration */}
        <div className="p-4 text-center">
          <p className="text-[10px] text-ink-light/50">สร้างด้วย 💕</p>
        </div>
      </motion.aside>
    </>
  )
}
