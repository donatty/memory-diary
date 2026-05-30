'use client'

import { useCallback, useState } from 'react'
import { useDropzone } from 'react-dropzone'
import { v4 as uuidv4 } from 'uuid'
import { ImageIcon, Video, X, Upload, Eye } from 'lucide-react'
import { MediaFile } from '@/types/diary'
import { fileToBase64, formatFileSize, cn } from '@/lib/utils'
import toast from 'react-hot-toast'

interface MediaUploaderProps {
  media: MediaFile[]
  onChange: (media: MediaFile[]) => void
}

export default function MediaUploader({ media, onChange }: MediaUploaderProps) {
  const [uploading, setUploading] = useState(false)
  const [preview, setPreview] = useState<MediaFile | null>(null)

  const onDrop = useCallback(
    async (acceptedFiles: File[]) => {
      setUploading(true)
      try {
        const newMedia: MediaFile[] = await Promise.all(
          acceptedFiles.map(async (file) => {
            const url = await fileToBase64(file)
            return {
              id: uuidv4(),
              type: file.type.startsWith('video/') ? 'video' : 'image',
              url,
              name: file.name,
              size: file.size,
              createdAt: new Date().toISOString(),
            } as MediaFile
          })
        )
        onChange([...media, ...newMedia])
        toast.success(`อัพโหลด ${newMedia.length} ไฟล์สำเร็จ ✨`)
      } catch {
        toast.error('อัพโหลดไม่สำเร็จ ลองอีกครั้งนะ')
      } finally {
        setUploading(false)
      }
    },
    [media, onChange]
  )

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/*': ['.jpg', '.jpeg', '.png', '.gif', '.webp'],
      'video/*': ['.mp4', '.webm', '.mov'],
    },
    maxSize: 50 * 1024 * 1024, // 50MB
    multiple: true,
  })

  const removeMedia = (id: string) => {
    onChange(media.filter((m) => m.id !== id))
  }

  return (
    <div className="space-y-3">
      {/* Drop zone */}
      <div
        {...getRootProps()}
        className={cn(
          'relative border-2 border-dashed rounded-2xl p-5 text-center cursor-pointer transition-all duration-300',
          isDragActive
            ? 'border-rose-blush bg-rose-petal/20 scale-[1.01]'
            : 'border-cream-300 hover:border-rose-blush hover:bg-rose-petal/10'
        )}
      >
        <input {...getInputProps()} />
        <div className="flex flex-col items-center gap-2">
          {uploading ? (
            <>
              <div className="w-8 h-8 border-2 border-rose-blush border-t-transparent rounded-full animate-spin" />
              <p className="text-sm text-ink-light">กำลังอัพโหลด...</p>
            </>
          ) : (
            <>
              <div className="flex gap-2 text-rose-deep">
                <ImageIcon size={20} />
                <Video size={20} />
                <Upload size={20} />
              </div>
              <div>
                <p className="text-sm font-medium text-ink-mid">
                  {isDragActive ? 'วางไฟล์ที่นี่ได้เลย! 🎀' : 'ลากไฟล์มาวาง หรือคลิกเพื่อเลือก'}
                </p>
                <p className="text-xs text-ink-light mt-1">
                  รูปภาพ (JPG, PNG, GIF, WEBP) · วิดีโอ (MP4, WebM, MOV) · ไม่เกิน 50MB
                </p>
              </div>
            </>
          )}
        </div>
      </div>

      {/* Media grid */}
      {media.length > 0 && (
        <div className="grid grid-cols-3 sm:grid-cols-4 gap-2">
          {media.map((file) => (
            <div key={file.id} className="relative group aspect-square rounded-xl overflow-hidden bg-cream-100">
              {file.type === 'image' ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={file.url}
                  alt={file.name}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex flex-col items-center justify-center bg-lavender-soft">
                  <Video size={24} className="text-lavender-deep" />
                  <p className="text-xs text-ink-light mt-1 px-2 text-center truncate w-full px-1">
                    {file.name}
                  </p>
                </div>
              )}

              {/* Overlay */}
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                <button
                  onClick={() => setPreview(file)}
                  className="p-1.5 bg-white/90 rounded-full hover:bg-white transition-colors"
                >
                  <Eye size={14} className="text-ink-dark" />
                </button>
                <button
                  onClick={() => removeMedia(file.id)}
                  className="p-1.5 bg-white/90 rounded-full hover:bg-rose-100 transition-colors"
                >
                  <X size={14} className="text-rose-deep" />
                </button>
              </div>

              {/* Size badge */}
              <div className="absolute bottom-1 left-1 bg-black/50 text-white text-[10px] px-1 rounded">
                {formatFileSize(file.size)}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Preview modal */}
      {preview && (
        <div
          className="fixed inset-0 z-50 modal-backdrop flex items-center justify-center p-4"
          onClick={() => setPreview(null)}
        >
          <div className="relative max-w-3xl w-full" onClick={(e) => e.stopPropagation()}>
            <button
              onClick={() => setPreview(null)}
              className="absolute -top-10 right-0 text-white hover:text-cream-200 transition-colors"
            >
              <X size={24} />
            </button>
            {preview.type === 'image' ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={preview.url}
                alt={preview.name}
                className="w-full rounded-2xl shadow-2xl max-h-[80vh] object-contain"
              />
            ) : (
              <video
                src={preview.url}
                controls
                className="w-full rounded-2xl shadow-2xl max-h-[80vh]"
              />
            )}
            <p className="text-center text-white/80 text-sm mt-2">{preview.name}</p>
          </div>
        </div>
      )}
    </div>
  )
}
