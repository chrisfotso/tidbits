const proxy = require("http-proxy-middleware");

module.exports = function(app) {
  app.use(
    proxy("/tweet", {
      target: "http://[::1]:5622",
      secure: false,
      changeOrigin: true
    })
  );
  app.use(
    proxy("/user", {
      target: "http://[::1]:5622",
      secure: false,
      changeOrigin: true
    })
  );
};
