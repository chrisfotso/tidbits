const express = require("express");
const mongoose = require("mongoose");

const { DB_URL } = require("./config");
const userRouter = require("./app/routes/userRouter");
const tweetRouter = require("./app/routes/tweetRouter");

const app = express();

app.use(express.json());

app.use("/user", userRouter);
app.use("/tweet", tweetRouter);

const port = process.env.PORT || 5622;

const initServer = () => {
  return app.listen(port, () => {
    console.log(`Server running on port ${port}.`);
  });
};

const initDB = () => {
  const options = {
    useNewUrlParser: true,
    useFindAndModify: false,
    useCreateIndex: true
  };

  return mongoose
    .connect(DB_URL, options)
    .then(() => console.log("Connected to database"))
    .catch(e => console.error(e));
};

initServer();
initDB();
