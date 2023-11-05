const User = require("../../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();

exports.hashedPassword = async (password) => {
  return await bcrypt.hash(password, 10);
};

const generateToken = (user) => {
  const payload = {
    _id: user.id,
    username: user.username,
  };
  const token = jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn: "2d",
  });
  return token;
};

exports.signup = async (req, res, next) => {
  try {
    req.body.password = await this.hashedPassword(req.body.password);
    const newUser = await User.create(req.body);
    const token = generateToken(newUser);
    res.status(201).json({ token });
  } catch (err) {
    next(err);
  }
};

exports.signin = async (req, res, next) => {
  try {
    const token = generateToken(req.user);
    res.json({ token });
    // {token: token}
  } catch (err) {
    // res.status(500).json("Server Error");
    next(err);
  }
};

exports.getUsers = async (req, res) => {
  try {
    const users = await User.find().populate("urls");
    res.status(201).json(users);
  } catch (err) {
    next(err);
  }
};
