"use client"

import * as React from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Orbit, X } from "lucide-react"
import { SynapseAIController } from "./synapse-ai-controller"

export function SynapseWidget() {
  const [isOpen, setIsOpen] = React.useState(false)

  const morphTransition = {
    type: "spring" as const,
    stiffness: 420,
    damping: 32,
    mass: 1,
  }

  // ── Escape key to close ─────────────────────────
  React.useEffect(() => {
    if (!isOpen) return
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsOpen(false)
    }
    window.addEventListener("keydown", handleKey)
    return () => window.removeEventListener("keydown", handleKey)
  }, [isOpen])

  return (
    <>
      {/* ── Backdrop (click-outside dismiss) ───────── */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            key="backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15 }}
            className="fixed inset-0 z-40"
            aria-hidden="true"
            onClick={() => setIsOpen(false)}
          />
        )}
      </AnimatePresence>

      {/* ── Widget ─────────────────────────────────── */}
      <div className="fixed bottom-5 right-5 z-50">
        <AnimatePresence mode="wait">
          {!isOpen ? (
            // ── Collapsed FAB — pill shape ─────────────────────
            <motion.div key="fab" className="relative">
              {/* Idle pulse ring — follows pill shape */}
              <motion.div
                initial={{ scale: 1, opacity: 0.06 }}
                animate={{ scale: 1.18, opacity: 0 }}
                transition={{ duration: 2, ease: "easeOut", repeat: Infinity, repeatDelay: 2 }}
                className="absolute inset-0 rounded-full bg-white pointer-events-none"
              />
              <motion.button
                layoutId="synapse-panel"
                onClick={() => setIsOpen(true)}
                transition={morphTransition}
                className="group flex items-center gap-2.5 rounded-full bg-[#111111] border border-[#1f1f1f] px-4 py-2.5 hover:border-[#444444] transition-colors duration-150"
                aria-label="Open Synapse widget"
              >
                <Orbit className="h-3.5 w-3.5 text-[#a1a1aa] group-hover:text-zinc-300 transition-colors shrink-0" />
                <span className="text-sm font-medium text-[#fafafa] leading-none">
                  Quick Thoughts
                </span>
              </motion.button>
            </motion.div>
          ) : (
            // ── Expanded Panel ─────────────────────────────────
            <motion.div
              key="panel"
              layoutId="synapse-panel"
              transition={morphTransition}
              className="w-[360px] rounded-xl bg-zinc-950 border border-zinc-800 overflow-hidden flex flex-col"
              style={{ maxHeight: "calc(100vh - 80px)" }}
            >
              {/* Panel header */}
              <div className="flex items-center justify-between px-4 py-3 border-b border-zinc-900 shrink-0">
                <div className="flex items-center gap-2">
                  <Orbit className="h-3.5 w-3.5 text-zinc-400" />
                  <span className="text-xs font-semibold text-zinc-200 tracking-tight">Synapse</span>
                </div>
                <button
                  onClick={() => setIsOpen(false)}
                  className="h-6 w-6 flex items-center justify-center rounded-md hover:bg-zinc-800 text-zinc-600 hover:text-zinc-300 transition-colors"
                  aria-label="Close widget (Esc)"
                >
                  <X className="h-3.5 w-3.5" />
                </button>
              </div>

              {/* Content */}
              <div className="p-5 overflow-y-auto flex-1" style={{ minHeight: 280 }}>
                <SynapseAIController onClose={() => setIsOpen(false)} />
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </>
  )
}
