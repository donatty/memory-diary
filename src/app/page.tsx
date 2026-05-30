'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Plus, Menu, BookOpen, Sparkles } from 'lucide-react'
import { DiaryEntry } from '@/types/diary'
import { useDiaryStore } from '@/lib/store'
import FloatingPetals from '@/components/FloatingPetals'
import Sidebar from '@/components/Sidebar'
import EntriesView from '@/components/EntriesView'
import EntryEditor from '@/components/EntryEditor'
import EntryDetail from '@/components/EntryDetail'
import { formatThaiDate } from '@/lib/utils'

export default function HomePage() {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [showEditor, setShowEditor] = useState(false)
  const [editingEntry, setEditingEntry] = useState<DiaryEntry | undefined>()
  const [viewingEntry, setViewingEntry] = useState<DiaryEntry | null>(null)
  const { entries } = useDiaryStore()

  const today = new Date().toISOString()

  const handleEntryClick = (entry: DiaryEntry) => {
    setViewingEntry(entry)
  }

  const handleEditFromDetail = () => {
    if (viewingEntry) {
      setEditingEntry(viewingEntry)
      setViewingEntry(null)
      setShowEditor(true)
    }
  }

  const handleNewEntry = () => {
    setEditingEntry(undefined)
    setShowEditor(true)
  }

  const handleCloseEditor = () => {
    setShowEditor(false)
    setEditingEntry(undefined)
  }

  return (
    <div className="flex h-screen overflow-hidden relative">
      <FloatingPetals />

      {/* Sidebar */}
      <div className="hidden md:block flex-shrink-0 w-64 relative z-10">
        <Sidebar isOpen={true} onClose={() => {}} />
      </div>

      {/* Mobile sidebar */}
      <div className="md:hidden">
        <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      </div>

      {/* Main content */}
      <main className="flex-1 flex flex-col overflow-hidden relative z-10">
        {/* Top bar */}
        <header className="flex-shrink-0 px-6 py-4 flex items-center justify-between border-b border-cream-200/60 bg-cream-50/80 backdrop-blur-sm">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setSidebarOpen(true)}
              className="md:hidden p-2 rounded-xl hover:bg-cream-100 text-ink-light transition-colors"
            >
              <Menu size={20} />
            </button>
            <div>
              <div className="flex items-center gap-1.5">
                <Sparkles size={14} className="text-rose-blush animate-sparkle" />
                <h2 className="font-display font-semibold text-ink-dark">ความทรงจำของฉัน</h2>
              </div>
              <p className="text-xs text-ink-light">{formatThaiDate(today)} · {entries.length} บันทึก</p>
            </div>
          </div>

          {/* New entry button */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleNewEntry}
            className="flex items-center gap-2 px-4 py-2.5 bg-ink-dark text-cream-50 rounded-2xl text-sm font-medium shadow-soft hover:bg-ink-mid transition-all duration-200"
          >
            <Plus size={16} />
            <span className="hidden sm:inline">บันทึกใหม่</span>
          </motion.button>
        </header>

        {/* Entries */}
        <div className="flex-1 overflow-y-auto p-5">
          <EntriesView onEntryClick={handleEntryClick} />
        </div>
      </main>

      {/* Floating add button (mobile) */}
      <motion.button
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={handleNewEntry}
        className="fixed bottom-6 right-6 w-14 h-14 bg-gradient-to-br from-rose-blush to-rose-deep text-white rounded-2xl shadow-glow-rose flex items-center justify-center md:hidden z-20"
      >
        <Plus size={24} />
      </motion.button>

      {/* Entry Editor Modal */}
      <AnimatePresence>
        {showEditor && (
          <EntryEditor
            entry={editingEntry}
            onClose={handleCloseEditor}
          />
        )}
      </AnimatePresence>

      {/* Entry Detail Modal */}
      <AnimatePresence>
        {viewingEntry && (
          <EntryDetail
            entry={viewingEntry}
            onClose={() => setViewingEntry(null)}
            onEdit={handleEditFromDetail}
          />
        )}
      </AnimatePresence>
    </div>
  )
}
