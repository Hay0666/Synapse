"use client"

// In a real hackathon, we would load the Novus SDK script tag here
// For the demo, we mock it and save events to localStorage so the dashboard can read them

export interface NovusEvent {
  id: string
  name: string
  timestamp: number
  properties: any
}

export function initNovus(visitorId: string, accountId: string) {
  if (typeof window === undefined) return
  console.log(
    `%c[Novus SDK] Initialized`,
    "color: #22c55e; font-weight: bold;",
    `\nVisitor ID : ${visitorId}`,
    `\nAccount ID : ${accountId}`,
    `\nTimestamp  : ${new Date().toISOString()}`,
  )
}

export function trackEvent(name: string, properties: any) {
  if (typeof window === "undefined") return
  
  console.log(`[Novus Event] ${name}`, properties)
  
  const event: NovusEvent = {
    id: Math.random().toString(36).substring(2, 9),
    name,
    timestamp: Date.now(),
    properties
  }

  // Save to localStorage for the dashboard
  try {
    const existingStr = localStorage.getItem("novus_events")
    const existing = existingStr ? JSON.parse(existingStr) : []
    localStorage.setItem("novus_events", JSON.stringify([event, ...existing]))
  } catch (e) {
    console.error("Failed to save event to localStorage", e)
  }
}

export function getEvents(): NovusEvent[] {
  if (typeof window === "undefined") return []
  try {
    const existingStr = localStorage.getItem("novus_events")
    return existingStr ? JSON.parse(existingStr) : []
  } catch {
    return []
  }
}
