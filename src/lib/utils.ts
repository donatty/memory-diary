import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'
import { format, formatDistance, isToday, isYesterday, isThisWeek, isThisYear } from 'date-fns'
import { th } from 'date-fns/locale'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatThaiDate(dateStr: string): string {
  const date = new Date(dateStr)
  if (isToday(date)) return 'วันนี้'
  if (isYesterday(date)) return 'เมื่อวาน'
  if (isThisWeek(date)) return format(date, 'EEEE', { locale: th })
  if (isThisYear(date)) return format(date, 'd MMMM', { locale: th })
  return format(date, 'd MMMM yyyy', { locale: th })
}

export function formatThaiDateTime(dateStr: string): string {
  const date = new Date(dateStr)
  return format(date, 'd MMMM yyyy เวลา HH:mm น.', { locale: th })
}

export function formatRelativeTime(dateStr: string): string {
  return formatDistance(new Date(dateStr), new Date(), { addSuffix: true, locale: th })
}

export function formatFileSize(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`
}

export function fileToBase64(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.onload = () => resolve(reader.result as string)
    reader.onerror = reject
    reader.readAsDataURL(file)
  })
}

export function groupEntriesByMonth(entries: import('@/types/diary').DiaryEntry[]) {
  const groups: Record<string, typeof entries> = {}
  entries.forEach((entry) => {
    const key = format(new Date(entry.createdAt), 'MMMM yyyy', { locale: th })
    if (!groups[key]) groups[key] = []
    groups[key].push(entry)
  })
  return groups
}

export const WEATHER_OPTIONS = [
  { value: 'sunny', label: 'แดดจ้า', emoji: '☀️' },
  { value: 'cloudy', label: 'มีเมฆ', emoji: '☁️' },
  { value: 'rainy', label: 'ฝนตก', emoji: '🌧️' },
  { value: 'stormy', label: 'พายุ', emoji: '⛈️' },
  { value: 'windy', label: 'ลมแรง', emoji: '🌬️' },
  { value: 'foggy', label: 'หมอก', emoji: '🌫️' },
  { value: 'snowy', label: 'หิมะ', emoji: '❄️' },
]
