"use client"

import * as React from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"

export interface SliderProps {
  question: string
  lowLabel?: string
  highLabel?: string
  onSubmit: (value: number) => void
}

// Clean SVG icon faces — no emoji blobs
const FaceIcon = ({ value }: { value: number }) => {
  const idx = Math.min(Math.floor(value / 20), 4)
  const expressions = [
    // Very low — frown
    <path key="0" d="M8 14s1.5-2 4-2 4 2 4 2" strokeLinecap="round" />,
    // Low — slight frown
    <path key="1" d="M9 13.5s1-1 3-1 3 1 3 1" strokeLinecap="round" />,
    // Neutral — flat
    <path key="2" d="M9 13h6" strokeLinecap="round" />,
    // Good — slight smile
    <path key="3" d="M9 12.5s1 1.5 3 1.5 3-1.5 3-1.5" strokeLinecap="round" />,
    // Great — full smile
    <path key="4" d="M8 11s1.5 3 4 3 4-3 4-3" strokeLinecap="round" />,
  ]

  return (
    <motion.svg
      key={idx}
      initial={{ scale: 1 }}
      animate={{ scale: [1, 1.15, 1] }}
      transition={{ duration: 0.12 }}
      width="40"
      height="40"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      className="text-zinc-400"
    >
      <circle cx="12" cy="12" r="10" />
      <circle cx="9" cy="9.5" r="1" fill="currentColor" stroke="none" />
      <circle cx="15" cy="9.5" r="1" fill="currentColor" stroke="none" />
      {expressions[idx]}
    </motion.svg>
  )
}

export function Slider({ question, lowLabel = "Low", highLabel = "High", onSubmit }: SliderProps) {
  const [value, setValue] = React.useState(50)
  const [isSubmitting, setIsSubmitting] = React.useState(false)

  const handleSubmit = () => {
    setIsSubmitting(true)
    setTimeout(() => onSubmit(value), 400)
  }

  return (
    <div className="flex flex-col gap-6">
      <p className="text-sm font-medium text-zinc-200 leading-snug">{question}</p>

      {/* Visual */}
      <div className="flex flex-col items-center gap-3 py-4">
        <FaceIcon value={value} />
        <span className="font-mono text-5xl font-semibold tracking-tighter text-zinc-100 tabular-nums leading-none">
          {value}
        </span>
      </div>

      {/* Track */}
      <div className="space-y-2.5">
        <input
          type="range"
          min="0"
          max="100"
          value={value}
          onChange={(e) => setValue(Number(e.target.value))}
          className="w-full cursor-pointer"
        />
        <div className="flex justify-between">
          <span className="text-[11px] text-zinc-600">{lowLabel}</span>
          <span className="text-[11px] text-zinc-600">{highLabel}</span>
        </div>
      </div>

      <Button onClick={handleSubmit} disabled={isSubmitting} size="lg" className="w-full">
        {isSubmitting ? "Submitting…" : "Submit"}
      </Button>
    </div>
  )
}
