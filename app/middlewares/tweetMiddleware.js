const User = require("../models/User");
const Tweet = require("../models/Tweet");

module.exports.createTweet = async (req, res, next) => {
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

  req.tweetObjId = tweetObjId;
  req.savedTweet = savedTweet;
  req.retrievedUser = retrievedUser;

  next();
};
