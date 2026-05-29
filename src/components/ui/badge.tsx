import * as React from "react"
import { cn } from "@/lib/utils"

export interface BadgeProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "default" | "outline" | "accent" | "success" | "danger"
}

function Badge({ className, variant = "default", ...props }: BadgeProps) {
  return (
    <div
      className={cn(
        "inline-flex items-center rounded-sm px-2 py-0.5 text-[11px] font-medium leading-none tracking-wide",
        {
          "bg-zinc-900 text-zinc-400 border border-zinc-800":
            variant === "default",
          "border border-zinc-800 text-zinc-300":
            variant === "outline",
          "bg-white/[0.07] text-zinc-100 border border-zinc-700":
            variant === "accent",
          "bg-green-950/40 text-green-400 border border-green-900/60":
            variant === "success",
          "bg-red-950/40 text-red-400 border border-red-900/60":
            variant === "danger",
        },
        className
      )}
      {...props}
    />
  )
}

export { Badge }
