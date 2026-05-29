import { NextResponse } from "next/server"

export async function POST(request: Request) {
  try {
    const context = await request.json()
    const { route } = context

    // Simulate AI processing delay
    await new Promise(resolve => setTimeout(resolve, 600))

    // Route: Kanban Board
    if (route === "/") {
      return NextResponse.json({
        component: "ranker",
        question: "Priority check: What ships first?",
        reason: "You've been reviewing the backlog.",
        data: {
          items: [
            "Design system token audit",
            "Implement new feedback widget",
            "Deploy v2.1.0 to production",
            "Research alternative analytics tools"
          ]
        }
      })
    }
    
    // Route: Billing
    if (route.includes("billing")) {
      return NextResponse.json({
        component: "swipe",
        question: "Should we upgrade to Enterprise?",
        reason: "You are nearing your seat limit.",
        data: {
          card_title: "Enterprise Plan Upgrade",
          card_description: "Unlimited seats and custom integrations."
        }
      })
    }

    // Route: Settings
    if (route.includes("settings")) {
      return NextResponse.json({
        component: "slider",
        question: "How easy was it to find this setting?",
        reason: "You navigated through workspace settings.",
        data: {
          low_label: "Confusing",
          high_label: "Intuitive"
        }
      })
    }

    // Fallback
    return NextResponse.json({
      component: "slider",
      question: "How is your experience so far?",
      reason: "Just checking in.",
      data: {
        low_label: "Poor",
        high_label: "Excellent"
      }
    })

  } catch (error) {
    return NextResponse.json({ error: "Failed to parse context" }, { status: 400 })
  }
}
