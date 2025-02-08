import { ReactNode } from 'react'
import { Navigate, useLocation } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'

interface ProtectedRouteProps {
  children: ReactNode
  allowedRoles?: string[] // Optional: Specify roles allowed for this route
}

export const ProtectedRoute = ({ children, allowedRoles }: ProtectedRouteProps) => {
  const { user, loading } = useAuth()
  const location = useLocation()

  // Show a loading spinner or placeholder while the auth state is being checked
  if (loading) {
    return <div>Loading...</div> // Replace this with a spinner or skeleton UI if desired
  }

  // If no user is logged in, redirect to the login page and save the intended route
  if (!user) {
    return <Navigate to="/auth" state={{ from: location }} replace />
  }

  // If allowedRoles are provided, check if the user has one of the roles
  if (allowedRoles && user.role && !allowedRoles.includes(user.role)) {
    return <Navigate to="/unauthorized" replace />
  }

  // If everything checks out, render the children (protected content)
  return <>{children}</>
}
