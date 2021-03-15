const express = require("express");
const router = express.Router();
const User = require("../models/User");
const jwt = require("../modules/token");

// register
router.post("/", async (req, res, next) => {
  try {
    const user = await User.create(req.body.user);
    const token = await jwt.generateJWT(user);
    res.status(201).json({ user: { ...userInfo(user), token } });
  } catch (error) {
    next(error);
  }
});

// user login
router.post("/login", async (req, res, next) => {
  try {
    const password = req.body.user.password;
    const email = req.body.user.email;
    const user = await User.findOne({ email });

    if (user?.verifyPassword(password)) {
      const token = await jwt.generateJWT(user);
      res.status(200).json({ user: { ...userInfo(user), token } });
    } else {
      res.status(422).json({ errors: { body: ["Invalid Email or Password"] } });
    }
  } catch (error) {
    next(error);
  }
});

function userInfo(user) {
  return {
    name: user.name,
    email: user.email,
    location: user.location,
    availability: user.availability,
    username: user.username,
    bio: user.bio,
    image: user.image,
  };
}

module.exports = { router, userInfo };
