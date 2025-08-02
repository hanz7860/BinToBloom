import { type NextRequest, NextResponse } from "next/server"

/**
 * Proxy the request to the Spring Boot backend.
 * Change BACKEND_BASE_URL if you deploy the Java service elsewhere.
 */
const BACKEND_BASE_URL = process.env.NEXT_PUBLIC_BACKEND_URL ?? "http://localhost:8080"

export async function GET(_req: NextRequest) {
  try {
    const res = await fetch(`${BACKEND_BASE_URL}/api/impact/global`, {
      // Forward the incoming headers if you need auth, cookies, etc.
      headers: { "Content-Type": "application/json" },
      cache: "no-store",
    })

    if (!res.ok) {
      const text = await res.text()
      return NextResponse.json({ error: text }, { status: res.status })
    }

    const data = await res.json()
    return NextResponse.json(data)
  } catch (err) {
    return NextResponse.json({ error: "Unable to reach backend" }, { status: 502 })
  }
}
