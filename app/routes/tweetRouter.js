const express = require("express");
const router = express.Router();

const User = require("../models/User");
const Tweet = require("../models/Tweet");

const { verifyToken } = require("../middlewares/jwtMiddleware");

//POST endpoint for creating a new tweet
router.post("/new", verifyToken, async (req, res) => {
  //Destructuring: jwtUser was added to req in verifyToken middleware, text is from req body
  const {
    jwtUser,
    body: { text }
  } = req;

  //Finding user with username from JWT (case-insensitive regex)
  const retrievedUser = await User.findOne({
    username: { $regex: new RegExp(jwtUser, "i") }
  }).exec();

  //Destructuring: getting id from foundUser document and declaring renamed variable userId
  const { id: userId } = retrievedUser;

  const newTweet = {
    tweeter: userId,
    text
  };

  const savedTweet = await Tweet.create(newTweet);
  const tweetObjId = savedTweet.id;

  await retrievedUser.addTweet(tweetObjId);

  return res.send({
    msg: "Success: tweet created",
    savedTweet: {
      tweetId: savedTweet.tweetId,
      tweeter: savedTweet.tweeter,
      text: savedTweet.text
    }
  });
});

module.exports = router;
