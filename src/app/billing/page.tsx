"use client"

import { SectionLabel } from "@/components/ui/section-label"
import { Button } from "@/components/ui/button"
import { Check } from "lucide-react"

const plans = [
  {
    name: "Starter",
    price: "$0",
    current: false,
    features: ["Up to 3 seats", "Basic analytics", "Community support"],
  },
  {
    name: "Pro",
    price: "$49",
    current: true,
    features: ["Up to 10 seats", "Advanced analytics", "Priority support", "API access"],
  },
  {
    name: "Enterprise",
    price: "$199",
    current: false,
    features: ["Unlimited seats", "Custom integrations", "Dedicated CSM", "SLA guarantee"],
  },
]

export default function BillingPage() {
  return (
    <div className="flex-1 flex flex-col h-full overflow-hidden">
      <header className="flex h-12 items-center justify-between border-b border-zinc-900 px-6 shrink-0">
        <h1 className="text-sm font-semibold text-zinc-100 tracking-tight">Billing & Plans</h1>
        <span className="text-[11px] font-medium text-zinc-400 bg-zinc-900 border border-zinc-800 px-2.5 py-1 rounded-full">
          Pro — $49/mo
        </span>
      </header>

      <div className="flex-1 overflow-y-auto p-8">
        <div className="max-w-4xl mx-auto space-y-10 pb-24">

          {/* Usage */}
          <section className="space-y-3">
            <SectionLabel>Current usage</SectionLabel>
            <div className="rounded-lg border border-zinc-900 bg-zinc-950 p-5">
              <div className="flex justify-between items-center mb-3">
                <div>
                  <p className="text-sm font-medium text-zinc-200">Active Members</p>
                  <p className="text-xs text-zinc-500 mt-0.5">8 of 10 seats used</p>
                </div>
                <span className="text-xs font-mono text-zinc-400">80%</span>
              </div>
              <div className="h-1.5 w-full bg-zinc-900 rounded-full overflow-hidden">
                <div className="h-full bg-zinc-300 rounded-full transition-all" style={{ width: "80%" }} />
              </div>
            </div>
          </section>

          {/* Plans */}
          <section className="space-y-3">
            <SectionLabel>Available plans</SectionLabel>
            <div className="grid md:grid-cols-3 gap-4">
              {plans.map((plan) => (
                <div
                  key={plan.name}
                  className={`rounded-lg border p-5 flex flex-col ${
                    plan.current
                      ? "border-zinc-700 bg-zinc-950"
                      : "border-zinc-900 bg-zinc-950/50"
                  }`}
                >
                  {/* Name row */}
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm font-semibold text-zinc-100">{plan.name}</span>
                    {plan.current && (
                      <span className="text-[10px] font-medium text-zinc-400 bg-zinc-800 border border-zinc-700 px-2 py-0.5 rounded-sm">
                        Current
                      </span>
                    )}
                  </div>

                  {/* Price */}
                  <div className="mt-2 mb-5 font-mono text-2xl font-semibold text-zinc-100 tracking-tight">
                    {plan.price}
                    <span className="text-sm font-sans font-normal text-zinc-600">/mo</span>
                  </div>

                  {/* Features */}
                  <ul className="space-y-2.5 mb-6 flex-1">
                    {plan.features.map((f) => (
                      <li key={f} className="flex items-center gap-2 text-[13px] text-zinc-400">
                        <Check className="h-3.5 w-3.5 text-zinc-600 shrink-0" />
                        {f}
                      </li>
                    ))}
                  </ul>

                  <Button
                    variant={plan.current ? "outline" : "ghost"}
                    className="w-full text-xs"
                    disabled
                    onClick={() => {
                      const currentPlan = plans.find((p) => p.current)
                      if (typeof window !== "undefined" && window.pendo) {
                        window.pendo.track("plan_upgrade_initiated", {
                          currentPlan: currentPlan?.name || "unknown",
                          targetPlan: plan.name,
                          currentPrice: currentPlan?.price || "unknown",
                          targetPrice: plan.price,
                          seatsUsed: "8",
                          seatsAvailable: "10",
                        })
                      }
                    }}
                  >
                    {plan.current ? "Manage Plan" : plan.name === "Starter" ? "Downgrade" : "Upgrade"}
                  </Button>
                </div>
              ))}
            </div>
          </section>

        </div>
      </div>
    </div>
  )
}
