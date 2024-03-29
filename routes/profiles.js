const express = require("express");
const router = express.Router();
const User = require("../models/User");
const jwt = require("../modules/token");

// get user profile
router.get("/:username", jwt.verifyTokenOptional, async (req, res, next) => {
  try {
    const username = req.params.username;
    const user = await User.findOne({ username });
    res.status(200).json({ profile: profileInfo(user, req.user) });
  } catch (error) {
    next(error);
  }
});

// follow a user
router.post("/:username/follow", jwt.verifyToken, async (req, res, next) => {
  try {
    console.log("sjdvhisd-----follow");
    const username = req.params.username;
    const user = await User.findOne({ username });

    const currentUser = await User.findByIdAndUpdate(
      req.user.id,
      { $addToSet: { following: user.id } },
      { new: true }
    );
    res.status(200).json({ profile: profileInfo(user, currentUser) });
  } catch (error) {
    next(error);
  }
});

// unfollow a user
router.delete("/:username/follow", jwt.verifyToken, async (req, res, next) => {
  try {
    console.log("sjdvhisd-----unfollow");
    const username = req.params.username;
    const user = await User.findOne({ username });
    const currentUser = await User.findByIdAndUpdate(
      req.user.id,
      { $pull: { following: user.id } },
      { new: true }
    );
    console.log(currentUser);
    res.status(200).json({ profile: profileInfo(user, currentUser) });
  } catch (error) {
    next(error);
  }
});

function profileInfo(user, currentUser) {
  const isFollowing = currentUser
    ? currentUser?.following?.includes(user.id)
    : false;

  return {
    name: user.name,
    email: user.email,
    username: user.username,
    socials: user.socials,
    stackList: user.stackList,
    location: user.location,
    availability: user.availability,
    bio: user.bio,
    avatar: user.avatar,
    description: user.description,
    following: isFollowing,
  };
}

module.exports = { router, profileInfo };
