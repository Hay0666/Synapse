"use client"

import * as React from "react"
import { usePathname } from "next/navigation"

export interface ContextPayload {
  route: string
  title: string
  recentClicks: string[]
  dwellTimeSeconds: number
}

export function useContextObserver() {
  const pathname = usePathname()
  const [recentClicks, setRecentClicks] = React.useState<string[]>([])
  const [mountTime, setMountTime] = React.useState<number>(Date.now())

  // Reset dwell time and clicks on route change
  React.useEffect(() => {
    setMountTime(Date.now())
    setRecentClicks([])
  }, [pathname])

  // Track clicks
  React.useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement
      // Try to find a semantic label
      const label = 
        target.getAttribute("aria-label") || 
        target.innerText || 
        target.getAttribute("placeholder") ||
        (target.tagName === "INPUT" ? (target as HTMLInputElement).value : null)
      
      if (label && label.trim().length > 0) {
        const cleanLabel = label.trim().substring(0, 30) // Cap length
        setRecentClicks(prev => {
          const updated = [...prev, cleanLabel]
          if (updated.length > 3) return updated.slice(updated.length - 3)
          return updated
        })
      }
    }

    document.addEventListener("click", handleClick, { capture: true })
    return () => document.removeEventListener("click", handleClick, { capture: true })
  }, [])

  const getPayload = React.useCallback((): ContextPayload => {
    return {
      route: pathname || "/",
      title: document.title || "Orion",
      recentClicks,
      dwellTimeSeconds: Math.floor((Date.now() - mountTime) / 1000)
    }
  }, [pathname, recentClicks, mountTime])

  return { getPayload }
}
