interface Pendo {
  track(eventName: string, properties?: Record<string, unknown>): void
}

interface Window {
  pendo?: Pendo
}
