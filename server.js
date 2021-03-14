const express = require("express");
const mongoose = require("mongoose");
const logger = require("morgan");
const path = require("path");
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

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
