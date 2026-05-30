'use client'

import { useEffect, useState } from 'react'

interface Petal {
  id: number
  emoji: string
  left: number
  delay: number
  duration: number
  size: number
}

const PETALS = ['🌸', '🌺', '🌼', '✿', '❀', '🍀', '⭐', '✨', '🌷', '💮']

export default function FloatingPetals() {
  const [petals, setPetals] = useState<Petal[]>([])

  useEffect(() => {
    const initial = Array.from({ length: 8 }, (_, i) => ({
      id: i,
      emoji: PETALS[Math.floor(Math.random() * PETALS.length)],
      left: Math.random() * 95,
      delay: Math.random() * 5,
      duration: 6 + Math.random() * 6,
      size: 14 + Math.random() * 12,
    }))
    setPetals(initial)

    const interval = setInterval(() => {
      setPetals((prev) => {
        const newPetal: Petal = {
          id: Date.now(),
          emoji: PETALS[Math.floor(Math.random() * PETALS.length)],
          left: Math.random() * 95,
          delay: 0,
          duration: 7 + Math.random() * 5,
          size: 14 + Math.random() * 12,
        }
        return [...prev.slice(-12), newPetal]
      })
    }, 2500)

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="petals-bg" aria-hidden>
      {petals.map((petal) => (
        <div
          key={petal.id}
          className="petal"
          style={{
            left: `${petal.left}%`,
            fontSize: `${petal.size}px`,
            animationDuration: `${petal.duration}s`,
            animationDelay: `${petal.delay}s`,
          }}
        >
          {petal.emoji}
        </div>
      ))}
    </div>
  )
}
