"use client"

import { useEffect } from "react"
import { initNovus } from "@/lib/analytics"

export function NovusProvider() {
  useEffect(() => {
    const apiKey = process.env.NEXT_PUBLIC_NOVUS_API_KEY || ""
    initNovus("vis_hlyoubi_892", apiKey)
  }, []) // fires exactly once on mount

  return null
}