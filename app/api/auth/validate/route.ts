import { type NextRequest, NextResponse } from 'next/server'

const BACKEND_BASE_URL =
  process.env.NEXT_PUBLIC_BACKEND_URL ?? 'http://localhost:8080'

export async function POST(req: NextRequest) {
  try {
    const authHeader = req.headers.get('authorization')

    if (!authHeader) {
      return NextResponse.json(
        { success: false, message: 'Authorization header missing' },
        { status: 401 }
      )
    }

    const res = await fetch(`${BACKEND_BASE_URL}/api/auth/validate`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: authHeader,
        Accept: 'application/json',
      },
    })

    const data = await res.json()

    if (!res.ok) {
      return NextResponse.json(data, { status: res.status })
    }

    return NextResponse.json(data)
  } catch (error) {
    console.error('Validate API error:', error)
    return NextResponse.json(
      {
        success: false,
        message: 'Unable to reach backend server',
      },
      { status: 502 }
    )
  }
}
