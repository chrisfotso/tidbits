const express = require("express");
const router = express.Router();

const User = require("../models/User");
const Tweet = require("../models/Tweet");

const jwt = require("jsonwebtoken");
const { verifyToken } = require("./middleware/middleware");
const { JWT_SECRET } = require("../../config");

//Endpoint for creating a new tweet
router.post("/new", verifyToken, async (req, res) => {
  //Destructuring: jwtUser was added to req in verifyToken middleware, text is from req body
  const {
    jwtUser,
    body: { text }
  } = req;

  //Finding user with username from JWT (case-insensitive)
  const foundUser = await User.findOne({
    username: { $regex: new RegExp(jwtUser, "i") }
  }).exec();

  //Destructuring: getting id from foundUser document and declaring renamed variable userId
  const { id: userId } = foundUser;

  const newTweet = {
    tweeter: userId,
    text
  };

  const savedTweet = await Tweet.create(newTweet);
  const tweetId = savedTweet.id;

  await Promise.all([
    //These two methods are declared in the User and Tweet models
    savedTweet.addTweeter(userId),
    foundUser.addTweet(tweetId)
  ]);

  return res.send({
    msg: "Success: tweet created",
    savedTweet: {
      tweeter: savedTweet.tweeter,
      text: savedTweet.text
    }
  });
});

module.exports = router;
