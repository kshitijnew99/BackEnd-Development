const jwt = require('jsonwebtoken')
const userModel = require('../model/user.model')


async function authmiddleware (req,res,next){
    const token = req.cookies.token
    if(!token){
        return res.status(401).json({message:'Unauthorized access, please login first'})
    }
    try {
        const decode = jwt.verify(token,process.env.SECRET_KEY)

        const user = await userModel.findOne({
            _id:decode.id
        })

        req.user = user  
        next()
    } 
    catch (error) {
        return res.status(401).json({
            message: "Invalid token",
        })
    }

}

module.exports = authmiddleware