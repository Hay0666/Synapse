# ⚡ ANTIGRAVITY MISSION BRIEF — SYNAPSE
### Hackathon-Grade Agentic Product | Multi-Agent Orchestrated Build

---

## ◈ MISSION OVERVIEW

**Task type:** Multi-agent web build  
**Complexity:** High — working product, polished SaaS UI, AI-powered widget, analytics dashboard  
**Deliverable:** Production-ready, deployed Next.js application for **Synapse** — submission for the Mind the Product World Product Day Hackathon 2026

You are building **Synapse** — an embeddable feedback intelligence widget that replaces text forms with AI-generated interactive UI. When a user clicks the Synapse trigger, the system reads their current page context, makes an AI routing decision, and renders one of three pre-built interaction components — a slider, a swipe card, or a drag-and-drop ranker — in under one second. No text box. No survey. The interface itself becomes the answer.

This is not a feedback tool. This is **the end of the feedback form**.

Dispatch agents to plan, scaffold, build, test, and verify each phase before proceeding. Generate Artifacts at each milestone.

---

## ◈ AGENT DISPATCH PLAN

### Agent 1 — Architect
**Task:** Scaffold the full project, establish the design token system, create folder structure, install all dependencies.

**Deliverables (Artifacts):**
- `architecture-plan.md` — folder tree, component map, routing strategy, data flow diagram
- `design-tokens.ts` — all CSS custom properties, palette, typography scale, spacing system
- Verified dependency install log

**What to scaffold:** A Next.js 15 App Router project with TypeScript, Tailwind CSS, and all animation, AI, and drag-and-drop dependencies the team selects as best fit. No framework opinion is imposed — choose what produces the fastest, most stable result for a 30-day solo build.

---

### Agent 2 — Design System
**Task:** Build all reusable UI primitives before any feature is composed.

**Deliverables (Artifacts):**
- Component screenshot of each primitive rendered in isolation
- `components/ui/` folder containing: Button, Badge, SectionLabel, StatCard, ProgressRing, Tooltip, SkeletonLoader, SynapsePanel

**Design mandate:**

**Vibe:** The precision of a surgical instrument wrapped in the restraint of a Dieter Rams object. Linear.app meets a Bloomberg terminal that has learned taste. Dark, fast, exact. Every pixel earns its place.

**Reference products:**
- **Linear** — layered depth, micro-motion that respects time, interface as trust signal
- **Vercel Dashboard** — dark surface system, typographic clarity, data without noise
- **Stripe Radar** — the moment data becomes narrative, real-time feeds that feel alive
- **Raycast** — command-surface speed, the feeling that the tool knows what you need before you ask
- **Loom** — product simplicity as competitive moat, the "it just works" standard

**Palette — in system words:**
```css
--void:         #0a0a0a   /* absolute ground */
--surface:      #111111   /* elevated ground */
--raised:       #171717   /* card surface */
--border:       #1f1f1f   /* structural edge */
--border-dim:   #161616   /* recessed edge */
--text-primary: #fafafa   /* signal */
--text-secondary: #888888 /* context */
--text-ghost:   #444444   /* whisper */
--accent:       #00d4ff   /* electric, singular */
--accent-glow:  rgba(0, 212, 255, 0.12) /* ambient field */
--success:      #22c55e   /* completion */
--danger:       #ef4444   /* rejection */
--gold:         #f59e0b   /* reward state only */
```
One accent color. Used precisely. Never decoratively.

**Typography system:**
- Display / Wordmark: **Geist** — clean authority, zero personality, correct
- Data / Labels / Mono: **Geist Mono** — numbers feel engineered
- Display size range: `2.5rem` to `4rem`. Headlines do not bleed. They command.
- Letter-spacing: `−0.02em` display, `0.08em` all-caps labels
- Line height: `1.1` display, `1.6` body
- Section labels: all-caps, `0.1em` tracking, `--text-ghost` color — used as wayfinding, not decoration
- Body copy: left-aligned. Data-aligned. Never centered for informational content.

---

### Agent 3 — Demo App Canvas
**Task:** Build the host SaaS application — the environment where Synapse lives and demonstrates its value.

**Specification:**

This is a fake project management tool named **Orion**. It must look real enough that a judge believes it is a live product. It does not need to function — it needs to *convince*. Think Linear or Height, built in a day.

**Views to build:**
- **Kanban Board** — 3 columns (Backlog / In Progress / Done), 7–9 task cards with fake assignee avatars, priority labels, and due date chips. Static data. Cards must look like real work.
- **Billing Page** — current plan badge ("Pro — $49/mo"), usage meter bar, a frozen pricing table with three tiers. Nothing is clickable except the Synapse widget.
- **Settings Page** — two-column layout, fake toggles and inputs. Enough to feel like a product people would pay for.
- **Navigation** — fixed left sidebar. Logo, nav links, workspace switcher at top, user avatar at bottom. Collapsed icon-only state on hover.

The Synapse floating action button lives in the bottom-right corner of every view, always visible, always ready.

**Artifacts to generate:**
- Screenshot of Kanban Board view
- Screenshot of Billing Page view
- Screenshot of Settings Page view

---

### Agent 4 — Motion & Interaction Architecture
**Task:** Implement the global motion layer before the Synapse widget is composed. Every interaction in this product must feel considered.

**System specification:**

**The one signature animation — the FAB morph:**
The Synapse trigger starts as a `48×48px` circle in the bottom-right corner. When clicked, it does not open a modal or a drawer. It *becomes* the panel — morphing via layout animation from a small circle into a `380px` wide panel. Same element. Same position. Expanding. This is the wow moment. It must be flawless.

- Morph duration: `320ms`
- Easing: spring physics — high stiffness, low bounce
- The icon inside rotates `90deg` as the panel expands
- A pulsing ring radiates from the FAB every `3s` in idle state — the ring is `--accent` at `20%` opacity, scale `1 → 1.8`, fade out

**Secondary motion principles:**
- Skeleton loader appears in `80ms` while the AI call resolves — never let the interface feel frozen
- Component entry: `y: 12px → 0`, `opacity: 0 → 1`, `240ms`, spring easing
- Drag physics on the ranker: spring snap, satisfying resistance
- All hover states: `150ms` ease-out. No bounce on hover.
- Swipe card exit: `x: ±300px` + `rotate: ±15deg` + `opacity: 0`, `280ms`

**Micro-interaction checklist:**
- Slider thumb: custom styled, moves with cursor drag, emoji updates in real-time above it
- Submission: brief success flash on `--success` color, checkmark draws via SVG stroke animation
- Dashboard charts: bars/lines animate in on page enter, staggered left-to-right

**Artifacts to generate:**
- Screen recording of FAB morph open and close
- Screen recording of all three widget components in use

---

### Agent 5 — The Agentic Core
**Task:** Build the AI routing engine — the intelligence layer that makes Synapse real.

**This is the product. Everything else is packaging.**

**The context observer:**
A silent background utility that tracks: current URL route, semantic labels of the last 3 clicked elements, time spent on current view. It runs continuously. It stores a rolling window of signal. When the user clicks the Synapse FAB, this observer assembles a context payload and fires it to the AI endpoint.

Only collect: route, page title, last 3 click labels, dwell time in seconds. Nothing else. No DOM scraping. No PII.

**The AI routing endpoint:**
A single server route receives the context payload. It calls an AI model with a strict prompt and a strict output schema. The model must return one of three possible component identifiers, a question string under 12 words, a brief reason string, and any data parameters needed to populate that component.

The model never generates UI. The model never writes code. The model selects from a closed list of three options and fills in the blanks.

**Routing logic the AI must internalize:**
- User on a feature/task view → **ranker** — ask them to prioritize what's visible
- User on billing/pricing → **swipe** — ask binary approval on a feature or plan change
- User on settings/onboarding → **slider** — ask for satisfaction or difficulty rating
- Question must reference what the user was *just doing*, not a generic survey prompt
- Ranker items must be drawn from the actual content visible on the current page

**Output contract — strict JSON, always:**
```
{
  component: "slider" | "swipe" | "ranker",
  question: string (max 12 words),
  reason: string (max 15 words, shown as subtext in the panel),
  data: {
    low_label?: string,
    high_label?: string,
    card_title?: string,
    card_description?: string,
    items?: string[] (max 4)
  }
}
```
If the AI returns anything outside this schema, the widget falls back to the slider silently.

**Artifacts to generate:**
- Screenshot of the AI response payload in the browser console for each of the three pages
- Screen recording of the full loop: click FAB → loading state → component renders → submit → thank you

---

### Agent 6 — The Three Widget Components
**Task:** Build the three pre-built interaction components. These must be the most polished UI in the entire project. A judge will spend 90% of their time inside these.

---

**COMPONENT 01 — THE SLIDER**
### ⚠ THE SATISFACTION INSTRUMENT

Full width inside the Synapse panel. Question text at top. Below: a custom range track, `8px` tall, filled portion in `--accent`. A large number in `4rem` Geist Mono centered above the track — updates live as the user drags. Emoji reaction directly above the number, chosen from five states across the scale. Low and high labels in `--text-ghost` at track ends. Single submit button below, full width, `--accent` background.

The emoji must feel like it *reacts* — scale `1 → 1.2 → 1` on change, `120ms`.

---

**COMPONENT 02 — THE SWIPE CARD**
### ⚠ THE BINARY DECISION

A `320×180px` card centered in the panel. Card surface uses `--raised`. Question as card title in `1.1rem`. Below it, a one-line description from the AI data. Two full-width buttons stacked below the card — Reject (left, `--danger` text) and Approve (right, `--success` text). No icons. Words only.

On click: the card exits in the direction of the decision — left for reject, right for approve — with a slight rotation. Duration: `280ms`. The button pressed briefly highlights before the exit begins.

Track yes/no counts for the dashboard.

---

**COMPONENT 03 — THE RANKER**
### ⚠ THE PRIORITY ENGINE

A vertical list of 3–4 items inside the panel. Each row: `52px` tall. Left: a drag handle (6-dot grid icon in `--text-ghost`). Center: item label in `--text-primary`. Right: rank number in `--accent`, Geist Mono, updates as position changes.

On drag: the item scales slightly, border brightens to `--accent` at `30%` opacity, sibling items smoothly shift. On drop: spring snap to final position, `stiffness: 400, damping: 30`.

This must feel satisfying. A judge who drags one item should immediately drag another.

Submit button below — full width, `--surface` bg, `--accent` border, `--accent` text.

**Artifacts to generate:**
- Isolated screenshot of each component at rest
- Isolated screenshot of each component mid-interaction

---

### Agent 7 — Novus.ai Integration
**Task:** Integrate Novus.ai as the product's analytics backbone. This is a mandatory hackathon requirement — but more importantly, it is the proof layer. Novus transforms Synapse from "a cool widget" into "a product with measurable ROI."

**Integration mandate:**

Install the Novus/Pendo SDK in the root layout. Initialize with a visitor ID and account ID on page load.

**Every Synapse interaction must fire a tracked event:**
- `synapse_widget_opened` — with route and dwell time
- `synapse_component_rendered` — with component type and AI reason
- `synapse_submitted` — with component type, response value, and time-to-complete
- `synapse_abandoned` — fired if widget closes without submission

These four events are the dataset. The admin dashboard reads from them.

**The proof narrative for judges:**
Novus Agent Analytics tracks the performance of AI-generated interactions. The dashboard will show, using real or seeded data, that Synapse components achieve a dramatically higher completion rate than a simulated text form baseline. This is not a claim — it is a demonstration backed by the Novus data layer.

**Artifacts to generate:**
- Screenshot of Novus SDK installation in the project (required for hackathon submission)
- Screenshot of at least one `synapse_submitted` event visible in the Novus/Pendo dashboard

---

### Agent 8 — PM Dashboard
**Task:** Build the `/admin` route — the Product Manager's view of Synapse in action. This is the "proof" section of the demo video. It must look like a real analytics product.

**Layout:** Dark surface, consistent with the Orion app. Two-column grid above the fold.

**Panels to build:**

**Completion Rate Chart** — An area or line chart. Two series: "Synapse" (should trend toward 80–85%) and "Text Form Baseline" (flat at ~22%). X-axis: last 7 days. The gap between the two lines is the entire value proposition of the product. Make it visually undeniable.

**Response Feed** — A live-updating list of recent Synapse submissions. Each entry: timestamp, page route, which component was used (color-coded badge), and the response value. Entries slide in from top. Stored in localStorage — no backend required.

**Aggregate Stats Row** — Three stat cards across the top: Total Interactions, Avg Completion Time, Most Used Component. Numbers animate up from zero on page enter.

**Novus Panel** — A dedicated card labeled "Powered by Novus.ai" showing agent interaction metrics. Use real Novus event data if available. If not yet populated, seed with realistic values that make the point.

**Artifacts to generate:**
- Screenshot of the full admin dashboard
- Screenshot of the completion rate chart in detail
- Screenshot of the response feed with at least 5 entries

---

### Agent 9 — QA & Hackathon Compliance
**Task:** Verify the product is submission-ready. Generate a full QA report Artifact.

**Functional checklist:**
- [ ] FAB morph works on all three Orion views
- [ ] AI routing returns correct component for Kanban (ranker), Billing (swipe), Settings (slider)
- [ ] All three components submit successfully and fire Novus events
- [ ] Thank you state appears and auto-dismisses after `2.5s`
- [ ] Admin dashboard loads and displays data
- [ ] Completion rate chart renders with both data series
- [ ] Novus SDK is installed and initialization is confirmed in console

**Performance checklist:**
- [ ] Widget open to component visible: under `1000ms` end-to-end
- [ ] No layout shift during FAB morph
- [ ] Skeleton loader appears within `80ms` of widget open
- [ ] No console errors on any page

**Hackathon submission checklist:**
- [ ] Live Vercel deployment URL works in incognito
- [ ] Novus installation screenshot saved as `novus-install.png`
- [ ] Demo video recorded: exactly `2:30`, follows the scripted arc below
- [ ] README contains: one-line pitch, live URL, tech stack, Novus screenshot

**Demo video arc (2:30):**
- `0:00–0:20` — On camera. "Product managers lose 40% of user feedback to form abandonment. Here's why — and what we built instead."
- `0:20–0:45` — Screen: user clicks feedback on Orion, text box appears, user closes it immediately. The problem in 20 seconds.
- `0:45–1:40` — Synapse activates. Navigate to Kanban. Click FAB. Watch it morph. In under one second, a drag-and-drop ranker appears populated with the actual tasks on the board. User drags. User submits. Navigate to Billing. Different component. The AI knows where they are.
- `1:40–2:15` — Cut to `/admin`. Completion rate chart: Synapse 85% vs text forms 22%. Point to Novus panel. "This isn't a claim. Novus tracks every agentic interaction. The data is here."
- `2:15–2:30` — "Synapse: stop asking users to type. Start generating interfaces that listen."

---

## ◈ COPY DIRECTION

When writing any UI copy, follow these rules:

- No feature-speak ("AI-powered", "intelligent", "seamless") — demonstrate, don't describe
- Short. Direct. Present tense.
- Every label should feel like it was written by someone who has used a real product
- Product voice: a senior PM who has wasted too many hours reading empty NPS surveys and is done with it
- Never use "feedback" in a headline — use "signal", "priority", "clarity", "truth"
- Error states should be human: "The AI is thinking. Give it a moment." not "Error: timeout"

---

## ◈ SCOPE LOCK — READ BEFORE EVERY SESSION

**Do not build:**
- User authentication or accounts
- A real backend database
- More than 3 widget components
- Mobile responsiveness (desktop demo only)
- Integration with a real SaaS tool

**Build only:** the one core loop, shipped and working, at the highest possible level of polish.

The winning condition is not features. It is a flawless 90-second demo of a single interaction that makes a product manager think: *I want this in my product tomorrow.*

---

## ◈ FINAL MISSION CHECKPOINT

Before marking complete, verify all Artifacts are attached to the Mission:

| Artifact | Agent | Status |
|---|---|---|
| `architecture-plan.md` | Architect | — |
| `design-tokens.ts` | Design System | — |
| Orion app screenshots (3 views) | Agent 3 | — |
| FAB morph screen recording | Agent 4 | — |
| Widget components screen recording | Agent 4 | — |
| AI response payloads (3 pages) | Agent 5 | — |
| Full loop screen recording | Agent 5 | — |
| Component isolated screenshots (6) | Agent 6 | — |
| Novus install screenshot | Agent 7 | — |
| Novus event screenshot | Agent 7 | — |
| Admin dashboard screenshots (3) | Agent 8 | — |
| QA report + compliance checklist | Agent 9 | — |

Leave inline feedback on any Artifact that deviates from the brief before the agent proceeds.

---

*Paste this entire Mission Brief into Antigravity's Manager View. Do not summarize. Do not simplify. Let the agents work.*
