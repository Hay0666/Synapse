"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { LayoutDashboard, CreditCard, Settings, Orbit, BarChart2 } from "lucide-react"
import { cn } from "@/lib/utils"

const navLinks = [
  { href: "/",        label: "Board",    icon: LayoutDashboard },
  { href: "/billing", label: "Billing",  icon: CreditCard },
  { href: "/settings",label: "Settings", icon: Settings },
]

export function Sidebar() {
  const pathname = usePathname()

  return (
    <aside className="w-[220px] border-r border-zinc-900 bg-[#000] hidden md:flex flex-col h-full shrink-0">
      {/* Wordmark */}
      <div className="flex h-12 items-center gap-2.5 border-b border-zinc-900 px-5">
        <Orbit className="h-4 w-4 text-zinc-300" />
        <span className="text-sm font-semibold tracking-tight text-zinc-100">Orion</span>
      </div>

      {/* Nav */}
      <nav className="flex-1 px-2 py-3 space-y-0.5">
        {navLinks.map(({ href, label, icon: Icon }) => {
          const active = pathname === href
          return (
            <Link
              key={href}
              href={href}
              className={cn(
                "flex items-center gap-2.5 rounded-md px-3 py-2 text-[13px] font-medium transition-colors duration-100",
                active
                  ? "bg-zinc-900 text-zinc-100"
                  : "text-zinc-500 hover:bg-zinc-900 hover:text-zinc-300"
              )}
            >
              <Icon className="h-3.5 w-3.5 shrink-0" />
              {label}
            </Link>
          )
        })}
      </nav>

      {/* Admin separator */}
      <div className="px-2 pb-2">
        <div className="my-2 h-px bg-zinc-900" />
        <Link
          href="/admin"
          className={cn(
            "flex items-center gap-2.5 rounded-md px-3 py-2 text-[13px] font-medium transition-colors duration-100",
            pathname === "/admin"
              ? "bg-zinc-900 text-zinc-100"
              : "text-zinc-600 hover:bg-zinc-900 hover:text-zinc-400"
          )}
        >
          <BarChart2 className="h-3.5 w-3.5 shrink-0" />
          Analytics
        </Link>
      </div>

      {/* User row */}
      <div className="border-t border-zinc-900 p-3">
        <div className="flex items-center gap-2.5 rounded-md px-2 py-2 hover:bg-zinc-900 transition-colors cursor-pointer">
          <div className="h-6 w-6 rounded-full bg-zinc-800 border border-zinc-700 flex items-center justify-center text-[10px] text-zinc-300 font-semibold shrink-0">
            HL
          </div>
          <div className="flex flex-col min-w-0">
            <span className="text-[13px] font-medium leading-none text-zinc-300 truncate">Haytam Lyoubi</span>
            <span className="text-[11px] text-zinc-600 mt-1 truncate">Lead Product Manager</span>
          </div>
        </div>
      </div>
    </aside>
  )
}
