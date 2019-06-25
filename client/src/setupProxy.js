const proxy = require("http-proxy-middleware");

module.exports = function(app) {
  app.use(proxy("/tweet", { target: "http://127.0.0.1:5000/", secure: false }));
  app.use(proxy("/user", { target: "http://127.0.0.1:5000/", secure: false }));
};
