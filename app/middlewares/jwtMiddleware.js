const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../../config");

module.exports.verifyToken = (req, res, next) => {
  const authHeader = req.headers["authorization"];

  if (!authHeader) {
    return res
      .status(403)
      .send({ err: "No authorization header sent in request" });
  }

  const authBearerToken = authHeader.split(" ")[1];

  if (!authBearerToken) {
    return res
      .status(400)
      .send({ err: "No token sent in authorization header" });
  }

  try {
    const decodedPayload = jwt.verify(authBearerToken, JWT_SECRET);
    req.jwtUser = decodedPayload;
    next();
  } catch (err) {
    return res.status(500).send({ err });
  }
};
