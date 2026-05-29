"use client"

import { useEffect } from "react"
import { initNovus } from "@/lib/analytics"

export function NovusProvider() {
  useEffect(() => {
    initNovus("vis_hlyoubi_892", "acc_orion_prod")
  }, []) // fires exactly once on mount

  return null
}
