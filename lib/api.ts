import { authService } from './auth'

interface ApiResponse<T = any> {
  success: boolean
  message: string
  data?: T
}

class ApiService {
  private baseUrl: string

  constructor() {
    this.baseUrl =
      process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:8080'
  }

  private async makeRequest<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<ApiResponse<T>> {
    try {
      const url = `${this.baseUrl}${endpoint}`
      const headers = {
        ...authService.getAuthHeaders(),
        ...options.headers,
      }

      const response = await fetch(url, {
        ...options,
        headers,
      })

      const data = await response.json()

      // Handle token expiration
      if (response.status === 401) {
        const refreshed = await authService.refreshToken()
        if (refreshed) {
          // Retry the request with new token
          return this.makeRequest(endpoint, options)
        } else {
          authService.logout()
          window.location.href = '/login'
        }
      }

      return data
    } catch (error) {
      console.error('API request failed:', error)
      return {
        success: false,
        message: 'Network error. Please check your connection.',
      }
    }
  }

  async getUserStats(): Promise<ApiResponse> {
    return this.makeRequest('/api/dashboard/user-stats')
  }

  async getActivePickup(): Promise<ApiResponse> {
    return this.makeRequest('/api/dashboard/active-pickup')
  }

  async getPickupHistory(page = 0, size = 10): Promise<ApiResponse> {
    return this.makeRequest(
      `/api/dashboard/pickup-history?page=${page}&size=${size}`
    )
  }

  async getPickupTracking(pickupId: number): Promise<ApiResponse> {
    return this.makeRequest(`/api/dashboard/pickup-tracking/${pickupId}`)
  }

  async schedulePickup(pickupData: any): Promise<ApiResponse> {
    return this.makeRequest('/api/pickups/schedule', {
      method: 'POST',
      body: JSON.stringify(pickupData),
    })
  }
}

export const apiService = new ApiService()
export type { ApiResponse }
