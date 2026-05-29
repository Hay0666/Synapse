import * as React from "react"
import { cn } from "@/lib/utils"

export interface SectionLabelProps extends React.HTMLAttributes<HTMLParagraphElement> {}

export function SectionLabel({ className, ...props }: SectionLabelProps) {
  return (
    <p
      className={cn(
        "text-[10px] uppercase tracking-[0.12em] font-semibold text-zinc-600",
        className
      )}
      {...props}
    />
  )
}
