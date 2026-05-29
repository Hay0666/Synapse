import * as React from "react"
import { cn } from "@/lib/utils"

export interface StatCardProps extends React.HTMLAttributes<HTMLDivElement> {
  title: string
  value: string | number
  trend?: {
    value: number
    label?: string
  }
}

export function StatCard({ title, value, trend, className, ...props }: StatCardProps) {
  return (
    <div
      className={cn(
        "flex flex-col gap-3 rounded-lg border border-zinc-800 bg-zinc-950 p-5",
        className
      )}
      {...props}
    >
      <p className="text-xs font-medium text-zinc-500 tracking-wide">{title}</p>
      <div className="flex items-baseline gap-3">
        <span className="font-mono text-2xl font-semibold tracking-tight text-zinc-50">
          {value}
        </span>
        {trend && (
          <span
            className={cn(
              "text-xs font-medium tabular-nums",
              trend.value >= 0 ? "text-green-400" : "text-red-400"
            )}
          >
            {trend.value > 0 ? "+" : ""}{trend.value}%
            {trend.label && (
              <span className="ml-1 text-zinc-600 font-normal">{trend.label}</span>
            )}
          </span>
        )}
      </div>
    </div>
  )
}
