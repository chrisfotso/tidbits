const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const uniqid = require("uniqid");

const tweetSchema = new Schema({
  tweetId: {
    type: String,
    required: true,
    default: uniqid
  },
  tweeter: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  text: {
    type: String,
    required: true
  },
  likers: [
    {
      type: Schema.Types.ObjectId,
      ref: "User"
    }
  ],
  retweeters: [
    {
      type: Schema.Types.ObjectId,
      ref: "User"
    }
  ],
  replies: [
    {
      type: Schema.Types.ObjectId,
      ref: "Tweet"
    }
  ],
  isReply: Boolean,
  date: {
    type: Date,
    default: Date.now
  }
});

tweetSchema.methods.addReply = function(tweetId) {
  this.replies.push(tweetId);
  this.save();

  return this.replies;
};

const Tweet = model("Tweet", tweetSchema);

module.exports = Tweet;
