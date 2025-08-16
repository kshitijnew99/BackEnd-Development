const express = require('express')
const authRoutes = require('./routes/auth.routes')
const postRoutes = require('./routes/post.routes')
const cookieParser = require('cookie-parser')


const app = express()
app.use(express.json())
app.use(cookieParser())

console.log("Registering /auth routes...");
app.use('/auth', authRoutes);

console.log("Registering /post routes...");
app.use('/post', postRoutes);


module.exports = app;