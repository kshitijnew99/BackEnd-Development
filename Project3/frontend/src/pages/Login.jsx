import React from 'react'
import { Link } from 'react-router-dom'

const Login = () => {
    

    return (
        <div className="container">
        <div className="card">
            <h1 className="heading">Welcome back</h1>
            <form className="form" onSubmit={(e) => e.preventDefault()}>
            <div className="field">
                <label htmlFor="email">Email</label>
                <input className="input" id="email" name="email" type="email" placeholder="you@example.com" autoComplete="email" />
            </div>
            <div className="field">
                <label htmlFor="password">Password</label>
                <input className="input" id="password" name="password" type="password" placeholder="••••••••" autoComplete="current-password" />
            </div>
            <button className="btn" type="submit">Sign in</button>
            <div className="subtle">
                <span>New here?</span>
                <Link className="link" to="/register">Create an account</Link>
            </div>
            </form>
        </div>
        </div>
    )
}

export default Login
