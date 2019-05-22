const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");

const User = require("../models/User");
const { JWT_SECRET } = require("../../config");

const { usernameExistsInDatabase } = require("./functions/userFunctions");

router.post("/register", async (req, res) => {
  //Get username and password from request
  //Make sure both username and password are filled in, if not throw error
  //Check if username (case-insensitive) already exists in database
  //If username exists:
  //  Redirect to register screen with error
  //  Ask if they already have an account made, link to login screen
  //Else if username doesn't exist:
  //Hash password using bcrypt
  //Add new user to database
  //Redirect to screen where they can choose display name and prompt them to make first tweet
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
    const { id } = savedUser;

    const token = jwt.sign(id, JWT_SECRET, { expiresIn: "24h" });

    res.status(201).send(token);
  } catch (error) {
    return res.status(500).send({ msg: "Unknown error occured", error });
  }
});

router.post("/login", async (req, res) => {
  //Get username and password from request
  //Make sure both username and password are filled in, if not throw error
  //Check if username (case-insensitive) already exists in database
  //If username does not exist:
  //  Redirect to login screen with error
  //  Ask if they would like to make an account, link to register screen
  //Else if username does exist:
  //Compare password from request to password in database using bcrypt
  //If passwords don't match:
  //  Redirect to login screen with error saying passwords don't match
  //Else if passwords do match:
  //Figure out how to do authentication - Passport or JWT or cookies? All three?
  //Success, redirect to home screen and display tweets
  const { username, password } = req.body;

  if (!username || !password) {
    return res
      .status(400)
      .send({ err: "Please enter a username and password." });
  }

  if (!(await usernameExistsInDatabase(username))) {
    return res.status(404).send({ err: "Username is not registered." });
  }

  try {
    const foundUser = await User.findOne({
      username: { $regex: new RegExp(username, "i") }
    });

    const passwordsMatch = await foundUser.validatePassword(password);

    if (!passwordsMatch) {
      return res.status(400).send({ err: "Password is incorrect" });
    }

    return res.status(200).send({ msg: "Success: logged in", user: foundUser });
  } catch (error) {
    return res.status(500).send({ msg: "Unknown error occured", error });
  }
});

module.exports = router;
