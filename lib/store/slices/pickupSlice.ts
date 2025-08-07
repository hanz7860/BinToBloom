import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { pickupAPI } from '../../../lib/services/api'
import { LocationDto } from '@/types/auth'

interface Pickup {
  id: number
  donorId: number
  collectorId?: number
  wasteType: string
  quantity: number
  location: {
    latitude: number
    longitude: number
    address: string
  }
  scheduledTime: string
  status: 'PENDING' | 'ACCEPTED' | 'IN_PROGRESS' | 'COMPLETED' | 'CANCELLED'
  createdAt: string
  donor: {
    name: string
    email: string
  }
  collector?: {
    name: string
    email: string
  }
}

interface PickupState {
  pickups: Pickup[]
  availablePickups: Pickup[]
  loading: boolean
  error: string | null
}

const initialState: PickupState = {
  pickups: [],
  availablePickups: [],
  loading: false,
  error: null,
}

export const schedulePickup = createAsyncThunk(
  'pickup/schedule',
  async (pickupData: {
    wasteType: string
    quantity: number
    location: LocationDto
    scheduledTime: string
  }) => {
    const response = await pickupAPI.schedulePickup(pickupData)
    return response.data
  }
)

export const fetchUserPickups = createAsyncThunk(
  'pickup/fetchUserPickups',
  async () => {
    const response = await pickupAPI.getUserPickups()
    return response.data
  }
)

export const fetchAvailablePickups = createAsyncThunk(
  'pickup/fetchAvailable',
  async (location: { latitude: number; longitude: number }) => {
    const response = await pickupAPI.getAvailablePickups(location)
    return response.data
  }
)

export const acceptPickup = createAsyncThunk(
  'pickup/accept',
  async (pickupId: number) => {
    const response = await pickupAPI.acceptPickup(pickupId)
    return response.data
  }
)

export const updatePickupStatus = createAsyncThunk(
  'pickup/updateStatus',
  async ({ pickupId, status }: { pickupId: number; status: string }) => {
    const response = await pickupAPI.updatePickupStatus(pickupId, status)
    return response.data
  }
)

const pickupSlice = createSlice({
  name: 'pickup',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(schedulePickup.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(schedulePickup.fulfilled, (state, action) => {
        state.loading = false
        state.pickups.unshift(action.payload)
      })
      .addCase(schedulePickup.rejected, (state, action) => {
        state.loading = false
        state.error = action.error.message || 'Failed to schedule pickup'
      })
      .addCase(fetchUserPickups.fulfilled, (state, action) => {
        state.pickups = action.payload
      })
      .addCase(fetchAvailablePickups.fulfilled, (state, action) => {
        state.availablePickups = action.payload
      })
      .addCase(acceptPickup.fulfilled, (state, action) => {
        const index = state.availablePickups.findIndex(
          (p) => p.id === action.payload.id
        )
        if (index !== -1) {
          state.availablePickups.splice(index, 1)
        }
        state.pickups.unshift(action.payload)
      })
      .addCase(updatePickupStatus.fulfilled, (state, action) => {
        const index = state.pickups.findIndex((p) => p.id === action.payload.id)
        if (index !== -1) {
          state.pickups[index] = action.payload
        }
      })
  },
})

export const { clearError } = pickupSlice.actions
export default pickupSlice.reducer
