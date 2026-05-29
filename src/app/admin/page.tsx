"use client"

import * as React from "react"
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid,
  Tooltip as RechartsTooltip, ResponsiveContainer
} from "recharts"
import { StatCard } from "@/components/ui/stat-card"
import { SectionLabel } from "@/components/ui/section-label"
import { Badge } from "@/components/ui/badge"
import { BarChart2 } from "lucide-react"
import { getEvents, type NovusEvent } from "@/lib/analytics"

const chartData = [
  { day: "Mon", synapse: 84, textForm: 22 },
  { day: "Tue", synapse: 86, textForm: 21 },
  { day: "Wed", synapse: 83, textForm: 23 },
  { day: "Thu", synapse: 87, textForm: 22 },
  { day: "Fri", synapse: 89, textForm: 20 },
  { day: "Sat", synapse: 88, textForm: 21 },
  { day: "Sun", synapse: 91, textForm: 22 },
]

export default function AdminDashboard() {
  const [events, setEvents] = React.useState<NovusEvent[]>([])

  React.useEffect(() => {
    setEvents(getEvents())
    const id = setInterval(() => setEvents(getEvents()), 2000)
    return () => clearInterval(id)
  }, [])

  const submissions = events.filter(e => e.name === "synapse_submitted")
  const opens = events.filter(e => e.name === "synapse_widget_opened")
  const completionRate = opens.length > 0
    ? Math.round((submissions.length / opens.length) * 100)
    : 85

  return (
    <div className="flex-1 flex flex-col h-full overflow-hidden">
      <header className="flex h-12 items-center gap-3 border-b border-zinc-900 px-6 shrink-0">
        <BarChart2 className="h-4 w-4 text-zinc-500" />
        <h1 className="text-sm font-semibold text-zinc-100 tracking-tight">Analytics</h1>
      </header>

      <div className="flex-1 overflow-y-auto p-8">
        <div className="max-w-6xl mx-auto space-y-8 pb-24">

          {/* Stat row */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <StatCard
              title="Total Interactions"
              value={(opens.length + 1245).toLocaleString()}
              trend={{ value: 12.5, label: "vs last week" }}
            />
            <StatCard
              title="Avg. Completion Time"
              value="1.4s"
              trend={{ value: -8.3, label: "faster" }}
            />
            <StatCard
              title="Completion Rate"
              value={`${completionRate > 0 ? completionRate : 87}%`}
              trend={{ value: 65, label: "vs text forms" }}
            />
          </div>

          {/* Main grid */}
          <div className="grid md:grid-cols-3 gap-6">

            {/* Chart */}
            <div className="md:col-span-2 space-y-3">
              <SectionLabel>Completion rate — last 7 days</SectionLabel>
              <div className="h-[320px] rounded-lg border border-zinc-900 bg-zinc-950 p-5">
                {/* Legend */}
                <div className="flex items-center gap-5 mb-5">
                  <div className="flex items-center gap-2">
                    <div className="w-2.5 h-2.5 rounded-sm bg-zinc-200" />
                    <span className="text-xs text-zinc-400">Synapse</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-2.5 h-2.5 rounded-sm bg-zinc-700" />
                    <span className="text-xs text-zinc-600">Text Form</span>
                  </div>
                </div>
                <ResponsiveContainer width="100%" height="85%">
                  <AreaChart data={chartData} margin={{ top: 0, right: 0, left: -25, bottom: 0 }}>
                    <defs>
                      <linearGradient id="synGrad" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#fafafa" stopOpacity={0.15} />
                        <stop offset="100%" stopColor="#fafafa" stopOpacity={0} />
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="#18181b" vertical={false} />
                    <XAxis dataKey="day" stroke="#3f3f46" fontSize={11} tickLine={false} axisLine={false} />
                    <YAxis stroke="#3f3f46" fontSize={11} tickLine={false} axisLine={false} tickFormatter={v => `${v}%`} />
                    <RechartsTooltip
                      contentStyle={{
                        backgroundColor: "#111",
                        borderColor: "#27272a",
                        borderRadius: "8px",
                        fontSize: 12,
                        color: "#fafafa",
                      }}
                      itemStyle={{ color: "#a1a1aa" }}
                    />
                    <Area type="monotone" dataKey="synapse"  stroke="#fafafa"  strokeWidth={1.5} fill="url(#synGrad)" />
                    <Area type="monotone" dataKey="textForm" stroke="#3f3f46"  strokeWidth={1}   fill="transparent" strokeDasharray="4 4" />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Right column */}
            <div className="space-y-6">
              {/* Novus panel */}
              <div className="space-y-3">
                <SectionLabel>Powered by Novus.ai</SectionLabel>
                <div className="rounded-lg border border-zinc-900 bg-zinc-950 p-4 space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1.5">
                      <span className="inline-block w-1.5 h-1.5 rounded-full bg-green-500" />
                      <span className="text-xs font-medium text-zinc-400">Tracking active</span>
                    </div>
                    {/* Verification tooltip badge */}
                    <div className="relative group/tip">
                      <button className="flex items-center gap-1 text-[10px] font-medium text-zinc-700 hover:text-zinc-400 transition-colors border border-zinc-800 hover:border-zinc-700 rounded px-1.5 py-0.5">
                        SDK verified
                      </button>
                      {/* Tooltip */}
                      <div className="pointer-events-none absolute bottom-full right-0 mb-2 w-[240px] rounded-md border border-zinc-800 bg-zinc-950 px-3 py-2.5 opacity-0 group-hover/tip:opacity-100 transition-opacity duration-150 z-10">
                        <p className="text-[11px] leading-relaxed text-zinc-400">
                          Novus SDK verified active: Capturing multi-agent telemetry and prompt-level user intent vectors.
                        </p>
                        {/* Arrow */}
                        <div className="absolute -bottom-1.5 right-3 w-2.5 h-2.5 rotate-45 border-r border-b border-zinc-800 bg-zinc-950" />
                      </div>
                    </div>
                  </div>
                  <div className="space-y-2 pt-1">
                    {[
                      ["Events captured",  (events.length + 8421).toLocaleString()],
                      ["AI decisions",     Math.round((events.length + 8421) / 2).toLocaleString()],
                      ["Sessions tracked", (Math.round((events.length + 8421) / 4)).toLocaleString()],
                    ].map(([k, v]) => (
                      <div key={k} className="flex justify-between items-center">
                        <span className="text-[12px] text-zinc-600">{k}</span>
                        <span className="font-mono text-[12px] text-zinc-300 tabular-nums">{v}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Response feed */}
              <div className="space-y-3">
                <SectionLabel>Live response feed</SectionLabel>
                <div className="rounded-lg border border-zinc-900 bg-zinc-950 overflow-hidden">
                  {submissions.length === 0 ? (
                    <div className="px-4 py-6 text-center text-xs text-zinc-700">
                      No submissions yet. Try the widget ↘
                    </div>
                  ) : (
                    <div className="divide-y divide-zinc-900">
                      {submissions.slice(0, 8).map((sub) => (
                        <div key={sub.id} className="flex items-center justify-between px-4 py-3">
                          <div className="flex items-center gap-2 min-w-0">
                            <Badge variant="default">{sub.properties.component}</Badge>
                            <span className="text-[12px] text-zinc-400 truncate font-mono">
                              {JSON.stringify(sub.properties.value)}
                            </span>
                          </div>
                          <span className="text-[10px] text-zinc-700 shrink-0 ml-2">now</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  )
}
