const express = require("express");
const Portfolio = require("../models/Portfolio");
const router = express.Router();
const User = require("../models/User");
const jwt = require("../modules/token");
const { userInfo } = require("./users");

// api documentation
router.get("/", (req, res, next) => {
  res
    .type("text/html")
    .status(200)
    .send(
      "<h1>Check out <a href='https://github.com/gothinkster/realworld/tree/master/api'>conduit api docs</a> for API info</h1>"
    );
});

// get current user
router.get("/user", jwt.verifyToken, async (req, res, next) => {
  try {
    const user = await User.findById(req.user.id);
    const token = await jwt.generateJWT(user);
    res.status(200).json({ user: { ...userInfo(user), token } });
  } catch (error) {
    next(error);
  }
});

// update current user
router.put("/user", jwt.verifyToken, async (req, res, next) => {
  try {
    const updatedUser = await User.findByIdAndUpdate(
      req.user.id,
      req.body.user,
      {
        new: true,
      }
    );
    const token = await jwt.generateJWT(updatedUser);
    res.status(200).json({ user: { ...userInfo(updatedUser), token } });
  } catch (error) {
    next(error);
  }
});

// Get all tags
router.get("/tags", async (req, res, next) => {
  try {
    const tags = await Portfolio.find({}).distinct("tagList");
    res.status(200).json({ tags });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
