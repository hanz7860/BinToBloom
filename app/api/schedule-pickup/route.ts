import { type NextRequest, NextResponse } from 'next/server'

const BACKEND_BASE_URL =
  process.env.NEXT_PUBLIC_BACKEND_URL ?? 'http://localhost:8080'

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    // Get the Authorization header from the incoming request
    const authHeader = req.headers.get('authorization')

    console.log(
      'Frontend API: Sending schedule pickup request to backend:',
      `${BACKEND_BASE_URL}/api/pickups/schedule`
    )
    console.log(
      'Frontend API: Forwarding Authorization Header:',
      authHeader ? 'Present' : 'Missing'
    )
    console.log('Frontend API: Request Body:', body)

    const headers: HeadersInit = {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    }

    // IMPORTANT: Forward the Authorization header if it exists
    if (authHeader) {
      headers['Authorization'] = authHeader
    }

    // Remove userId from query parameter, backend will extract from token
    const res = await fetch(`${BACKEND_BASE_URL}/api/pickups/schedule`, {
      method: 'POST',
      headers: headers, // Use the headers object with Authorization
      body: JSON.stringify(body),
    })

    const responseText = await res.text()
    let data
    try {
      data = JSON.parse(responseText)
    } catch (jsonError) {
      console.error(
        'Frontend API: Failed to parse backend JSON response:',
        responseText,
        jsonError
      )
      return NextResponse.json(
        { success: false, message: 'Invalid JSON response from backend' },
        { status: 500 }
      )
    }

    console.log(
      `Frontend API: Received response from backend - Status: ${res.status}, Data:`,
      data
    )

    if (!res.ok) {
      return NextResponse.json(data, { status: res.status })
    }

    return NextResponse.json(data)
  } catch (error) {
    console.error('Frontend API: Schedule Pickup API error:', error)
    return NextResponse.json(
      {
        success: false,
        message:
          'Unable to reach backend server. Please check your connection.',
      },
      { status: 502 }
    )
  }
}
