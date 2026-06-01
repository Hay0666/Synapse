"use client"

import { useEffect } from "react"
import { initNovus } from "@/lib/analytics"

export function NovusProvider() {
  useEffect(() => {
    initNovus("vis_hlyoubi_892", "7e7c941e-d750-4903-b3fe-d274a46fb223")
  }, [])

  return null
}
