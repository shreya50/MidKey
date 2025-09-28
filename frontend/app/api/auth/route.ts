import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    console.log('🔐 Frontend: Starting authentication request...')
    
    // Call the proof server
    const proofServerUrl = 'http://localhost:3001/generate-and-verify-proof'
    const response = await fetch(proofServerUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
    })

    console.log('🔐 Frontend: Proof server response status:', response.status)

    if (response.ok) {
      const data = await response.json()
      console.log('✅ Frontend: Authentication successful:', data)
      
      return NextResponse.json({
        success: true,
        message: 'Authentication successful',
        data: data
      })
    } else {
      console.log('❌ Frontend: Authentication failed')
      return NextResponse.json({
        success: false,
        message: 'Authentication failed'
      }, { status: 401 })
    }
  } catch (error) {
    console.error('❌ Frontend: Authentication error:', error)
    return NextResponse.json({
      success: false,
      message: 'Authentication service unavailable'
    }, { status: 500 })
  }
}

