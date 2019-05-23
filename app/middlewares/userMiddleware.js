const { usernameExistsInDatabase } = require("../helpers/userFunctions");

module.exports.verifyRegisterInput = async (req, res, next) => {
  //Destructuring req.body for username and password
  const { username, password } = req.body;

  if (!username || !password) {
    return res
      .status(400)
      .send({ err: "Please enter a username and password." });
  }

  //Using regex to make sure there's no whitespace
  if (username.replace(/\s/, "") !== username) {
    return res.status(400).send({ err: "Username cannot contain whitespace." });
  }

  if (await usernameExistsInDatabase(username)) {
    return res.status(422).send({
      err: "Username already registered, please choose a different one."
    });
  }

  next();
};

module.exports.verifyLoginInput = async (req, res, next) => {
  //Destructuring req.body to get username and password
  //Renaming username as bodyUsername for clarity
  const { username: bodyUsername, password } = req.body;

  if (!bodyUsername || !password) {
    return res
      .status(400)
      .send({ err: "Please enter a username and password." });
  }

  if ((await usernameExistsInDatabase(bodyUsername)) === false) {
    return res.status(404).send({ err: "Username is not registered." });
  }

  next();
};
