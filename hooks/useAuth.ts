'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { authService, type User } from '@/lib/auth'

export function useAuth() {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const router = useRouter()

  useEffect(() => {
    const checkAuth = async () => {
      try {
        setLoading(true)
        setError(null)
        console.log('useAuth: checkAuth initiated.')

        if (authService.isAuthenticated()) {
          console.log(
            'useAuth: AuthService reports authenticated. Validating token...'
          )
          const isValid = await authService.validateToken()
          if (isValid) {
            const currentUser = authService.getUser()
            setUser(currentUser)
            console.log(
              'useAuth: Token valid. User set:',
              currentUser?.username,
              'Type:',
              currentUser?.type
            )
          } else {
            console.log(
              'useAuth: Token invalid after validation. Redirecting to login.'
            )
            router.push('/login')
          }
        } else {
          console.log(
            'useAuth: AuthService reports not authenticated. Redirecting to login.'
          )
          router.push('/login')
        }
      } catch (err) {
        console.error('useAuth: Authentication check failed:', err)
        setError('Authentication failed')
        router.push('/login')
      } finally {
        setLoading(false)
        console.log('useAuth: checkAuth finished. Loading:', false)
      }
    }

    checkAuth()
  }, [router])

  const login = async (username: string, password: string) => {
    try {
      setLoading(true)
      setError(null)
      console.log('useAuth: Attempting login for user:', username)

      const response = await authService.login(username, password)

      if (response.success) {
        const currentUser = authService.getUser()
        setUser(currentUser)
        console.log(
          'useAuth: Login successful. User set:',
          currentUser?.username,
          'Type:',
          currentUser?.type
        )
        return response
      } else {
        setError(response.message)
        console.error('useAuth: Login failed:', response.message)
        return response
      }
    } catch (err) {
      const errorMessage = 'Login failed. Please try again.'
      setError(errorMessage)
      console.error('useAuth: Login error caught:', err)
      return { success: false, message: errorMessage }
    } finally {
      setLoading(false)
      console.log('useAuth: Login attempt finished. Loading:', false)
    }
  }

  const logout = () => {
    console.log('useAuth: Logging out.')
    authService.logout()
    setUser(null)
    router.push('/login')
  }

  return {
    user,
    loading,
    error,
    login,
    logout,
    isAuthenticated: !!user,
  }
}
