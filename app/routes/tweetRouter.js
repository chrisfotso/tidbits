const express = require("express");
const router = express.Router();

const User = require("../models/User");
const Tweet = require("../models/Tweet");

const jwt = require("jsonwebtoken");
const { verifyToken } = require("../../jwtConfig");
const { JWT_SECRET } = require("../../config");

// "eyJhbGciOiJIUzI1NiJ9.Y2hyaXNwb3N0cw.C8t0qPP-T1q_iy4CdH9jRoZkNqaTg0jBx6rZXTl2_Oc"

router.post("/new", verifyToken, async (req, res) => {
  const {
    jwtUser,
    body: { text }
  } = req;

  const foundUser = await User.findOne({
    username: { $regex: new RegExp(jwtUser, "i") }
  }).exec();

  const { id: userId } = foundUser;

  const newTweet = {
    tweeter: userId,
    text
  };

  const savedTweet = await Tweet.create(newTweet);
  const tweetId = savedTweet.id;

  await Promise.all([
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
