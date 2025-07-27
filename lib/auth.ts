interface User {
  id: number
  name: string
  username: string
  email: string
  type: string
  ecoPoints: number
  totalWasteCollected: number
}

interface AuthResponse {
  success: boolean
  message: string
  token?: string
  user?: User
}

class AuthService {
  private static instance: AuthService
  private token: string | null = null
  private user: User | null = null

  private constructor() {
    if (typeof window !== 'undefined') {
      this.token = localStorage.getItem('token')
      const userData = localStorage.getItem('user')
      this.user = userData ? JSON.parse(userData) : null
      console.log(
        'AuthService initialized. Token:',
        !!this.token,
        'User:',
        !!this.user
      )
    }
  }

  static getInstance(): AuthService {
    if (!AuthService.instance) {
      AuthService.instance = new AuthService()
    }
    return AuthService.instance
  }

  async login(username: string, password: string): Promise<AuthResponse> {
    try {
      console.log(
        'AuthService: Sending login request to Next.js API route /api/auth/login'
      )
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      })

      console.log(
        'AuthService: Received response from Next.js API route. Status:',
        response.status
      )

      if (!response.ok) {
        const errorData = await response
          .json()
          .catch(() => ({ message: 'Unknown error from API route' }))
        console.error(
          'AuthService: Next.js API route returned non-OK status:',
          response.status,
          errorData
        )
        return {
          success: false,
          message:
            errorData.message || `Login failed with status ${response.status}`,
        }
      }

      const data: AuthResponse = await response.json()
      console.log('AuthService: Parsed data from Next.js API route:', data)

      if (data.success && data.token && data.user) {
        this.token = data.token
        this.user = {
          id: data.user.id,
          name: data.user.fullName,
          username: data.user.username,
          email: data.user.email,
          type: data.user.userType.toLowerCase(), // Ensure user type is lowercase
          ecoPoints: data.user.ecoPoints,
          totalWasteCollected: data.user.totalWasteCollected,
        }

        localStorage.setItem('token', this.token)
        localStorage.setItem('user', JSON.stringify(this.user))
        console.log('AuthService: User and token stored in localStorage.')
      }

      return data
    } catch (error: any) {
      console.error('AuthService: Login error caught:', error)
      if (error instanceof TypeError && error.message === 'Failed to fetch') {
        return {
          success: false,
          message:
            'Network connection error. Please check your internet connection or backend server status.',
        }
      }
      return {
        success: false,
        message:
          error.message ||
          'An unexpected error occurred during login. Please try again.',
      }
    }
  }

  async validateToken(): Promise<boolean> {
    console.log('AuthService: Validating token. Current token:', !!this.token)
    if (!this.token) {
      console.log('AuthService: No token found, validation failed.')
      return false
    }

    try {
      const response = await fetch('/api/auth/validate', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${this.token}`,
          'Content-Type': 'application/json',
        },
      })

      const data = await response.json()
      console.log('AuthService: Token validation API response:', data)

      if (response.ok && data.success && data.user) {
        this.user = {
          id: data.user.id,
          name: data.user.fullName,
          username: data.user.username,
          email: data.user.email,
          type: data.user.userType.toLowerCase(), // Ensure user type is lowercase
          ecoPoints: data.user.ecoPoints,
          totalWasteCollected: data.user.totalWasteCollected,
        }
        localStorage.setItem('user', JSON.stringify(this.user))
        console.log('AuthService: Token valid and user data refreshed.')
        return true
      }

      console.log(
        'AuthService: Token validation failed or user data invalid. Logging out.'
      )
      this.logout()
      return false
    } catch (error) {
      console.error('AuthService: Token validation error caught:', error)
      this.logout()
      return false
    }
  }

  async refreshToken(): Promise<boolean> {
    console.log(
      'AuthService: Attempting to refresh token. Current token:',
      !!this.token
    )
    if (!this.token) return false

    try {
      const response = await fetch('/api/auth/refresh', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${this.token}`,
          'Content-Type': 'application/json',
        },
      })

      const data = await response.json()
      console.log('AuthService: Token refresh API response:', data)

      if (response.ok && data.success && data.token) {
        this.token = data.token
        localStorage.setItem('token', this.token)
        console.log('AuthService: Token refreshed successfully.')
        return true
      }

      console.log('AuthService: Token refresh failed.')
      return false
    } catch (error) {
      console.error('AuthService: Token refresh error caught:', error)
      return false
    }
  }

  logout(): void {
    console.log('AuthService: Logging out user.')
    this.token = null
    this.user = null
    localStorage.removeItem('token')
    localStorage.removeItem('user')
  }

  getToken(): string | null {
    return this.token
  }

  getUser(): User | null {
    return this.user
  }

  isAuthenticated(): boolean {
    const authenticated = this.token !== null && this.user !== null
    console.log('AuthService: isAuthenticated called. Result:', authenticated)
    return authenticated
  }

  getAuthHeaders(): Record<string, string> {
    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
    }

    if (this.token) {
      headers['Authorization'] = `Bearer ${this.token}`
    }

    return headers
  }
}

export const authService = AuthService.getInstance()
export type { User, AuthResponse }
