import { createContext, useContext, useState, useEffect, ReactNode } from 'react'
import { User } from '@supabase/supabase-js'
import { authService } from '../services/auth.service'
import { supabase } from '../lib/supabaseClient'

interface AuthContextType {
  user: User | null
  loading: boolean
  signInWithPassword: (email: string, password: string) => Promise<void>
  signInWithOtp: (email: string) => Promise<void>
  signOut: () => Promise<void>
}


const AuthContext = createContext<AuthContextType>({} as AuthContextType)

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Check active sessions
    authService.getCurrentSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null)
      setLoading(false)
    })

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null)
    })

    return () => subscription.unsubscribe()
  }, [])

  return (
    <AuthContext.Provider value={{
      user,
      loading,
      signInWithPassword: authService.signInWithPassword,
      signInWithOtp: authService.signInWithOtp,
      signOut: authService.signOut
    }}>
      {!loading && children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)