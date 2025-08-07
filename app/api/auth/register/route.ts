import { type NextRequest, NextResponse } from 'next/server'

const BACKEND_BASE_URL =
  process.env.NEXT_PUBLIC_BACKEND_URL ?? 'http://localhost:8080'

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()

    const res = await fetch(`${BACKEND_BASE_URL}/api/auth/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify(body),
    })

    const data = await res.json()

    if (!res.ok) {
      return NextResponse.json(data, { status: res.status })
    }

    return NextResponse.json(data)
  } catch (error) {
    console.error('Register API error:', error)
    return NextResponse.json(
      { success: false, message: 'Unable to reach backend' },
      { status: 502 }
    )
  }
}
