"use client"

import { useEffect } from "react"
import { initNovus } from "@/lib/analytics"

export function NovusProvider() {
  useEffect(() => {
    initNovus("vis_hlyoubi_892", "acc_orion_prod")

    // Initialize Pendo with an anonymous visitor.
    // Empty visitor.id lets the SDK resolve from cookies/localStorage if available,
    // otherwise falls back to a new anonymous visitor.
    pendo.initialize({
      visitor: {
        id: ''
      }
    });

    // Identify the signed-in visitor and account.
    pendo.identify({
      visitor: {
        id: 'vis_hlyoubi_892'
      },
      account: {
        id: 'acc_orion_prod'
      }
    });
  }, []) // fires exactly once on mount

  return null
}
