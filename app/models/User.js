const mongoose = require("mongoose");

const { Schema, model } = mongoose;

const userSchema = new Schema({
  displayName: String,
  handle: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  tweets: {
    type: Schema.Types.ObjectId,
    ref: "Tweet"
  },
  following: {
    type: Schema.Types.ObjectId,
    ref: "User"
  },
  followers: {
    type: Schema.Types.ObjectId,
    ref: "User"
  }
});
