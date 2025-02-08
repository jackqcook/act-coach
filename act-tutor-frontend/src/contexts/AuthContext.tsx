import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react'
import { supabase } from '../supabaseClient'

interface User {
  id: string
  email: string | undefined
  role?: string
}

interface AuthContextType {
  user: User | null
  loading: boolean
  error: string | null
  signInWithPassword: (email: string, password: string) => Promise<void>
  signUp: (email: string, password: string) => Promise<void>
  signOut: () => Promise<void>
}

export const AuthContext = createContext<AuthContextType>({} as AuthContextType)

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const initializeAuth = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      console.log('Session:', session); // Debug log
      if (session?.user) {
        setUser({
          id: session.user.id,
          email: session.user.email,
          role: session.user.role
        });
        console.log('User set:', session.user); // Debug log
      } else {
        setUser(null);
        console.log('No session found'); // Debug log
      }
      setLoading(false);
    };

    initializeAuth();

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      if (session?.user) {
        setUser({
          id: session.user.id,
          email: session.user.email,
          role: session.user.role
        });
      } else {
        setUser(null);
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const signInWithPassword = async (email: string, password: string) => {
    try {
      setLoading(true)
      setError(null)
      const { data, error: signInError } = await supabase.auth.signInWithPassword({ email, password })
      if (signInError) throw signInError
      if (data.user && data.session) {
        setUser({ id: data.user.id, email: data.user.email ?? '' })
        // Save the access token to localStorage for backend API calls
        localStorage.setItem('token', data.session.access_token)
      }
    } catch (err: any) {
      setError(err.message || 'Sign in failed')
      throw err
    } finally {
      setLoading(false)
    }
  }

  const signUp = async (email: string, password: string) => {
    try {
      setLoading(true)
      setError(null)
      const { data, error: signUpError } = await supabase.auth.signUp({ email, password })
      if (signUpError) throw signUpError
      if (data.user && data.session) {
        setUser({ id: data.user.id, email: data.user.email ?? '' })
        localStorage.setItem('token', data.session.access_token)
      }
    } catch (err: any) {
      setError(err.message || 'Sign up failed')
      throw err
    } finally {
      setLoading(false)
    }
  }

  const signOut = async () => {
    try {
      setLoading(true)
      setError(null)
      const { error: signOutError } = await supabase.auth.signOut()
      if (signOutError) throw signOutError
      setUser(null)
      localStorage.removeItem('token')
    } catch (err: any) {
      setError(err.message || 'Sign out failed')
      throw err
    } finally {
      setLoading(false)
    }
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        error,
        signInWithPassword,
        signUp,
        signOut
      }}
    >
      {!loading && children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)
