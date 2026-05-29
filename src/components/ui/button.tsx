import * as React from "react"
import { cn } from "@/lib/utils"

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "default" | "outline" | "ghost" | "danger" | "success"
  size?: "default" | "sm" | "lg" | "icon"
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "default", size = "default", ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(
          // base — no shadows, no glows, precise transitions
          "inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors duration-150 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-zinc-600 disabled:pointer-events-none disabled:opacity-40",
          {
            // Primary: pure white fill, black label
            "bg-white text-black hover:bg-zinc-100 active:bg-zinc-200":
              variant === "default",

            // Outline: transparent bg, 1px zinc border
            "border border-zinc-800 bg-transparent text-zinc-300 hover:bg-zinc-900 hover:text-zinc-100":
              variant === "outline",

            // Ghost: no border
            "bg-transparent text-zinc-400 hover:bg-zinc-900 hover:text-zinc-200":
              variant === "ghost",

            // Danger
            "border border-zinc-800 bg-transparent text-red-400 hover:bg-red-950/40 hover:border-red-900":
              variant === "danger",

            // Success
            "border border-zinc-800 bg-transparent text-green-400 hover:bg-green-950/40 hover:border-green-900":
              variant === "success",

            "h-9 px-4 py-2":       size === "default",
            "h-8 rounded-md px-3 text-xs": size === "sm",
            "h-11 rounded-md px-8 text-base": size === "lg",
            "h-9 w-9":             size === "icon",
          },
          className
        )}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

export { Button }
