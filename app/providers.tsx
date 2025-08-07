'use client'
import React, { useEffect } from 'react'
import { Provider } from 'react-redux'
import { store } from '@/lib/store/store'
import { checkAuthStatus } from '@/lib/store/slices/authSlice'

export function Providers({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    store.dispatch(checkAuthStatus())
  }, [])
  return <Provider store={store}>{children}</Provider>
}
