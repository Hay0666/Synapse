import { Badge } from "@/components/ui/badge"
import { SectionLabel } from "@/components/ui/section-label"

const columns = [
  {
    id: "backlog",
    title: "Backlog",
    tasks: [
      { id: "TSK-101", title: "Design system token audit", priority: "Low",    assignee: "AS", date: "Oct 12" },
      { id: "TSK-102", title: "Implement new feedback widget", priority: "High",   assignee: "JD", date: "Oct 14" },
      { id: "TSK-103", title: "Research analytics tools",     priority: "Medium", assignee: "MK", date: "Oct 15" },
    ],
  },
  {
    id: "in-progress",
    title: "In Progress",
    tasks: [
      { id: "TSK-098", title: "Investigate high drop-off on feedback forms", priority: "High", assignee: "HL", date: "Oct 10" },
      { id: "TSK-099", title: "User interviews: Q4 roadmap",      priority: "Medium", assignee: "AS", date: "Oct 11" },
    ],
  },
  {
    id: "done",
    title: "Done",
    tasks: [
      { id: "TSK-095", title: "Deploy v2.1.0 to production",  priority: "High",   assignee: "MK", date: "Oct 08" },
      { id: "TSK-096", title: "Update privacy policy",         priority: "Low",    assignee: "JD", date: "Oct 09" },
      { id: "TSK-097", title: "Fix navigation bug on mobile",  priority: "Medium", assignee: "AS", date: "Oct 09" },
    ],
  },
]

const priorityClasses: Record<string, string> = {
  High:   "bg-red-950/30 text-red-400 border border-red-900/50",
  Medium: "bg-zinc-900 text-zinc-400 border border-zinc-800",
  Low:    "bg-zinc-900 text-zinc-600 border border-zinc-800/60",
}

export default function KanbanBoard() {
  return (
    <div className="flex-1 flex flex-col h-full overflow-hidden">
      {/* Header */}
      <header className="flex h-12 items-center justify-between border-b border-zinc-900 px-6 shrink-0">
        <h1 className="text-sm font-semibold text-zinc-100 tracking-tight">Q4 Roadmap</h1>
        <div className="flex -space-x-1.5">
          {["JD","AS","MK"].map(a => (
            <div key={a} className="h-6 w-6 rounded-full bg-zinc-800 border border-zinc-900 flex items-center justify-center text-[10px] text-zinc-400 font-semibold">
              {a}
            </div>
          ))}
        </div>
      </header>

      {/* Board */}
      <div className="flex-1 overflow-x-auto p-6">
        <div className="flex gap-5 h-full items-start min-w-max">
          {columns.map((column) => (
            <div key={column.id} className="w-72 shrink-0 flex flex-col">
              {/* Column header */}
              <div className="flex items-center justify-between mb-3">
                <SectionLabel>{column.title}</SectionLabel>
                <span className="text-[11px] font-medium text-zinc-700 tabular-nums">
                  {column.tasks.length}
                </span>
              </div>

              {/* Cards */}
              <div className="flex flex-col gap-2">
                {column.tasks.map((task) => (
                  <div
                    key={task.id}
                    className="group flex flex-col gap-3 rounded-lg border border-zinc-900 bg-zinc-950 p-4 cursor-pointer hover:border-zinc-700 transition-colors duration-150 ease-out"
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-[11px] font-mono text-zinc-700">{task.id}</span>
                      <div className="h-5 w-5 rounded-full bg-zinc-800 border border-zinc-700 flex items-center justify-center text-[9px] text-zinc-400 font-bold">
                        {task.assignee}
                      </div>
                    </div>
                    <p className="text-[13px] font-medium text-zinc-200 leading-snug">
                      {task.title}
                    </p>
                    <div className="flex items-center justify-between">
                      <span className={`text-[10px] font-medium rounded-sm px-1.5 py-0.5 ${priorityClasses[task.priority]}`}>
                        {task.priority}
                      </span>
                      <span className="text-[11px] text-zinc-700 font-medium">{task.date}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
