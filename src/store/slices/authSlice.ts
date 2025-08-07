import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import { authAPI } from "../../services/api"

interface User {
  id: number
  email: string
  name: string
  role: "DONOR" | "COLLECTOR"
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
}

const initialState: AuthState = {
  user: null,
  token: null,
  isAuthenticated: false,
  loading: false,
  error: null,
}

export const login = createAsyncThunk(
  "auth/login",
  async ({ email, password }: { email: string; password: string }) => {
    const response = await authAPI.login(email, password)
    return response.data
  },
)

export const register = createAsyncThunk(
  "auth/register",
  async (userData: { name: string; email: string; password: string; role: string; location?: any }) => {
    const response = await authAPI.register(userData)
    return response.data
  },
)

export const checkAuthStatus = createAsyncThunk("auth/checkStatus", async () => {
  const token = localStorage.getItem("token")
  if (!token) throw new Error("No token found")

  const response = await authAPI.verifyToken()
  return response.data
})

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      state.user = null
      state.token = null
      state.isAuthenticated = false
      localStorage.removeItem("token")
    },
    clearError: (state) => {
      state.error = null
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(login.fulfilled, (state, action) => {
        state.loading = false
        state.user = action.payload.user
        state.token = action.payload.token
        state.isAuthenticated = true
        localStorage.setItem("token", action.payload.token)
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false
        state.error = action.error.message || "Login failed"
      })
      .addCase(register.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(register.fulfilled, (state, action) => {
        state.loading = false
        state.user = action.payload.user
        state.token = action.payload.token
        state.isAuthenticated = true
        localStorage.setItem("token", action.payload.token)
      })
      .addCase(register.rejected, (state, action) => {
        state.loading = false
        state.error = action.error.message || "Registration failed"
      })
      .addCase(checkAuthStatus.fulfilled, (state, action) => {
        state.user = action.payload.user
        state.token = action.payload.token
        state.isAuthenticated = true
        state.loading = false
      })
      .addCase(checkAuthStatus.rejected, (state) => {
        state.user = null
        state.token = null
        state.isAuthenticated = false
        state.loading = false
        localStorage.removeItem("token")
      })
  },
})

export const { logout, clearError } = authSlice.actions
export default authSlice.reducer
