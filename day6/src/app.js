const express = require('express')
const indexRoutes = require('./routes/index.routes')




const app = express();


app.use(express.json())

app.use((req,res,next)=>{
    console.log("this middleware is btw app and routes");
    next(); // request will not procide to routes if you not add next()
})

app.use('/',indexRoutes)

module.exports = app;