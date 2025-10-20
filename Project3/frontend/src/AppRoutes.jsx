import React from 'react'
import { BrowserRouter ,Routes ,Route} from "react-router-dom";

const AppRoutes = () => {
  return (
    <div>
        <BrowserRouter>
            <Routes>
              <Route path = '/' element = {<h1>Home</h1>}/>
              <Route path = '/register' element = {<h1>Register</h1>}/>
              <Route path = '/login' element = {<h1>Login</h1>}/>
            </Routes>
        </BrowserRouter>
    </div>
  )
}

export default AppRoutes