"use client"

import * as React from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"

export interface SwipeCardProps {
  question: string
  description?: string
  onSubmit: (approved: boolean) => void
}

export function SwipeCard({ question, description, onSubmit }: SwipeCardProps) {
  const [exitDir, setExitDir] = React.useState<"left" | "right" | null>(null)

  const handleDecision = (approved: boolean) => {
    setExitDir(approved ? "right" : "left")
    setTimeout(() => onSubmit(approved), 300)
  }

  return (
    <div className="flex flex-col gap-6">
      {/* Card */}
      <div className="relative h-[160px]">
        <AnimatePresence>
          {!exitDir && (
            <motion.div
              initial={{ y: 8, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{
                x: exitDir === "left" ? -280 : 280,
                rotate: exitDir === "left" ? -10 : 10,
                opacity: 0,
              }}
              transition={{ type: "spring", stiffness: 300, damping: 28 }}
              className="absolute inset-0 rounded-xl border border-zinc-800 bg-zinc-900 p-5 flex flex-col justify-center"
            >
              <p className="text-sm font-semibold text-zinc-100 leading-snug mb-2">
                {question}
              </p>
              {description && (
                <p className="text-xs text-zinc-500 leading-relaxed">{description}</p>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Actions */}
      <div className="flex gap-3">
        <Button
          variant="danger"
          className="flex-1 text-xs"
          onClick={() => handleDecision(false)}
        >
          Reject
        </Button>
        <Button
          variant="success"
          className="flex-1 text-xs"
          onClick={() => handleDecision(true)}
        >
          Approve
        </Button>
      </div>
    </div>
  )
}
