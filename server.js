const express = require("express");
const mongoose = require("mongoose");
const logger = require("morgan");
const path = require("path");
const passport = require("passport");
const { cloudinaryConfig } = require("./config/cloudinary");

const app = express();
const PORT = 5000;

require("dotenv").config();

require("./config/passport");

const indexRouter = require("./routes/index");
const usersRouter = require("./routes/users").router;
const profilesRouter = require("./routes/profiles").router;
const portfoliosRouter = require("./routes/portfolios");
const authRouter = require("./routes/auth");

mongoose.connect(
  process.env.MONGODB_URI,
  { useNewUrlParser: true, useUnifiedTopology: true },
  (err) => {
    console.log(err ? err : "Connected");
  }
);

// TEST ROUTE
app.get("/api/team", (req, res) => {
  const teamMates = [
    { id: 1, firstName: "Vishakha", lastName: "Khatade" },
    { id: 2, firstName: "Tinkal", lastName: "Deka" },
    { id: 3, firstName: "Bharat", lastName: "Jain" },
  ];
  res.json(teamMates);
});

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use("*", cloudinaryConfig);
app.use(express.static(path.join(__dirname, "public")));

app.use(passport.initialize());
app.use(passport.session());

app.use("/api", indexRouter);
app.use("/api/users", usersRouter);
app.use("/api/profiles", profilesRouter);
app.use("/api/portfolios", portfoliosRouter);
app.use("/api/auth", authRouter);

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
