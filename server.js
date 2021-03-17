const express = require("express");
const mongoose = require("mongoose");
const logger = require("morgan");
const path = require("path");
const { MongoError } = require("mongodb");
const { cloudinaryConfig } = require("./config/cloudinary");

const app = express();
const PORT = process.env.PORT || 3000;

require("dotenv").config();

const indexRouter = require("./routes/index");
const usersRouter = require("./routes/users").router;
const profilesRouter = require("./routes/profiles").router;
const portfoliosRouter = require("./routes/portfolios");

mongoose.connect(
  process.env.MONGODB_URI,
  { useNewUrlParser: true, useUnifiedTopology: true },
  (err) => {
    console.log(err ? err : "Connected");
  }
);

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use("*", cloudinaryConfig);
app.use(express.static(path.join(__dirname, "client/build")));

app.use("/api", indexRouter);
app.use("/api/users", usersRouter);
app.use("/api/profiles", profilesRouter);
app.use("/api/portfolios", portfoliosRouter);

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname + "/client/build/index.html"));
});

app.use((req, res, next) => {
  return res.status(404).json({ errors: { body: ["Page not found"] } });
});

app.use((error, req, res, next) => {
  console.log(error);
  if (error instanceof MongoError) {
    return res.status(422).json({ errors: { body: [error.toString()] } });
  }
  return res.status(500).json({ errors: { body: [error.toString()] } });
});

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
