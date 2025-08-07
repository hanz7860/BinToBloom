import axios from 'axios'
export interface RegisterDto {
  name: string
  email: string
  password: string
  role: 'DONOR' | 'COLLECTOR'
  location: {
    address: string
    latitude: number
    longitude: number
  }
}

// const API_BASE_URL =
//   process.env.NEXT_PUBLIC_API_URL ||
//   process.env.NEXT_PUBLIC_API_URL_LOCAL ||
//   'http://localhost:8080/api'

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL_LOCAL || 'http://localhost:8080/api'

console.log('API Base URL:', API_BASE_URL)
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
})

// Request interceptor to add JWT token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token')
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

// Response interceptor to handle token expiration
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token')
      window.location.href = '/login'
    }
    return Promise.reject(error)
  }
)

export const authAPI = {
  login: (email: string, password: string) =>
    api.post('/auth/login', { email, password }),

  register: (userData: RegisterDto) => api.post('/auth/register', userData),

  verifyToken: () => api.get('/auth/verify'),
}

export const pickupAPI = {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  schedulePickup: (pickupData: any) => api.post('/pickups', pickupData),

  getUserPickups: () => api.get('/pickups/user'),

  getAvailablePickups: (location: { latitude: number; longitude: number }) =>
    api.get(
      `/pickups/available?lat=${location.latitude}&lng=${location.longitude}`
    ),

  acceptPickup: (pickupId: number) => api.put(`/pickups/${pickupId}/accept`),

  updatePickupStatus: (pickupId: number, status: string) =>
    api.put(`/pickups/${pickupId}/status`, { status }),
}

export const notificationAPI = {
  getNotifications: () => api.get('/notifications'),

  markAsRead: (notificationId: number) =>
    api.put(`/notifications/${notificationId}/read`),
}

export default api
