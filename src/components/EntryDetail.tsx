'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Heart, Edit2, MapPin, Tag, Cloud, Trash2, ChevronLeft, ChevronRight } from 'lucide-react'
import { DiaryEntry, MOOD_CONFIG } from '@/types/diary'
import { useDiaryStore } from '@/lib/store'
import { formatThaiDateTime, WEATHER_OPTIONS, cn } from '@/lib/utils'
import toast from 'react-hot-toast'

interface EntryDetailProps {
  entry: DiaryEntry
  onClose: () => void
  onEdit: () => void
}

export default function EntryDetail({ entry, onClose, onEdit }: EntryDetailProps) {
  const { toggleFavorite, deleteEntry } = useDiaryStore()
  const [mediaIndex, setMediaIndex] = useState(0)
  const mood = MOOD_CONFIG[entry.mood]
  const weather = WEATHER_OPTIONS.find((w) => w.value === entry.weather)

  const handleDelete = () => {
    if (confirm('ลบความทรงจำนี้เลยนะ? 🥺')) {
      deleteEntry(entry.id)
      onClose()
      toast.success('ลบแล้ว')
    }
  }

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 modal-backdrop flex items-center justify-center p-4"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.92, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.92, opacity: 0 }}
          transition={{ type: 'spring', damping: 25, stiffness: 280 }}
          className="w-full max-w-lg max-h-[90vh] overflow-hidden rounded-3xl shadow-2xl"
          style={{ backgroundColor: entry.color }}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Paper texture */}
          <div className="absolute inset-0 paper-card opacity-40 pointer-events-none" />

          <div className="relative flex flex-col max-h-[90vh]">
            {/* Header */}
            <div className="flex items-center justify-between px-6 pt-6 pb-3">
              <div className="flex items-center gap-2">
                <span className="text-3xl animate-bounce-soft">{mood.emoji}</span>
                <div>
                  <p className="text-xs text-ink-light">{mood.label}</p>
                  <p className="text-xs text-ink-light/70">{formatThaiDateTime(entry.createdAt)}</p>
                </div>
              </div>
              <div className="flex items-center gap-1">
                <button
                  onClick={() => toggleFavorite(entry.id)}
                  className={cn(
                    'p-2 rounded-full transition-all duration-200',
                    entry.isFavorite ? 'text-rose-deep scale-110' : 'text-ink-light hover:text-rose-deep'
                  )}
                >
                  <Heart size={18} fill={entry.isFavorite ? 'currentColor' : 'none'} />
                </button>
                <button onClick={onEdit} className="p-2 rounded-full hover:bg-black/10 text-ink-light transition-colors">
                  <Edit2 size={18} />
                </button>
                <button onClick={handleDelete} className="p-2 rounded-full hover:bg-rose-petal/30 text-ink-light hover:text-rose-deep transition-colors">
                  <Trash2 size={18} />
                </button>
                <button onClick={onClose} className="p-2 rounded-full hover:bg-black/10 text-ink-light transition-colors">
                  <X size={18} />
                </button>
              </div>
            </div>

            {/* Scrollable content */}
            <div className="flex-1 overflow-y-auto px-6 pb-6 space-y-4">
              {/* Title */}
              {entry.title && (
                <h2 className="font-display text-2xl font-semibold text-ink-dark">{entry.title}</h2>
              )}

              {/* Meta info */}
              <div className="flex items-center gap-3 flex-wrap">
                {weather && (
                  <span className="flex items-center gap-1 text-xs text-ink-light bg-white/40 px-3 py-1 rounded-full">
                    <Cloud size={12} /> {weather.emoji} {weather.label}
                  </span>
                )}
                {entry.location && (
                  <span className="flex items-center gap-1 text-xs text-ink-light bg-white/40 px-3 py-1 rounded-full">
                    <MapPin size={12} /> {entry.location}
                  </span>
                )}
              </div>

              {/* Content */}
              {entry.content && (
                <div className="lined-paper rounded-xl p-4">
                  <p className="diary-content">{entry.content}</p>
                </div>
              )}

              {/* Media gallery */}
              {entry.media.length > 0 && (
                <div>
                  <p className="text-xs font-medium text-ink-light mb-2">📷 รูปภาพ & วิดีโอ ({entry.media.length})</p>
                  <div className="relative">
                    {/* Main media */}
                    <div className="relative rounded-2xl overflow-hidden aspect-video bg-black/10">
                      {entry.media[mediaIndex].type === 'image' ? (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img
                          src={entry.media[mediaIndex].url}
                          alt={entry.media[mediaIndex].name}
                          className="w-full h-full object-contain"
                        />
                      ) : (
                        <video
                          src={entry.media[mediaIndex].url}
                          controls
                          className="w-full h-full"
                        />
                      )}
                      {/* Navigation */}
                      {entry.media.length > 1 && (
                        <>
                          <button
                            onClick={() => setMediaIndex((i) => (i - 1 + entry.media.length) % entry.media.length)}
                            className="absolute left-2 top-1/2 -translate-y-1/2 p-1.5 bg-black/30 hover:bg-black/50 text-white rounded-full transition-colors"
                          >
                            <ChevronLeft size={16} />
                          </button>
                          <button
                            onClick={() => setMediaIndex((i) => (i + 1) % entry.media.length)}
                            className="absolute right-2 top-1/2 -translate-y-1/2 p-1.5 bg-black/30 hover:bg-black/50 text-white rounded-full transition-colors"
                          >
                            <ChevronRight size={16} />
                          </button>
                          <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-1">
                            {entry.media.map((_, i) => (
                              <button
                                key={i}
                                onClick={() => setMediaIndex(i)}
                                className={cn(
                                  'w-1.5 h-1.5 rounded-full transition-all',
                                  i === mediaIndex ? 'bg-white w-3' : 'bg-white/50'
                                )}
                              />
                            ))}
                          </div>
                        </>
                      )}
                    </div>

                    {/* Thumbnails */}
                    {entry.media.length > 1 && (
                      <div className="flex gap-2 mt-2 overflow-x-auto pb-1">
                        {entry.media.map((m, i) => (
                          <button
                            key={m.id}
                            onClick={() => setMediaIndex(i)}
                            className={cn(
                              'flex-shrink-0 w-14 h-14 rounded-xl overflow-hidden border-2 transition-all',
                              i === mediaIndex ? 'border-ink-dark scale-105' : 'border-transparent opacity-60 hover:opacity-100'
                            )}
                          >
                            {m.type === 'image' ? (
                              // eslint-disable-next-line @next/next/no-img-element
                              <img src={m.url} alt="" className="w-full h-full object-cover" />
                            ) : (
                              <div className="w-full h-full bg-lavender-soft flex items-center justify-center text-xs text-lavender-deep">
                                🎬
                              </div>
                            )}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* Tags */}
              {entry.tags.length > 0 && (
                <div className="flex items-center gap-2 flex-wrap">
                  <Tag size={12} className="text-ink-light" />
                  {entry.tags.map((tag) => (
                    <span key={tag} className="tag-pill"># {tag}</span>
                  ))}
                </div>
              )}
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
}
