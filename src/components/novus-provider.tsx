"use client"

import { useEffect } from "react"

export function NovusProvider() {
  useEffect(() => {
    pendo.initialize({
      visitor: {
        id: ''
      }
    });

    pendo.identify({
      visitor: {
        id: 'vis_hlyoubi_892',
        full_name: 'Haytam Lyoubi',
        role: 'Lead Product Manager'
      },
      account: {
        id: '7e7c941e-d750-4903-b3fe-d274a46fb223',
        name: 'Acme Corp',
        workspaceUrl: 'acme',
        planLevel: 'Pro',
        planPrice: '$49',
        seatCapacity: 10,
        activeMembers: 8
      }
    });
  }, [])

  return null
}
