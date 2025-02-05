import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { supabase } from '../lib/supabaseClient'
import './AuthPage.scss'

export default function Auth() {
  const [loading, setLoading] = useState(false)
  const [isSignUp, setIsSignUp] = useState(false)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState<any>(null)

  const navigate = useNavigate()

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null)
    })
  }, [])

  const handleLogin = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setLoading(true)

    // Attempt to log in with email & password
    const { error, data: sessionData } = await supabase.auth.signInWithPassword({ email, password })
    if (error) {
      alert(error.message)
      setLoading(false)
      return
    } else {
      alert('Login successful!')
      // Extract the logged in user
      const loggedInUser = sessionData.session?.user
      if (loggedInUser) {
        // Query the "profile" table to see if a record exists for the user
        const { data, error: profileError } = await supabase
          .from('profile')
          .select('*')
          .eq('id', loggedInUser.id)
          .single()

        // If there's an error or no profile data, direct them to complete their profile
        if (profileError || !data) {
          navigate('/complete-profile')
        } else {
          // Otherwise, go to the home page
          navigate('/')
        }
      } else {
        alert('No user found in session.')
      }
    }
    setLoading(false)
  }

  const handleSignUp = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setLoading(true)
    const { error, data } = await supabase.auth.signUp({ email, password })
    console.log('Sign up response:', { error, data })
    if (error) {
      alert(error.message)
    } else {
      alert('Sign up successful. Check your email for the confirmation link!')
    }
    setLoading(false)
  }

  const handleSignOut = async () => {
    setLoading(true)
    const { error } = await supabase.auth.signOut()
    if (error) {
      alert(error.message)
    } else {
      setUser(null)
      alert('Sign out successful!')
    }
    setLoading(false)
  }

  if (user) {
    return (
      <div className="auth-page">
        <div className="auth-container">
          <h2>You are logged in as {user.email}</h2>
          <button onClick={handleSignOut} disabled={loading}>
            {loading ? 'Signing out...' : 'Sign Out'}
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="auth-page">
      <div className="auth-container">
        {isSignUp ? <h2>Sign Up</h2> : <h2>Sign In</h2>}
        {isSignUp ? (
          <form className="auth-form" onSubmit={handleSignUp}>
            <div>
              <input
                type="email"
                placeholder="Your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div>
              <input
                type="password"
                placeholder="Your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <button type="submit" disabled={loading}>
              {loading ? 'Loading...' : 'Sign Up'}
            </button>
          </form>
        ) : (
          <form className="auth-form" onSubmit={handleLogin}>
            <div>
              <input
                type="email"
                placeholder="Your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div>
              <input
                type="password"
                placeholder="Your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <button type="submit" disabled={loading}>
              {loading ? 'Loading...' : 'Sign In'}
            </button>
          </form>
        )}
        <button
          type="button"
          className="switch-auth"
          onClick={() => setIsSignUp(!isSignUp)}
        >
          {isSignUp ? 'Already have an account? Sign In' : "Don't have an account? Sign Up"}
        </button>
      </div>
    </div>
  )
}