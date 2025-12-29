const express = require('express');
const rateLimit = require('express-rate-limit');


const app = express();
app.use(express.json());

const limiter = rateLimit({
  windowMs: 1 * 60 * 1000, // 15 minutes
  max: 10, // limit each IP to 100 requests per windowMs
  message : 'Too many requests from this IP, please try again after a minute'
});


app.post('/api/auth/register',limiter, (req,res)=>{
    res.status(201).json({message: "User registered successfully"});
})



app.listen(3000, () => {
  console.log('Server is running on port 3000');
});