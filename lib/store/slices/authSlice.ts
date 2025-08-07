import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { authAPI } from '../../../lib/services/api'
import { LocationDto } from '@/types/auth'

interface User {
  id: number
  email: string
  name: string
  role: 'DONOR' | 'COLLECTOR'
  location?: {
    latitude: number
    longitude: number
    address: string
  }
}

interface AuthState {
  user: User | null
  token: string | null
  isAuthenticated: boolean
  loading: boolean
  error: string | null
  initialized: boolean
}

// 🟢 Load persisted token and user from localStorage (client-side only)
let persistedToken: string | null = null
let persistedUser: User | null = null

if (typeof window !== 'undefined') {
  persistedToken = localStorage.getItem('token')
  const userString = localStorage.getItem('user')
  if (userString) {
    try {
      persistedUser = JSON.parse(userString)
    } catch (error) {
      console.error('Failed to parse user from localStorage:', error)
      persistedUser = null
      localStorage.removeItem('user')
    }
  }
}

const initialState: AuthState = {
  user: persistedUser,
  token: persistedToken,
  isAuthenticated: !!persistedToken,
  loading: false,
  error: null,
  initialized: true,
}

// 🔒 Login Thunk
export const login = createAsyncThunk(
  'auth/login',
  async ({ email, password }: { email: string; password: string }) => {
    const response = await authAPI.login(email, password)
    return response.data
  }
)

// 📝 Register Thunk
export const register = createAsyncThunk(
  'auth/register',
  async (userData: {
    name: string
    email: string
    password: string
    role: 'DONOR' | 'COLLECTOR'
    location: LocationDto
  }) => {
    const response = await authAPI.register(userData)
    return response.data
  }
)

// ✅ Check Auth Status Thunk
export const checkAuthStatus = createAsyncThunk(
  'auth/checkStatus',
  async () => {
    const token = localStorage.getItem('token')
    if (!token) throw new Error('No token found')

    const response = await authAPI.verifyToken()
    return response.data
  }
)

// 🟢 Auth Slice
const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout: (state) => {
      state.user = null
      state.token = null
      state.isAuthenticated = false
      localStorage.removeItem('token')
      localStorage.removeItem('user')
    },
    clearError: (state) => {
      state.error = null
    },
  },
  extraReducers: (builder) => {
    builder
      // Login Cases
      .addCase(login.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(login.fulfilled, (state, action) => {
        state.loading = false
        state.user = action.payload.user
        state.token = action.payload.token
        state.isAuthenticated = true
        localStorage.setItem('token', action.payload.token)
        localStorage.setItem('user', JSON.stringify(action.payload.user))
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false
        state.error = action.error.message || 'Login failed'
      })

      // Register Cases
      .addCase(register.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(register.fulfilled, (state, action) => {
        state.loading = false
        state.user = action.payload.user
        state.token = action.payload.token
        state.isAuthenticated = true
        localStorage.setItem('token', action.payload.token)
        localStorage.setItem('user', JSON.stringify(action.payload.user))
      })
      .addCase(register.rejected, (state, action) => {
        state.loading = false
        state.error = action.error.message || 'Registration failed'
      })

      // Check Auth Status Cases
      .addCase(checkAuthStatus.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(checkAuthStatus.fulfilled, (state, action) => {
        state.user = action.payload.user
        state.token = action.payload.token
        state.isAuthenticated = true
        state.loading = false
        state.initialized = true
        localStorage.setItem('token', action.payload.token)
        localStorage.setItem('user', JSON.stringify(action.payload.user))
      })
      .addCase(checkAuthStatus.rejected, (state) => {
        state.user = null
        state.token = null
        state.isAuthenticated = false
        state.loading = false
        state.initialized = true
        localStorage.removeItem('token')
        localStorage.removeItem('user')
      })
  },
})

export const { logout, clearError } = authSlice.actions
export default authSlice.reducer
