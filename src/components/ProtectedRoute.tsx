import type React from "react"
import { Navigate } from "react-router-dom"
import { useAppSelector } from "../store/hooks"

interface ProtectedRouteProps {
  children: React.ReactNode
  requiredRole?: "DONOR" | "COLLECTOR"
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children, requiredRole }) => {
  const { isAuthenticated, user } = useAppSelector((state) => state.auth)

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />
  }

  if (requiredRole && user?.role !== requiredRole) {
    return <Navigate to="/dashboard" replace />
  }

  return <>{children}</>
}

export default ProtectedRoute
