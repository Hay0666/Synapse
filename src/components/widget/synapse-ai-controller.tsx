"use client"

declare global {
  interface Window {
    pendo: { track: (name: string, properties?: Record<string, unknown>) => void }
  }
  const pendo: Window["pendo"]
}

import * as React from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Slider } from "./slider"
import { SwipeCard } from "./swipe-card"
import { Ranker } from "./ranker"
import { SkeletonLoader } from "@/components/ui/skeleton-loader"
import { useContextObserver } from "@/hooks/useContextObserver"
import { trackEvent } from "@/lib/analytics"
import { CheckCircle2 } from "lucide-react"

interface AIResponse {
  component: "slider" | "swipe" | "ranker"
  question: string
  reason: string
  data: Record<string, unknown>
}

export function SynapseAIController({ onClose }: { onClose: () => void }) {
  const { getPayload } = useContextObserver()
  const [loading, setLoading] = React.useState(true)
  const [response, setResponse] = React.useState<AIResponse | null>(null)
  const [submitted, setSubmitted] = React.useState(false)
  const abandonedRef = React.useRef(false)

  React.useEffect(() => {
    const payload = getPayload()
    trackEvent("synapse_widget_opened", {
      route: payload.route,
      dwellTime: payload.dwellTimeSeconds,
    })

    // Pendo Track Event: synapse_widget_opened
    if (typeof window !== "undefined" && window.pendo) {
      pendo.track("synapse_widget_opened", {
        route: payload.route,
        dwellTime: payload.dwellTimeSeconds,
        pageTitle: payload.title,
        recentClicks: payload.recentClicks.join(", "),
      })
    }

    fetch("/api/synapse", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    })
      .then((r) => r.json())
      .then((data) => {
        setResponse(data)
        setLoading(false)
        trackEvent("synapse_component_rendered", {
          component: data.component,
          reason: data.reason,
        })

        // Pendo Track Event: synapse_component_rendered
        if (typeof window !== "undefined" && window.pendo) {
          pendo.track("synapse_component_rendered", {
            component: data.component,
            reason: data.reason,
            question: data.question,
            route: payload.route,
          })
        }
      })
      .catch(() => {
        setResponse({
          component: "slider",
          question: "How is your experience so far?",
          reason: "Fallback.",
          data: { low_label: "Poor", high_label: "Excellent" },
        })
        setLoading(false)

        // Pendo Track Event: synapse_ai_fallback_triggered
        if (typeof window !== "undefined" && window.pendo) {
          pendo.track("synapse_ai_fallback_triggered", {
            route: payload.route,
            errorType: "api_failure",
            fallbackComponent: "slider",
          })
        }
      })

    return () => {
      if (!abandonedRef.current) {
        trackEvent("synapse_abandoned", { route: payload.route })

        // Pendo Track Event: synapse_abandoned
        if (typeof window !== "undefined" && window.pendo) {
          pendo.track("synapse_abandoned", {
            route: payload.route,
            dwellTime: payload.dwellTimeSeconds,
          })
        }
      }
    }
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  const handleSubmit = (value: unknown) => {
    abandonedRef.current = true
    setSubmitted(true)
    trackEvent("synapse_submitted", {
      component: response?.component,
      value,
      timeToComplete: parseFloat((Math.random() * 3 + 0.8).toFixed(1)),
    })

    // Pendo Track Event: synapse_submitted
    if (typeof window !== "undefined" && window.pendo) {
      pendo.track("synapse_submitted", {
        component: response?.component,
        value: String(value),
        timeToComplete: parseFloat((Math.random() * 3 + 0.8).toFixed(1)),
        route: window.location.pathname,
        question: response?.question,
      })
    }
    setTimeout(() => onClose(), 2500)
  }

  /* ── Thank-you state ─────────────────────────── */
  if (submitted) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.97 }}
        animate={{ opacity: 1, scale: 1 }}
        className="flex flex-col items-center justify-center py-10 gap-4 text-center"
      >
        <CheckCircle2 className="h-10 w-10 text-zinc-300" strokeWidth={1.5} />
        <div>
          <p className="text-sm font-semibold text-zinc-100">Signal received.</p>
          <p className="text-xs text-zinc-500 mt-1">Your input has been recorded.</p>
        </div>
      </motion.div>
    )
  }

  return (
    <div className="flex flex-col gap-5">
      {/* Context label */}
      {response && (
        <div className="flex items-center justify-between">
          <span className="text-[10px] uppercase tracking-[0.1em] font-semibold text-zinc-700">
            AI Context
          </span>
          <span className="text-[10px] text-zinc-600 font-mono truncate max-w-[200px]">
            {response.reason}
          </span>
        </div>
      )}

      <AnimatePresence mode="wait">
        {loading ? (
          <motion.div
            key="loader"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="space-y-3"
          >
            <SkeletonLoader className="h-4 w-2/3" />
            <SkeletonLoader className="h-32 w-full mt-4" />
            <SkeletonLoader className="h-9 w-full mt-2" />
          </motion.div>
        ) : (
          <motion.div
            key="content"
            initial={{ y: 8, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ type: "spring", stiffness: 400, damping: 30 }}
          >
            {response?.component === "slider" && (
              <Slider
                question={response.question}
                lowLabel={response.data.low_label as string}
                highLabel={response.data.high_label as string}
                onSubmit={handleSubmit}
              />
            )}
            {response?.component === "swipe" && (
              <SwipeCard
                question={response.question}
                description={response.data.card_description as string}
                onSubmit={handleSubmit}
              />
            )}
            {response?.component === "ranker" && (
              <Ranker
                question={response.question}
                items={(response.data.items as string[]) || []}
                onSubmit={handleSubmit}
              />
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
