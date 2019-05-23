const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");

const User = require("../models/User");
const {
  verifyRegisterInput,
  verifyLoginInput
} = require("../middlewares/userMiddleware");

const { JWT_SECRET } = require("../../config");

//Endpoint for registering a new user
router.post("/register", verifyRegisterInput, async (req, res) => {
  const { username, password } = req.body;

  const hashedPassword = await User.hashPassword(password);
  const savedUser = await User.create({ username, password: hashedPassword });

  return res.status(201).send(savedUser);
});

//Endpoint for logging in an already registered user
router.post("/login", verifyLoginInput, async (req, res) => {
  const { username: bodyUsername, password } = req.body;

  const foundUser = await User.findOne({
    username: { $regex: new RegExp(bodyUsername, "i") }
  }).exec();

  const passwordsMatch = await foundUser.validatePassword(password);

  if (!passwordsMatch) {
    return res.status(400).send({ err: "Password is incorrect" });
  }

  const { username: databaseUsername } = foundUser;
  const token = jwt.sign(databaseUsername, JWT_SECRET);

  return res.status(200).send({ token });
});

module.exports = router;
