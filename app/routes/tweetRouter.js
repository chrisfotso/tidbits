const express = require("express");
const router = express.Router();

const User = require("../models/User");
const Tweet = require("../models/Tweet");

const { verifyToken } = require("../middlewares/jwtMiddleware");

//GET endpoint for retrieving a tweet
router.get("/:id", async (req, res) => {
  const { id: tweetId } = req.params;
  const retrievedTweet = await Tweet.findOne({ tweetId }).exec();

  //findOne() returns null if no document is found
  if (!retrievedTweet) {
    return res
      .status(404)
      .send({ err: `Tweet with id of ${tweetId} does not exist` });
  }

  return res.status(200).send(retrievedTweet);
});

//DELETE endpoint for deleting a tweet
router.delete("/:id", async (req, res) => {
  const { id: tweetId } = req.params;
  const deletedTweet = await Tweet.findOneAndDelete({ tweetId }).exec();

  //findOneAndDelete() returns null if a document matching the conditions was not found
  //If there's no document with a matching tweetId, that means no tweet to delete
  if (!deletedTweet) {
    return res.status(400).send({
      err: `Tweet with id of ${tweetId} could not be deleted because it does not exist`
    });
  }

  return res.status(200).send({
    msg: `Success: tweet with id of ${tweetId} has been deleted`,
    deletedTweet
  });
});

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
