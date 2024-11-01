const User = require("../models/user.model");
const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");

exports.signup = async (req, res) => {
  const { username, email, password } = req.body;

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res
        .status(400)
        .json({ error: true, message: "Email already exists" });
    }

    const hashedPassword = bcryptjs.hashSync(password, 10);
    const newUser = new User({ username, email, password: hashedPassword });

    await newUser.save();
    res
      .status(201)
      .json({ error: false, message: "User created successfully" });
  } catch (err) {
    console.error("Signup Error:", err);
    res
      .status(500)
      .json({ error: true, message: "Internal server error during signup" });
  }
};

exports.signin = async (req, res) => {
  const { email, password } = req.body;

  try {
    const validUser = await User.findOne({ email });
    if (!validUser) {
      return res.status(404).json({ error: true, message: "User not found" });
    }

    const isValidPassword = bcryptjs.compareSync(password, validUser.password);
    if (!isValidPassword) {
      return res.status(400).json({ error: true, message: "Invalid password" });
    }

    const token = jwt.sign({ id: validUser._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });
    const { password: pass, ...rest } = validUser._doc;

    res
      .cookie("access_token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
      })
      .status(200)
      .json({ error: false, message: "Signin successful", user: rest });
  } catch (err) {
    console.error("Signin Error:", err);
    res
      .status(500)
      .json({ error: true, message: "Internal server error during signin" });
  }
};

exports.signout = async (req, res) => {
  try {
    res.clearCookie("access_token");
    res.status(200).json({ error: false, message: "Logged out successfully" });
  } catch (err) {
    console.error("Signout Error:", err);
    res
      .status(500)
      .json({ error: true, message: "Internal server error during signout" });
  }
};
