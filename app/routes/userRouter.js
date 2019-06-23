const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");

const User = require("../models/User");
const {
  verifyRegisterInput,
  verifyLoginInput
} = require("../middlewares/userMiddleware");

const { JWT_SECRET } = require("../../config");

//POST endpoint for creating a new user
router.post("/register", verifyRegisterInput, async (req, res) => {
  const { username, password } = req.body;

  const hashedPassword = await User.hashPassword(password);
  const savedUser = await User.create({ username, password: hashedPassword });

  return res.status(201).send(savedUser);
});

//POST endpoint for logging in already registered user
router.post("/login", verifyLoginInput, async (req, res) => {
  const { username: bodyUsername, password } = req.body;

  //Finding user with username from body (case-insensitive regex)
  const retrievedUser = await User.findOne({
    username: { $regex: new RegExp(bodyUsername, "i") }
  }).exec();

  const passwordsMatch = await retrievedUser.validatePassword(password);

  if (!passwordsMatch) {
    return res.status(400).send({ err: "Password is incorrect" });
  }

  const { username: databaseUsername } = retrievedUser;
  const token = jwt.sign(databaseUsername, JWT_SECRET);

  return res.status(200).send({ token });
});

router.get("/:username", async (req, res) => {
  const { username: paramUsername } = req.params;

  const retrievedUser = await User.findOne({
    username: { $regex: new RegExp(paramUsername, "i") }
  })
    .populate("tweets")
    .populate("likes")
    .populate("following")
    .populate("followers")
    .exec();

  res.status(200).send(retrievedUser);
});

module.exports = router;
