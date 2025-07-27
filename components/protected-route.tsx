'use client'

import type React from 'react'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { Loader2 } from 'lucide-react'
import { authService } from '@/lib/auth' // Import authService directly

interface ProtectedRouteProps {
  children: React.ReactNode
  allowedUserTypes?: string[]
  redirectTo?: string
}

export function ProtectedRoute({
  children,
  allowedUserTypes = [],
  redirectTo = '/login',
}: ProtectedRouteProps) {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(true)
  const [isAuthorized, setIsAuthorized] = useState(false)

  useEffect(() => {
    const checkAuth = async () => {
      try {
        setIsLoading(true)
        console.log('ProtectedRoute: checkAuth initiated.')

        const isAuthenticated = authService.isAuthenticated()
        const user = authService.getUser()

        if (!isAuthenticated || !user) {
          console.log(
            'ProtectedRoute: Not authenticated or user data missing. Redirecting to login.'
          )
          router.push(redirectTo)
          return
        }

        console.log(
          'ProtectedRoute: User found in AuthService:',
          user.username,
          'Type:',
          user.type
        )

        // Validate user with backend (this also refreshes user data if needed)
        const isValid = await authService.validateToken()

        if (!isValid) {
          console.log(
            'ProtectedRoute: Token validation failed. Redirecting to login.'
          )
          authService.logout() // Ensure logout if validation fails
          router.push(redirectTo)
          return
        }

        // Re-fetch user after validation in case it was updated
        const validatedUser = authService.getUser()
        if (!validatedUser) {
          console.log(
            'ProtectedRoute: Validated token but user data is null. Redirecting to login.'
          )
          authService.logout()
          router.push(redirectTo)
          return
        }

        console.log(
          'ProtectedRoute: Token valid. Checking user type authorization for user:',
          validatedUser.username,
          'Type:',
          validatedUser.type,
          'Allowed types:',
          allowedUserTypes
        )

        // Check user type authorization
        if (
          allowedUserTypes.length > 0 &&
          !allowedUserTypes.includes(validatedUser.type)
        ) {
          console.log(
            'ProtectedRoute: User type not allowed. Redirecting to unauthorized page.'
          )
          router.push('/unauthorized')
          return
        }

        setIsAuthorized(true)
        console.log('ProtectedRoute: User is authorized.')
      } catch (error) {
        console.error('ProtectedRoute: Auth check failed:', error)
        authService.logout()
        router.push(redirectTo)
      } finally {
        setIsLoading(false)
        console.log('ProtectedRoute: checkAuth finished. Loading:', false)
      }
    }

    checkAuth()
  }, [router, allowedUserTypes, redirectTo])

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="h-8 w-8 animate-spin mx-auto mb-4" />
          <p>Verifying authentication...</p>
        </div>
      </div>
    )
  }

  if (!isAuthorized) {
    return null // Render nothing if not authorized and not loading (will be redirected)
  }

  return <>{children}</>
}
