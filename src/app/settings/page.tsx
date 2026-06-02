"use client"

import { useState } from "react"
import { SectionLabel } from "@/components/ui/section-label"
import { Button } from "@/components/ui/button"

const defaultPreferences = [
  { label: "Desktop Notifications", desc: "Push notifications when assigned a task.", on: true },
  { label: "Weekly Digest", desc: "Email summary of team velocity each Monday.", on: false },
  { label: "Auto-assign Issues", desc: "Route unassigned issues to the last active member.", on: false },
]

export default function SettingsPage() {
  const [workspaceName] = useState("Acme Corp")
  const [workspaceUrl] = useState("acme")
  const [preferences, setPreferences] = useState(defaultPreferences)

  const handleSaveChanges = () => {
    // Pendo Track Event: workspace_settings_saved
    if (typeof window !== "undefined" && window.pendo) {
      pendo.track("workspace_settings_saved", {
        workspaceName,
        workspaceUrl,
        changedFields: "workspaceName,workspaceUrl",
      })
    }
  }

  const handlePreferenceToggle = (index: number) => {
    const pref = preferences[index]
    const newValue = !pref.on

    setPreferences((prev) =>
      prev.map((p, i) => (i === index ? { ...p, on: newValue } : p))
    )

    // Pendo Track Event: preference_toggled
    if (typeof window !== "undefined" && window.pendo) {
      pendo.track("preference_toggled", {
        preferenceName: pref.label,
        newValue: String(newValue),
        previousValue: String(pref.on),
      })
    }
  }

  const handleDeleteWorkspace = () => {
    // Pendo Track Event: workspace_deleted
    if (typeof window !== "undefined" && window.pendo) {
      pendo.track("workspace_deleted", {
        workspaceName,
        memberCount: 8,
        planType: "Pro",
      })
    }
  }

  return (
    <div className="flex-1 flex flex-col h-full overflow-hidden">
      <header className="flex h-12 items-center justify-between border-b border-zinc-900 px-6 shrink-0">
        <h1 className="text-sm font-semibold text-zinc-100 tracking-tight">Workspace Settings</h1>
      </header>

      <div className="flex-1 overflow-y-auto p-8">
        <div className="max-w-3xl mx-auto space-y-0 pb-24">

          {/* Section: General */}
          <div className="py-8 grid md:grid-cols-3 gap-8 border-b border-zinc-900">
            <div>
              <SectionLabel className="mb-2">General</SectionLabel>
              <p className="text-xs text-zinc-500 leading-relaxed mt-1">
                Update your workspace name and core details.
              </p>
            </div>
            <div className="md:col-span-2 space-y-4">
              <div className="space-y-1.5">
                <label className="text-xs font-medium text-zinc-400">Workspace Name</label>
                <input
                  type="text"
                  defaultValue="Acme Corp"
                  disabled
                  className="w-full bg-zinc-950 border border-zinc-800 rounded-md px-3 py-2 text-sm text-zinc-300 placeholder:text-zinc-600 focus:outline-none focus:border-zinc-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                />
              </div>
              <div className="space-y-1.5">
                <label className="text-xs font-medium text-zinc-400">Workspace URL</label>
                <div className="flex">
                  <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-zinc-800 bg-zinc-900 text-zinc-600 text-xs">
                    orion.app/
                  </span>
                  <input
                    type="text"
                    defaultValue="acme"
                    disabled
                    className="flex-1 min-w-0 bg-zinc-950 border border-zinc-800 rounded-r-md px-3 py-2 text-sm text-zinc-300 focus:outline-none focus:border-zinc-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                  />
                </div>
              </div>
              <Button disabled className="text-xs" onClick={handleSaveChanges}>Save Changes</Button>
            </div>
          </div>

          {/* Section: Preferences */}
          <div className="py-8 grid md:grid-cols-3 gap-8 border-b border-zinc-900">
            <div>
              <SectionLabel className="mb-2">Preferences</SectionLabel>
              <p className="text-xs text-zinc-500 leading-relaxed mt-1">
                Control notifications and interface behaviour.
              </p>
            </div>
            <div className="md:col-span-2 space-y-0 rounded-lg border border-zinc-900 divide-y divide-zinc-900 overflow-hidden">
              {preferences.map(({ label, desc, on }, index) => (
                <div key={label} className="flex items-center justify-between px-5 py-4">
                  <div>
                    <p className="text-sm font-medium text-zinc-200">{label}</p>
                    <p className="text-xs text-zinc-500 mt-0.5">{desc}</p>
                  </div>
                  {/* Toggle */}
                  <button
                    type="button"
                    onClick={() => handlePreferenceToggle(index)}
                    className={`relative h-5 w-9 rounded-full border transition-colors shrink-0 ${
                      on
                        ? "bg-zinc-200 border-zinc-300"
                        : "bg-zinc-900 border-zinc-800"
                    }`}
                  >
                    <div
                      className={`absolute top-0.5 h-4 w-4 rounded-full transition-all ${
                        on
                          ? "left-[calc(100%-18px)] bg-zinc-950"
                          : "left-0.5 bg-zinc-600"
                      }`}
                    />
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Section: Danger Zone */}
          <div className="py-8 grid md:grid-cols-3 gap-8">
            <div>
              <SectionLabel className="mb-2 text-red-700">Danger Zone</SectionLabel>
              <p className="text-xs text-zinc-500 leading-relaxed mt-1">
                Destructive actions that cannot be undone.
              </p>
            </div>
            <div className="md:col-span-2 rounded-lg border border-zinc-900 p-5 flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-zinc-200">Delete Workspace</p>
                <p className="text-xs text-zinc-500 mt-0.5">
                  Permanently deletes all data and members.
                </p>
              </div>
              <Button variant="danger" className="text-xs shrink-0" disabled onClick={handleDeleteWorkspace}>
                Delete
              </Button>
            </div>
          </div>

        </div>
      </div>
    </div>
  )
}
