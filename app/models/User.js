const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const bcrypt = require("bcryptjs");

const userSchema = new Schema({
  displayName: String,
  username: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  tweets: [
    {
      type: Schema.Types.ObjectId,
      ref: "Tweet"
    }
  ],
  likes: [
    {
      type: Schema.Types.ObjectId,
      ref: "Tweet"
    }
  ],
  following: [
    {
      type: Schema.Types.ObjectId,
      ref: "User"
    }
  ],
  followers: [
    {
      type: Schema.Types.ObjectId,
      ref: "User"
    }
  ]
});

userSchema.methods.validatePassword = function(password) {
  return bcrypt.compare(password, this.password);
};

userSchema.statics.hashPassword = function(password) {
  return bcrypt.hash(password, 10);
};

userSchema.methods.addTweet = async function(tweetId) {
  this.tweets.push(tweetId);
  this.save();
  return;
};

const User = model("User", userSchema);

module.exports = User;
