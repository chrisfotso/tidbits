const express = require("express");
const mongoose = require("mongoose");

const DB_URL = `mongodb+srv://chrisadmin:Adminkflowslime17@cluster0-mealh.mongodb.net/test?retryWrites=true`;
const userRouter = require("./app/routes/userRouter");
const app = express();

app.use(express.json());
app.use(userRouter);

const port = process.env.PORT || 5000;

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
