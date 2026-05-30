'use client'

import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Heart, MapPin, Cloud, Tag, Plus, Sparkles } from 'lucide-react'
import { DiaryEntry, Mood, MOOD_CONFIG, ENTRY_COLORS } from '@/types/diary'
import { useDiaryStore } from '@/lib/store'
import { WEATHER_OPTIONS, cn } from '@/lib/utils'
import MediaUploader from './MediaUploader'
import toast from 'react-hot-toast'

interface EntryEditorProps {
  entry?: DiaryEntry
  onClose: () => void
}

const defaultEntry = {
  title: '',
  content: '',
  mood: 'happy' as Mood,
  tags: [] as string[],
  media: [] as DiaryEntry['media'],
  color: ENTRY_COLORS[0],
  isFavorite: false,
  weather: '',
  location: '',
}

export default function EntryEditor({ entry, onClose }: EntryEditorProps) {
  const { addEntry, updateEntry } = useDiaryStore()
  const [form, setForm] = useState(entry || defaultEntry)
  const [tagInput, setTagInput] = useState('')
  const [activeTab, setActiveTab] = useState<'write' | 'media' | 'details'>('write')
  const textareaRef = useRef<HTMLTextAreaElement>(null)

  useEffect(() => {
    textareaRef.current?.focus()
  }, [])

  const handleSave = () => {
    if (!form.title.trim() && !form.content.trim()) {
      toast.error('กรุณาเขียนอะไรสักอย่างก่อนนะ 🌸')
      return
    }
    if (entry) {
      updateEntry(entry.id, form)
      toast.success('บันทึกแล้ว! 💕')
    } else {
      addEntry(form)
      toast.success('บันทึกความทรงจำสำเร็จ ✨')
    }
    onClose()
  }

  const addTag = () => {
    const tag = tagInput.trim().replace(/^#/, '')
    if (tag && !form.tags.includes(tag)) {
      setForm((f) => ({ ...f, tags: [...f.tags, tag] }))
      setTagInput('')
    }
  }

  const removeTag = (tag: string) => {
    setForm((f) => ({ ...f, tags: f.tags.filter((t) => t !== tag) }))
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
          initial={{ scale: 0.9, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.9, opacity: 0, y: 20 }}
          transition={{ type: 'spring', damping: 25, stiffness: 300 }}
          className="w-full max-w-2xl max-h-[90vh] overflow-hidden rounded-3xl shadow-2xl relative"
          style={{ backgroundColor: form.color }}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Tape strips decoration */}
          <div className="tape-strip top-2 left-8 rotate-[-3deg] z-10" />
          <div className="tape-strip top-2 right-8 rotate-[3deg] z-10" style={{ background: 'rgba(196, 176, 232, 0.55)' }} />

          {/* Paper texture overlay */}
          <div className="absolute inset-0 paper-card pointer-events-none opacity-60" />

          <div className="relative flex flex-col h-full max-h-[90vh]">
            {/* Header */}
            <div className="flex items-center justify-between px-6 pt-8 pb-3">
              <div className="flex items-center gap-2">
                <span className="text-2xl animate-bounce-soft">
                  {MOOD_CONFIG[form.mood].emoji}
                </span>
                <span className="text-xs font-medium text-ink-light bg-white/50 px-3 py-1 rounded-full">
                  {MOOD_CONFIG[form.mood].label}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setForm((f) => ({ ...f, isFavorite: !f.isFavorite }))}
                  className={cn(
                    'p-2 rounded-full transition-all duration-200',
                    form.isFavorite ? 'text-rose-deep scale-110' : 'text-ink-light hover:text-rose-deep'
                  )}
                >
                  <Heart size={18} fill={form.isFavorite ? 'currentColor' : 'none'} />
                </button>
                <button
                  onClick={onClose}
                  className="p-2 rounded-full hover:bg-black/10 text-ink-light hover:text-ink-dark transition-colors"
                >
                  <X size={18} />
                </button>
              </div>
            </div>

            {/* Title */}
            <div className="px-6 pb-2">
              <input
                type="text"
                value={form.title}
                onChange={(e) => setForm((f) => ({ ...f, title: e.target.value }))}
                placeholder="หัวข้อความทรงจำ..."
                className="w-full text-xl font-display font-semibold text-ink-dark bg-transparent border-none outline-none placeholder:text-ink-light/50"
              />
            </div>

            {/* Tabs */}
            <div className="flex gap-1 px-6 pb-2">
              {(['write', 'media', 'details'] as const).map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={cn(
                    'px-3 py-1 rounded-full text-xs font-medium transition-all duration-200',
                    activeTab === tab
                      ? 'bg-ink-dark text-cream-50'
                      : 'text-ink-light hover:bg-black/10'
                  )}
                >
                  {tab === 'write' ? '✏️ เขียน' : tab === 'media' ? '📷 รูปภาพ/วิดีโอ' : '🏷️ รายละเอียด'}
                </button>
              ))}
            </div>

            {/* Content */}
            <div className="flex-1 overflow-y-auto px-6 pb-4">
              {activeTab === 'write' && (
                <motion.div
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="lined-paper min-h-48 rounded-xl p-2"
                >
                  <textarea
                    ref={textareaRef}
                    value={form.content}
                    onChange={(e) => setForm((f) => ({ ...f, content: e.target.value }))}
                    placeholder="บันทึกความทรงจำของวันนี้..."
                    className="w-full min-h-48 bg-transparent resize-none diary-content outline-none leading-8 placeholder:text-ink-light/40"
                  />
                </motion.div>
              )}

              {activeTab === 'media' && (
                <motion.div
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                >
                  <MediaUploader
                    media={form.media}
                    onChange={(m) => setForm((f) => ({ ...f, media: m }))}
                  />
                </motion.div>
              )}

              {activeTab === 'details' && (
                <motion.div
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="space-y-5"
                >
                  {/* Mood selector */}
                  <div>
                    <p className="text-xs font-medium text-ink-light mb-2 flex items-center gap-1">
                      <Sparkles size={12} /> อารมณ์วันนี้
                    </p>
                    <div className="grid grid-cols-4 gap-2">
                      {(Object.entries(MOOD_CONFIG) as [Mood, typeof MOOD_CONFIG[Mood]][]).map(([mood, config]) => (
                        <button
                          key={mood}
                          onClick={() => setForm((f) => ({ ...f, mood }))}
                          className={cn(
                            'flex flex-col items-center gap-1 p-2 rounded-xl text-xs transition-all duration-200 sticker',
                            form.mood === mood
                              ? 'scale-110 shadow-md'
                              : 'hover:scale-105 opacity-70 hover:opacity-100'
                          )}
                          style={{
                            background: form.mood === mood ? config.bg : 'rgba(255,255,255,0.4)',
                            borderWidth: 1,
                            borderColor: form.mood === mood ? config.color + '40' : 'transparent',
                          }}
                        >
                          <span className="text-lg">{config.emoji}</span>
                          <span className="text-[10px] text-ink-mid">{config.label}</span>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Color */}
                  <div>
                    <p className="text-xs font-medium text-ink-light mb-2">🎨 สีของบันทึก</p>
                    <div className="flex gap-2 flex-wrap">
                      {ENTRY_COLORS.map((color) => (
                        <button
                          key={color}
                          onClick={() => setForm((f) => ({ ...f, color }))}
                          className={cn(
                            'w-8 h-8 rounded-full border-2 transition-all duration-200',
                            form.color === color ? 'scale-125 border-ink-dark' : 'border-transparent hover:scale-110'
                          )}
                          style={{ backgroundColor: color }}
                        />
                      ))}
                    </div>
                  </div>

                  {/* Weather */}
                  <div>
                    <p className="text-xs font-medium text-ink-light mb-2 flex items-center gap-1">
                      <Cloud size={12} /> สภาพอากาศ
                    </p>
                    <div className="flex gap-2 flex-wrap">
                      {WEATHER_OPTIONS.map((w) => (
                        <button
                          key={w.value}
                          onClick={() => setForm((f) => ({ ...f, weather: f.weather === w.value ? '' : w.value }))}
                          className={cn(
                            'flex items-center gap-1 px-3 py-1.5 rounded-full text-xs transition-all duration-200',
                            form.weather === w.value
                              ? 'bg-ink-dark text-cream-50'
                              : 'bg-white/50 text-ink-mid hover:bg-white/80'
                          )}
                        >
                          {w.emoji} {w.label}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Location */}
                  <div>
                    <p className="text-xs font-medium text-ink-light mb-2 flex items-center gap-1">
                      <MapPin size={12} /> สถานที่
                    </p>
                    <input
                      value={form.location}
                      onChange={(e) => setForm((f) => ({ ...f, location: e.target.value }))}
                      placeholder="บ้าน, คาเฟ่, ทะเล..."
                      className="w-full bg-white/50 rounded-xl px-3 py-2 text-sm text-ink-mid outline-none focus:bg-white/80 transition-colors placeholder:text-ink-light/50"
                    />
                  </div>

                  {/* Tags */}
                  <div>
                    <p className="text-xs font-medium text-ink-light mb-2 flex items-center gap-1">
                      <Tag size={12} /> แท็ก
                    </p>
                    <div className="flex gap-2 mb-2 flex-wrap">
                      {form.tags.map((tag) => (
                        <span key={tag} className="tag-pill">
                          #{tag}
                          <button onClick={() => removeTag(tag)} className="ml-1 hover:text-rose-deep">
                            <X size={10} />
                          </button>
                        </span>
                      ))}
                    </div>
                    <div className="flex gap-2">
                      <input
                        value={tagInput}
                        onChange={(e) => setTagInput(e.target.value)}
                        onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), addTag())}
                        placeholder="เพิ่มแท็ก..."
                        className="flex-1 bg-white/50 rounded-xl px-3 py-2 text-sm text-ink-mid outline-none focus:bg-white/80 transition-colors placeholder:text-ink-light/50"
                      />
                      <button
                        onClick={addTag}
                        className="p-2 bg-ink-dark text-cream-50 rounded-xl hover:bg-ink-mid transition-colors"
                      >
                        <Plus size={16} />
                      </button>
                    </div>
                  </div>
                </motion.div>
              )}
            </div>

            {/* Footer */}
            <div className="px-6 py-4 border-t border-black/5 flex items-center justify-between">
              <div className="text-xs text-ink-light">
                {form.content.length > 0 && `${form.content.length} ตัวอักษร`}
              </div>
              <div className="flex gap-2">
                <button
                  onClick={onClose}
                  className="px-4 py-2 rounded-xl text-sm text-ink-light hover:bg-black/10 transition-colors"
                >
                  ยกเลิก
                </button>
                <button
                  onClick={handleSave}
                  className="px-5 py-2 bg-ink-dark text-cream-50 rounded-xl text-sm font-medium hover:bg-ink-mid transition-all duration-200 hover:scale-105 active:scale-95"
                >
                  บันทึก ✨
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
}
