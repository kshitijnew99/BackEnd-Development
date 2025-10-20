import React from 'react'
import { Link } from 'react-router-dom'

const Register = () => {
  return (
    <div className="container">
      <div className="card">
        <h1 className="heading">Create your account</h1>
        <form className="form" onSubmit={(e) => e.preventDefault()}>
          <div className="row">
            <div className="field">
              <label htmlFor="firstName">First name</label>
              <input className="input" id="firstName" name="firstName" type="text" placeholder="First name" autoComplete="given-name" />
            </div>
            <div className="field">
              <label htmlFor="lastName">Last name</label>
              <input className="input" id="lastName" name="lastName" type="text" placeholder="Last name" autoComplete="family-name" />
            </div>
          </div>

          <div className="field">
            <label htmlFor="email">Email</label>
            <input className="input" id="email" name="email" type="email" placeholder="you@example.com" autoComplete="email" />
          </div>

          <div className="field">
            <label htmlFor="password">Password</label>
            <input className="input" id="password" name="password" type="password" placeholder="Create a password" autoComplete="new-password" />
          </div>

          <button className="btn" type="submit">Create account</button>

          <div className="between subtle">
            <span>Already have an account?</span>
            <Link className="link" to="/login">Login</Link>
          </div>
        </form>
      </div>
    </div>
  )
}

export default Register
