const User = require("../models/User");

module.exports.usernameExistsInDatabase = async username => {
  const query = {
    username: { $regex: new RegExp(`^${username}$`, "i") }
  };

  const existingUser = await User.findOne(query).exec();

  return Boolean(existingUser);
};
