import { cn } from "@/lib/utils"

export function SkeletonLoader({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        "animate-pulse rounded-sm bg-zinc-900",
        className
      )}
      {...props}
    />
  )
}
