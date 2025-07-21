const express = require('express')
const songRoutes = require('./routes/song.routes')


const app = express();


app.use(express.json()); // works only when data is sends in raw format

/*
we have to send 
*/


app.use('/song', songRoutes)

module.exports = app


