const express = require('express')
const authRoutes = require('./routes/auth.routes')
const cookieParser = require('cookie-parser')

const app = express();
app.use(express.json())

app.use(cookieParser())

app.use((req,res,next)=>{
    // console.log("this middleware is btw app and routes");
    next(); // request will not procide to routes if you not add next()
})

app.use('/auth',authRoutes)

module.exports = app;