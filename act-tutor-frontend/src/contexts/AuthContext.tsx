import { createContext, useContext, useState, useEffect, ReactNode } from 'react'
import { apiService } from '../services/api.service'

interface User {
  id: string
  email: string
  // Add other user properties you need
}

interface AuthContextType {
  user: User | null
  loading: boolean
  error: string | null
  signInWithPassword: (email: string, password: string) => Promise<void>
  signUp: (email: string, password: string) => Promise<void>
  signOut: () => Promise<void>
}

const AuthContext = createContext<AuthContextType>({} as AuthContextType)

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    // Check if user is logged in on mount
    const checkAuth = async () => {
      try {
        const token = localStorage.getItem('token')
        if (token) {
          // Verify token with backend
          const response = await apiService.verifyToken()
          setUser(response.data.user)
        }
      } catch (err) {
        localStorage.removeItem('token')
      } finally {
        setLoading(false)
      }
    }
    
    checkAuth()
  }, [])

  const handleSignInWithPassword = async (email: string, password: string): Promise<void> => {
    try {
      const response = await apiService.login({ email, password })
      setUser(response.data.user)
      localStorage.setItem('token', response.data.token)
      setError(null)
    } catch (err: any) {
      setError(err.response?.data?.detail || 'Sign in failed')
      throw err
    }
  }

  const handleSignUp = async (email: string, password: string): Promise<void> => {
    try {
      const response = await apiService.signup({ email, password })
      setUser(response.data.user)
      localStorage.setItem('token', response.data.token)
      setError(null)
    } catch (err: any) {
      setError(err.response?.data?.detail || 'Sign up failed')
      throw err
    }
  }

  const handleSignOut = async (): Promise<void> => {
    try {
      await apiService.logout()
      setUser(null)
      localStorage.removeItem('token')
      setError(null)
    } catch (err: any) {
      setError(err.response?.data?.detail || 'Sign out failed')
      throw err
    }
  }

  return (
    <AuthContext.Provider value={{
      user,
      loading,
      error,
      signInWithPassword: handleSignInWithPassword,
      signUp: handleSignUp,
      signOut: handleSignOut
    }}>
      {!loading && children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)