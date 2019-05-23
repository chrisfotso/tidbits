const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("./config");

module.exports.verifyToken = (req, res, next) => {
  const authHeader = req.headers["authorization"];

  if (!authHeader) {
    return res
      .status(403)
      .send({ msg: "No authorization header sent in request" });
  }

  const authBearerToken = authHeader.split(" ")[1];

  if (!authBearerToken) {
    return res
      .status(400)
      .send({ msg: "No token sent in authorization header" });
  }

  const decodedPayload = jwt.verify(authBearerToken, JWT_SECRET);

  req.jwtUser = decodedPayload;

  next();
};
