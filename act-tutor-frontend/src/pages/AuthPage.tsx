import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { apiService } from '../services/api.service'
import { useAuth } from '../contexts/AuthContext'
import './AuthPage.scss'

export default function Auth() {
  const [loading, setLoading] = useState(false)
  const [isSignUp, setIsSignUp] = useState(false)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const { user, signInWithPassword, signUp, signOut } = useAuth()
  const navigate = useNavigate()

  useEffect(() => {
    if (user) {
      navigate('/')
    }
  }, [user, navigate])

  const handleLogin = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setLoading(true)
    try {
      await signInWithPassword(email, password)
      navigate('/')
    } catch (error: any) {
      alert(error.message)
    } finally {
      setLoading(false)
    }
  }

  const handleSignUp = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setLoading(true)
    try {
      await signUp(email, password)
      alert('Sign up successful. Check your email for confirmation!')
    } catch (error: any) {
      alert(error.message)
    } finally {
      setLoading(false)
    }
  }

  const handleSignOut = async () => {
    setLoading(true)
    try {
      await signOut()
      navigate('/auth')
    } catch (error: any) {
      alert(error.message)
    } finally {
      setLoading(false)
    }
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