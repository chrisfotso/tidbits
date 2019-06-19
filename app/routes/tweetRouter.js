const express = require("express");
const router = express.Router();

const Tweet = require("../models/Tweet");

const { verifyToken } = require("../middlewares/jwtMiddleware");
const { createTweet } = require("../middlewares/tweetMiddleware");

//GET endpoint for retrieving all tweets
router.get("/all", verifyToken, async (req, res) => {
  const allTweets = await Tweet.find({})
    .sort({ date: -1 }) //Returns newest tweets first
    .populate("tweeter", "username")
    .exec();

  return res.status(200).send(allTweets);
});

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
router.post("/new", verifyToken, createTweet, async (req, res) => {
  const { tweetObjId, savedTweet, retrievedUser } = req;

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

//POST endpoint for replying to tweet
router.post("/:id/reply", verifyToken, createTweet, async (req, res) => {
  const { id: tweetId } = req.params;
  const { tweetObjId } = req;

  const query = { tweetId };

  //Updating existing tweet with tweetId specified in URL params
  //Pushing objectId of new tweet onto the replies of already existing tweet
  const update = {
    $push: {
      replies: tweetObjId
    }
  };

  //Setting option "new" to true returns the updated document
  const options = { new: true };

  const tweetUpdatedWithReply = await Tweet.findOneAndUpdate(
    query,
    update,
    options
  )
    .select("text replies") //I only want the "text" field and the "replies" field
    .populate("replies", "tweetId tweeter text replies") //populate() returns the entire subdocument instead of just the objectId
    .exec();

  return res
    .status(201)
    .send({ msg: "Success, tweet reply created", tweetUpdatedWithReply });
});

module.exports = router;
