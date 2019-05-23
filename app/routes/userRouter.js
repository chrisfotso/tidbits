const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");

const User = require("../models/User");
const {
  verifyRegisterInput,
  verifyLoginInput
} = require("../middlewares/userMiddleware");

const { JWT_SECRET } = require("../../config");

const { usernameExistsInDatabase } = require("../helpers/userFunctions");

//Endpoint for registering a new user
router.post("/register", verifyRegisterInput, async (req, res) => {
  const { username, password } = req.body;
  // try {
  const hashedPassword = await User.hashPassword(password);
  const savedUser = await User.create({ username, password: hashedPassword });

  return res.status(201).send(savedUser);
  // } catch (error) {
  return res.status(500).send({ msg: "Unknown error occured", error });
  // }
});

//Endpoint for logging in an already registered user
router.post("/login", verifyLoginInput, async (req, res) => {
  const { username: bodyUsername, password } = req.body;

  try {
    //Finding user with username from body (case-insensitive)
    const foundUser = await User.findOne({
      username: { $regex: new RegExp(bodyUsername, "i") }
    }).exec();

    //Validate password method is defined in User model file
    const passwordsMatch = await foundUser.validatePassword(password);

    if (!passwordsMatch) {
      return res.status(400).send({ err: "Password is incorrect" });
    }

    //Destructuring foundUser, renaming username as databaseUsername for clarity
    const { username: databaseUsername } = foundUser;
    const token = jwt.sign(databaseUsername, JWT_SECRET);

    return res.status(200).send({ token });
  } catch (error) {
    return res.status(500).send({ error });
  }
});

module.exports = router;
