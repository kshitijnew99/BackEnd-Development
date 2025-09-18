const userModel = require("../models/user.models");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

async function RegisterUser(req, res) {
  try {
    const {
      fullName: { firstName, lastName },
      email,
      password,
    } = req.body;

    // Check if user exists
    const isUserExist = await userModel.findOne({ email });

    
    if (isUserExist) {
      return res.status(400).json({ message: "User already exists" });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create user
    const user = await userModel.create({
      fullName: { firstName, lastName },
      email,
      password: hashedPassword,
    });

    // Create JWT
    const token = jwt.sign(
      { id: user._id, email: user.email, fullName: user.fullName },
      process.env.JWT_TOKEN
    );

    // Set cookie
    res.cookie("token", token, { httpOnly: true });

    // Success response
    res.status(201).json({
      message: "User created successfully",
      user: {
        id: user._id,
        email: user.email,
        fullName: user.fullName,
      },
    });
  } catch (error) {
    res.status(500).json({
      message: "Server error",
      error: error.message, // 👈 this shows the actual error
    });
  }
}

async function LoginUser(req,res) {
  const { email , password  } = req.body;

  const user = await userModel.findOne({email})

  if(!user){
    return res.status(400).json({
      message : 'Invalid email or password'
    })
  }

  const isPasswordValid = await bcrypt.compare(password , user.password);

  if(!isPasswordValid){
    return res.status(400).json({
      message : 'Invalid email or password'
    })
  }

  const token = jwt.sign(
    { id: user._id, email: user.email },
    process.env.JWT_TOKEN
  );

  res.cookie("token", token);

  res.status(201).json({
      message: "User Login successfully",
      user: {
        id: user._id,
        email: user.email,
        fullName: user.fullName,
      },
  });

}

module.exports = { RegisterUser  , LoginUser};
