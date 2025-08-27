const userModel = require("../models/user.models");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

async function RegisterUser(req, res) {
  const {
    fullName: { firstName, lastName },
    email,
    password,
  } = req.body;

  const isUserExist = await userModel.findOne({
    email,
  });

  if (isUserExist) {
    res.status(400).json({
      message: "User already exists",
    });
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = userModel.create({
    fullName: { firstName, lastName },
    email: email,
    passowrd: hashedPassword,
  });

  const token = jwt.sign(
    {
      id: user._id,
      email: user.email,
      fullName: user.fullName,
      password:user.hashedPassword
    },
    process.env.JWT_token
  );

  res.cookie("token", token);

  res.status(201).json({
    message: "User created successfully",
    user:{
        id:user._id,
        email:user.email,
        fullName:user.fullName,
    }
  });
}

module.exports = { RegisterUser };
