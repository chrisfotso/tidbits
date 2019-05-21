const express = require("express");
const router = express.Router();

router.post("/register", async (req, res) => {
  //Get username and password from request
  //Make sure both username and password are filled in, if not throw error
  //Check if username (case-insensitive) already exists in database
  //If username exists:
  //  Redirect to login with error
  //Else if username doesn't exist:
  //Hash password using bcrypt
  //Add new user to database
  //Figure out how to do authentication - Passport or JWT or cookies? All three?
  //Redirect to screen where they can choose display name and prompt them to make first tweet
});

module.exports = router;
