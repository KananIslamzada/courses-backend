const bodyParser = require("body-parser");
const cors = require("cors");
const express = require("express");
const mongoose = require("mongoose");
const usersRouter = require("./routes/users");
const commentsRouter = require("./routes/comments");
const videosRouter = require('./routes/videos');
const starsRouter = require('./routes/stars');
const progressRouter = require('./routes/progress');

require("dotenv/config");

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use("/user", usersRouter);
app.use("/video", videosRouter);
app.use("/comment", commentsRouter);
app.use("/star", starsRouter);
app.use("/progress", progressRouter);

app.get("/", (_, res) => {
  res.send("This is home");
});

mongoose.connect(process.env.DB_CONNECTION, { useNewUrlParser: true });

const db = mongoose.connection;

db.on("open", () => {
  console.log("Connected to ", process.env.DB_CONNECTION);
});

db.on("error", (err) => {
  console.log({ err });
});

app.listen(process.env.PORT || 3000, () =>
  console.log(`Listening port ${process.env.PORT || 3000}...`)
);
