import React from 'react'

const Login = () => {
  return (
    <main style={{ padding: '2rem' }}>
      <h1>Login</h1>
      <form style={{ display: 'grid', gap: '0.75rem', maxWidth: 360 }}>
        <label>
          Email
          <input type="email" placeholder="you@example.com" style={{ width: '100%' }} />
        </label>
        <label>
          Password
          <input type="password" placeholder="••••••••" style={{ width: '100%' }} />
        </label>
        <button type="button">Sign in</button>
      </form>
    </main>
  )
}

export default Login
