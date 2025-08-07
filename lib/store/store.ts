import { configureStore } from "@reduxjs/toolkit"
import authSlice from "./slices/authSlice"
import pickupSlice from "./slices/pickupSlice"
import notificationSlice from "./slices/notificationSlice"

export const store = configureStore({
  reducer: {
    auth: authSlice,
    pickup: pickupSlice,
    notifications: notificationSlice,
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
