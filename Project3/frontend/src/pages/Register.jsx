import React from 'react'
import { Link } from 'react-router-dom'

const Register = () => {
  return (
    <main style={{ padding: '2rem' }}>
      <h1>Register</h1>
      
      <form style={{ display: 'grid', gap: '0.75rem', maxWidth: 520 }}>

        <div style={{ display: 'flex', gap: '0.75rem' }}>
          <label style={{ flex: 1 }}>
            First name
            <input name="firstName" type="text" placeholder="First name" autoComplete="given-name" style={{ width: '100%' }} />
          </label>
          <label style={{ flex: 1 }}>
            Last name
            <input name="lastName" type="text" placeholder="Last name" autoComplete="family-name" style={{ width: '100%' }} />
          </label>
        </div>
        
        <label>
          Email
          <input name="email" type="email" placeholder="you@example.com" autoComplete="email" style={{ width: '100%' }} />
        </label>


        <label>
          Password
          <input name="password" type="password" placeholder="Create a password" autoComplete="new-password" style={{ width: '100%' }} />
        </label>


        <button type="button">Create account</button>


        <p style={{ margin: 0 }}>
          Already have an account? <Link to="/login">Login</Link>
        </p>
      </form>
    </main>
  )
}

export default Register
