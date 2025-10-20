import React from 'react'
import { BrowserRouter ,Routes ,Route, Link } from "react-router-dom";
import Home from './pages/Home.jsx'
import Login from './pages/Login.jsx'
import Register from './pages/Register.jsx'

const AppRoutes = () => {
  return (
    <div>
        <BrowserRouter>
            <nav style={{ display: 'flex', gap: '1rem', padding: '1rem' }}>
              <Link to='/'>Home</Link>
              <Link to='/login'>Login</Link>
              <Link to='/register'>Register</Link>
            </nav>
            <Routes>
              <Route path='/' element={<Home />} />
              <Route path='/register' element={<Register />} />
              <Route path='/login' element={<Login />} />
            </Routes>
        </BrowserRouter>
    </div>
  )
}

export default AppRoutes