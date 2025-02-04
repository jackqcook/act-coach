import { createContext, useContext, useState, useEffect, ReactNode } from 'react'
import { User } from '@supabase/supabase-js'
import { authService } from '../services/auth.service'
import { supabase } from '../lib/supabaseClient'

interface AuthContextType {
  user: User | null
  loading: boolean
  error: string | null
  signInWithPassword: (email: string, password: string) => Promise<void>
  signInWithOtp: (email: string) => Promise<void>
  signOut: () => Promise<void>
}


const AuthContext = createContext<AuthContextType>({} as AuthContextType)

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    // Check active sessions
    authService.getCurrentSession()
      .then(({ data: { session } }) => {
        setUser(session?.user ?? null)
        setLoading(false)
      })
      .catch((err) => {
        setError(err.message || 'Error fetching session')
        setLoading(false)
      })

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null)
    })

    return () => subscription.unsubscribe()
  }, [])

  // Create wrappers for the auth methods to handle errors explicitly.
  const handleSignInWithPassword = async (email: string, password: string): Promise<void> => {
    try {
      await authService.signInWithPassword(email, password)
      setError(null)
    } catch (err: any) {
      setError(err.message || 'Sign in failed')
      throw err
    }
  }

  const handleSignInWithOtp = async (email: string): Promise<void> => {
    try {
      await authService.signInWithOtp(email)
      setError(null)
    } catch (err: any) {
      setError(err.message || 'Sign in with OTP failed')
      throw err
    }
  }

  const handleSignOut = async (): Promise<void> => {
    try {
      await authService.signOut()
      setError(null)
    } catch (err: any) {
      setError(err.message || 'Sign out failed')
      throw err
    }
  }

  return (
    <AuthContext.Provider value={{
      user,
      loading,
      error,
      signInWithPassword: handleSignInWithPassword,
      signInWithOtp: handleSignInWithOtp,
      signOut: handleSignOut
    }}>
      {!loading && children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)