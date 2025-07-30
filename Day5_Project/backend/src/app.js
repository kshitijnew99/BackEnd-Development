const express = require('express')
const songRoutes = require('./routes/song.routes')
const cors = require('cors')


const app = express();

app.use(cors())
app.use(express.json()); // works only when data is sends in raw format

/*
when we send data in form-data , then we have to use multer
*/


app.use('/', songRoutes)

module.exports = app


 