const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const tweetSchema = new Schema({
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
  date: {
    type: Date,
    default: Date.now
  }
});

tweetSchema.methods.addTweeter = async function(userId) {
  this.tweeter = userId;
  this.save();
  return this;
};

const Tweet = model("Tweet", tweetSchema);

module.exports = Tweet;
