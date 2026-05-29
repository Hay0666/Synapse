import * as React from "react"
import { cn } from "@/lib/utils"

export interface ProgressRingProps {
  progress: number // 0 to 100
  size?: number
  strokeWidth?: number
  className?: string
}

export function ProgressRing({
  progress,
  size = 120,
  strokeWidth = 12,
  className,
}: ProgressRingProps) {
  const radius = (size - strokeWidth) / 2
  const circumference = radius * 2 * Math.PI
  const offset = circumference - (progress / 100) * circumference

  return (
    <svg
      width={size}
      height={size}
      className={cn("rotate-[-90deg]", className)}
    >
      {/* Background ring */}
      <circle
        className="text-border-dim"
        strokeWidth={strokeWidth}
        stroke="currentColor"
        fill="transparent"
        r={radius}
        cx={size / 2}
        cy={size / 2}
      />
      {/* Progress ring */}
      <circle
        className="text-accent transition-all duration-1000 ease-out"
        strokeWidth={strokeWidth}
        strokeDasharray={circumference}
        strokeDashoffset={offset}
        strokeLinecap="round"
        stroke="currentColor"
        fill="transparent"
        r={radius}
        cx={size / 2}
        cy={size / 2}
      />
    </svg>
  )
}
