import { supabase } from '../lib/supabaseClient'

export const authService = {
  // Password auth
  signInWithPassword: async (email: string, password: string): Promise<void> => {
    const { error } = await supabase.auth.signInWithPassword({ email, password })
    if (error) throw error
  },

  // Magic link auth
  signInWithOtp: async (email: string): Promise<void> => {
    const { error } = await supabase.auth.signInWithOtp({ email })
    if (error) throw error
  },

  signOut: async (): Promise<void> => {
    const { error } = await supabase.auth.signOut()
    if (error) throw error
  },

  getCurrentSession: async () => {
    return await supabase.auth.getSession()
  }
} 