'use client'

import type React from 'react'
import { useAppSelector } from '@/lib/store/hooks'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'

interface ProtectedRouteProps {
  children: React.ReactNode
  requiredRole?: 'DONOR' | 'COLLECTOR'
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
  children,
  requiredRole,
}) => {
  const router = useRouter()
  const { isAuthenticated, user } = useAppSelector((state) => state.auth)
  const [isAllowed, setIsAllowed] = useState(false)
  const [checked, setChecked] = useState(false)

  useEffect(() => {
    if (!isAuthenticated) {
      router.replace('/login')
    } else if (requiredRole && user?.role !== requiredRole) {
      router.replace('/dashboard')
    } else {
      setIsAllowed(true)
    }
    setChecked(true)
  }, [isAuthenticated, user, requiredRole, router])

  if (!checked) {
    // Optional: return loader here
    return null
  }

  return isAllowed ? <>{children}</> : null
}

export default ProtectedRoute
