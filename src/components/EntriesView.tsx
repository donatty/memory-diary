'use client'

import { useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { BookOpen, Sparkles } from 'lucide-react'
import { useDiaryStore } from '@/lib/store'
import { DiaryEntry } from '@/types/diary'
import { groupEntriesByMonth, formatThaiDate } from '@/lib/utils'
import EntryCard from './EntryCard'

interface EntriesViewProps {
  onEntryClick: (entry: DiaryEntry) => void
}

export default function EntriesView({ onEntryClick }: EntriesViewProps) {
  const { entries, searchQuery, filterMood, view } = useDiaryStore()

  const filteredEntries = useMemo(() => {
    return entries.filter((entry) => {
      const matchesSearch =
        !searchQuery ||
        entry.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        entry.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
        entry.tags.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase())) ||
        entry.location?.toLowerCase().includes(searchQuery.toLowerCase())

      const matchesMood = filterMood === 'all' || entry.mood === filterMood

      return matchesSearch && matchesMood
    })
  }, [entries, searchQuery, filterMood])

  if (entries.length === 0) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="flex flex-col items-center justify-center h-full py-20 text-center"
      >
        <div className="w-24 h-24 rounded-3xl bg-gradient-to-br from-rose-petal to-lavender-soft flex items-center justify-center mb-6 shadow-soft animate-float">
          <BookOpen size={36} className="text-white" />
        </div>
        <h2 className="font-display text-2xl font-semibold text-ink-dark mb-2">
          เริ่มบันทึกความทรงจำ
        </h2>
        <p className="text-ink-light text-sm max-w-xs leading-relaxed">
          ทุกวันมีเรื่องราวที่น่าจดจำ<br />กดปุ่ม + เพื่อเริ่มต้นบันทึกแรกของคุณ ✨
        </p>
        <div className="flex gap-2 mt-6 text-2xl animate-bounce-soft">
          🌸 🌺 🌼
        </div>
      </motion.div>
    )
  }

  if (filteredEntries.length === 0) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="flex flex-col items-center justify-center h-full py-20 text-center"
      >
        <div className="text-4xl mb-4 animate-wiggle">🔍</div>
        <h3 className="font-display text-lg font-semibold text-ink-dark mb-1">ไม่พบบันทึก</h3>
        <p className="text-ink-light text-sm">ลองค้นหาด้วยคำอื่นดูนะ</p>
      </motion.div>
    )
  }

  if (view === 'grid') {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 p-1">
        <AnimatePresence mode="popLayout">
          {filteredEntries.map((entry, i) => (
            <EntryCard key={entry.id} entry={entry} index={i} onClick={() => onEntryClick(entry)} />
          ))}
        </AnimatePresence>
      </div>
    )
  }

  if (view === 'list') {
    return (
      <div className="space-y-2 p-1">
        <AnimatePresence mode="popLayout">
          {filteredEntries.map((entry, i) => (
            <motion.div
              key={entry.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ delay: i * 0.04 }}
              onClick={() => onEntryClick(entry)}
              className="flex items-center gap-3 p-4 rounded-2xl cursor-pointer hover:shadow-card-hover transition-all duration-300 group"
              style={{ backgroundColor: entry.color }}
            >
              <div className="text-2xl flex-shrink-0">{entry.mood === 'happy' ? '😊' : entry.mood === 'sad' ? '😢' : entry.mood === 'excited' ? '🎉' : entry.mood === 'calm' ? '🌿' : entry.mood === 'anxious' ? '😰' : entry.mood === 'grateful' ? '🙏' : entry.mood === 'nostalgic' ? '🌙' : '💕'}</div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  {entry.title && (
                    <h3 className="font-display font-semibold text-ink-dark text-sm truncate">{entry.title}</h3>
                  )}
                  {entry.isFavorite && <span className="text-rose-deep">💕</span>}
                </div>
                {entry.content && (
                  <p className="text-xs text-ink-mid truncate mt-0.5">{entry.content}</p>
                )}
              </div>
              <div className="text-right flex-shrink-0">
                <p className="text-xs text-ink-light">{formatThaiDate(entry.createdAt)}</p>
                {entry.media.length > 0 && (
                  <p className="text-[10px] text-ink-light mt-0.5">📎 {entry.media.length}</p>
                )}
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    )
  }

  // Timeline view
  const grouped = groupEntriesByMonth(filteredEntries)

  return (
    <div className="space-y-8 p-1">
      {Object.entries(grouped).map(([month, monthEntries]) => (
        <motion.div
          key={month}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          {/* Month header */}
          <div className="flex items-center gap-3 mb-4">
            <div className="flex items-center gap-2 bg-ink-dark text-cream-50 px-4 py-1.5 rounded-full">
              <Sparkles size={12} className="animate-sparkle" />
              <span className="font-display text-sm font-medium">{month}</span>
            </div>
            <div className="flex-1 h-px bg-cream-200" />
            <span className="text-xs text-ink-light">{monthEntries.length} บันทึก</span>
          </div>

          {/* Timeline entries */}
          <div className="relative pl-6">
            {/* Timeline line */}
            <div className="absolute left-2 top-2 bottom-2 w-px bg-cream-200" />

            <div className="space-y-3">
              {monthEntries.map((entry, i) => (
                <motion.div
                  key={entry.id}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05 }}
                  className="relative"
                >
                  {/* Dot */}
                  <div
                    className="absolute -left-4 top-4 w-3 h-3 rounded-full border-2 border-white shadow-sm"
                    style={{ backgroundColor: entry.color === '#fdf4e7' ? '#d4a853' : entry.color }}
                  />

                  <div
                    onClick={() => onEntryClick(entry)}
                    className="ml-2 p-4 rounded-2xl cursor-pointer hover:shadow-card-hover transition-all duration-300"
                    style={{ backgroundColor: entry.color }}
                  >
                    <div className="flex items-start gap-2">
                      <span className="text-lg">{entry.mood === 'happy' ? '😊' : entry.mood === 'sad' ? '😢' : entry.mood === 'excited' ? '🎉' : entry.mood === 'calm' ? '🌿' : entry.mood === 'anxious' ? '😰' : entry.mood === 'grateful' ? '🙏' : entry.mood === 'nostalgic' ? '🌙' : '💕'}</span>
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          {entry.title && <span className="font-display font-semibold text-ink-dark text-sm">{entry.title}</span>}
                          <span className="text-[10px] text-ink-light">{formatThaiDate(entry.createdAt)}</span>
                        </div>
                        {entry.content && <p className="text-xs text-ink-mid line-clamp-2 mt-0.5">{entry.content}</p>}
                      </div>
                      {entry.isFavorite && <span className="text-rose-deep">💕</span>}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  )
}
