const User = require("../models/User");
const Tweet = require("../models/Tweet");

module.exports.createTweet = async (req, res, next) => {
  //Destructuring: jwtUser was added to req object in verifyToken middleware, text is from req body
  const {
    jwtUser,
    path,
    body: { text }
  } = req;

  let isReply = path === "/new" ? false : true;

  //Finding user with username from JWT (case-insensitive regex)
  const retrievedUser = await User.findOne({
    username: { $regex: new RegExp(jwtUser, "i") }
  }).exec();

  //Destructuring: getting id from foundUser document and declaring renamed variable userId
  const { id: userId } = retrievedUser;

  const newTweet = {
    tweeter: userId,
    isReply,
    text
  };

  const savedTweet = await Tweet.create(newTweet);
  const tweetObjId = savedTweet.id;

  req.tweetObjId = tweetObjId;
  req.savedTweet = savedTweet;
  req.retrievedUser = retrievedUser;

  next();
};
