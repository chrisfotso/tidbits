const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");

const User = require("../models/User");
const { JWT_SECRET } = require("../../config");

const { usernameExistsInDatabase } = require("./functions/userFunctions");

router.post("/register", async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res
      .status(400)
      .send({ err: "Please enter a username and password." });
  }

  if (username.replace(/\s/, "") !== username) {
    return res.status(400).send({ err: "Username cannot contain whitespace." });
  }

  if (await usernameExistsInDatabase(username)) {
    return res.status(422).send({
      err: "Username already registered, please choose a different one."
    });
  }

  try {
    const hashedPassword = await User.hashPassword(password);
    const savedUser = await User.create({ username, password: hashedPassword });

    return res.status(201).send(savedUser);
  } catch (error) {
    return res.status(500).send({ msg: "Unknown error occured", error });
  }
});

router.post("/login", async (req, res) => {
  const { username: bodyUsername, password } = req.body;

  if (!bodyUsername || !password) {
    return res
      .status(400)
      .send({ err: "Please enter a username and password." });
  }

  if (!(await usernameExistsInDatabase(bodyUsername))) {
    return res.status(404).send({ err: "Username is not registered." });
  }

  try {
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
  } catch (error) {
    return res.status(500).send({ error });
  }
});

module.exports = router;
