const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { ObjectId } = require("mongodb");
const User = require("../models/userModel");

// User Registration
exports.registerUser = async (req, res) => {
  const { name, email, password } = req.body;

  // Check if email exists
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    return res
      .status(400)
      .json({ success: false, message: "User already exists" });
  }

  // Hash password and store user
  const hashedPassword = await bcrypt.hash(password, 10);
  const newUser = await User.insertOne({
    name,
    email,
    password: hashedPassword,
  });

  const token = jwt.sign(
    { id: newUser.insertedId, name, email },
    process.env.JWT_SECRET,
    { expiresIn: process.env.EXPIRES_IN || "365d" }
  );

  res
    .status(201)
    .json({
      success: true,
      token,
      userData: { id: newUser.insertedId, name, email },
    });
};

// User Login
exports.loginUser = async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });
  if (!user)
    return res.status(401).json({ message: "Invalid email or password" });

  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid)
    return res.status(401).json({ message: "Invalid email or password" });

  const token = jwt.sign(
    { id: user._id, name: user.name, email: user.email },
    process.env.JWT_SECRET,
    { expiresIn: process.env.EXPIRES_IN }
  );

  res.json({
    success: true,
    token,
    userData: { id: user._id, name: user.name, email: user.email },
  });
};
