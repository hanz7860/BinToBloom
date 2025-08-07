import { type NextRequest, NextResponse } from "next/server"

const BACKEND_BASE_URL = process.env.NEXT_PUBLIC_BACKEND_URL ?? "http://localhost:8080"

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url)
  const limit = searchParams.get("limit") ?? "10"

  try {
    const res = await fetch(`${BACKEND_BASE_URL}/api/users/leaderboard?limit=${limit}`, {
      headers: { "Content-Type": "application/json" },
      cache: "no-store",
    })

    if (!res.ok) {
      const text = await res.text()
      return NextResponse.json({ error: text }, { status: res.status })
    }

    const data = await res.json()
    return NextResponse.json(data)
  } catch {
    return NextResponse.json({ error: "Unable to reach backend" }, { status: 502 })
  }
}
