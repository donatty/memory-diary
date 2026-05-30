'use client'

import { motion } from 'framer-motion'
import { Heart, MapPin, Image, Video, Trash2 } from 'lucide-react'
import { DiaryEntry, MOOD_CONFIG } from '@/types/diary'
import { useDiaryStore } from '@/lib/store'
import { formatThaiDate, cn } from '@/lib/utils'
import { WEATHER_OPTIONS } from '@/lib/utils'
import toast from 'react-hot-toast'

interface EntryCardProps {
  entry: DiaryEntry
  onClick: () => void
  index: number
}

export default function EntryCard({ entry, onClick, index }: EntryCardProps) {
  const { toggleFavorite, deleteEntry } = useDiaryStore()
  const mood = MOOD_CONFIG[entry.mood]
  const weather = WEATHER_OPTIONS.find((w) => w.value === entry.weather)
  const imageCount = entry.media.filter((m) => m.type === 'image').length
  const videoCount = entry.media.filter((m) => m.type === 'video').length
  const firstImage = entry.media.find((m) => m.type === 'image')

  const handleDelete = (e: React.MouseEvent) => {
    e.stopPropagation()
    if (confirm('ลบความทรงจำนี้เลยนะ? 🥺')) {
      deleteEntry(entry.id)
      toast.success('ลบแล้ว')
    }
  }

  const handleFavorite = (e: React.MouseEvent) => {
    e.stopPropagation()
    toggleFavorite(entry.id)
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05, type: 'spring', damping: 20 }}
      onClick={onClick}
      className="entry-card group relative rounded-2xl overflow-hidden cursor-pointer"
      style={{ backgroundColor: entry.color }}
    >
      {/* Washi tape top decoration */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-5 opacity-70 rounded-sm z-10"
        style={{
          background: index % 3 === 0
            ? 'rgba(249,197,209,0.7)'
            : index % 3 === 1
            ? 'rgba(196,176,232,0.7)'
            : 'rgba(212,230,216,0.7)',
          transform: `translateX(-50%) rotate(${(index % 5 - 2) * 2}deg)`,
        }}
      />

      {/* Paper texture */}
      <div className="absolute inset-0 paper-card opacity-30 pointer-events-none" />

      {/* First image preview */}
      {firstImage && (
        <div className="relative h-36 overflow-hidden">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={firstImage.url}
            alt=""
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/20" />
        </div>
      )}

      <div className="p-4 pt-5">
        {/* Header row */}
        <div className="flex items-start justify-between mb-2">
          <div className="flex items-center gap-1.5">
            <span className="text-lg">{mood.emoji}</span>
            <span className="text-xs text-ink-light">{formatThaiDate(entry.createdAt)}</span>
            {weather && <span className="text-xs">{weather.emoji}</span>}
          </div>
          <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
            <button
              onClick={handleFavorite}
              className={cn(
                'p-1.5 rounded-full transition-all duration-200',
                entry.isFavorite ? 'text-rose-deep' : 'text-ink-light hover:text-rose-deep'
              )}
            >
              <Heart size={14} fill={entry.isFavorite ? 'currentColor' : 'none'} />
            </button>
            <button
              onClick={handleDelete}
              className="p-1.5 rounded-full text-ink-light hover:text-rose-deep transition-colors"
            >
              <Trash2 size={14} />
            </button>
          </div>
        </div>

        {/* Title */}
        {entry.title && (
          <h3 className="font-display font-semibold text-ink-dark text-sm mb-1 line-clamp-1">
            {entry.title}
          </h3>
        )}

        {/* Content preview */}
        {entry.content && (
          <p className="text-xs text-ink-mid line-clamp-3 leading-relaxed">
            {entry.content}
          </p>
        )}

        {/* Footer */}
        <div className="flex items-center gap-2 mt-3 flex-wrap">
          {/* Location */}
          {entry.location && (
            <span className="flex items-center gap-1 text-[10px] text-ink-light">
              <MapPin size={10} />
              {entry.location}
            </span>
          )}

          {/* Media count */}
          {(imageCount > 0 || videoCount > 0) && (
            <span className="flex items-center gap-1 text-[10px] text-ink-light">
              {imageCount > 0 && <><Image size={10} /> {imageCount}</>}
              {videoCount > 0 && <><Video size={10} className="ml-1" /> {videoCount}</>}
            </span>
          )}

          {/* Favorite indicator */}
          {entry.isFavorite && (
            <span className="ml-auto text-rose-deep">
              <Heart size={12} fill="currentColor" />
            </span>
          )}

          {/* Tags */}
          {entry.tags.slice(0, 2).map((tag) => (
            <span key={tag} className="tag-pill text-[10px] px-2 py-0">
              #{tag}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  )
}
