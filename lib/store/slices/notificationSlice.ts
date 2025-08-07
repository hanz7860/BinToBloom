import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { notificationAPI } from '../../../lib/services/api'

interface Notification {
  id: number
  userId: number
  title: string
  message: string
  type: 'PICKUP_REQUEST' | 'PICKUP_ACCEPTED' | 'PICKUP_COMPLETED' | 'GENERAL'
  read: boolean
  createdAt: string
  pickupId?: number
}

interface NotificationState {
  notifications: Notification[]
  unreadCount: number
  loading: boolean
}

const initialState: NotificationState = {
  notifications: [],
  unreadCount: 0,
  loading: false,
}

export const fetchNotifications = createAsyncThunk(
  'notifications/fetch',
  async () => {
    const response = await notificationAPI.getNotifications()
    return response.data
  }
)

export const markAsRead = createAsyncThunk(
  'notifications/markAsRead',
  async (notificationId: number) => {
    await notificationAPI.markAsRead(notificationId)
    return notificationId
  }
)

const notificationSlice = createSlice({
  name: 'notifications',
  initialState,
  reducers: {
    addNotification: (state, action) => {
      state.notifications.unshift(action.payload)
      if (!action.payload.read) {
        state.unreadCount += 1
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchNotifications.fulfilled, (state, action) => {
        state.notifications = action.payload
        state.unreadCount = action.payload.filter(
          (n: Notification) => !n.read
        ).length
      })
      .addCase(markAsRead.fulfilled, (state, action) => {
        const notification = state.notifications.find(
          (n) => n.id === action.payload
        )
        if (notification && !notification.read) {
          notification.read = true
          state.unreadCount -= 1
        }
      })
  },
})

export const { addNotification } = notificationSlice.actions
export default notificationSlice.reducer
