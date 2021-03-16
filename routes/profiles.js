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
    const username = req.params.username;
    const user = await User.findOne({ username });
    const currentUser = await User.findByIdAndUpdate(
      req.user.id,
      { $addToSet: { followings: user.id } },
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
    const username = req.params.username;
    const user = await User.findOne({ username });
    const currentUser = await User.findByIdAndUpdate(
      req.user.id,
      { $pull: { followings: user.id } },
      { new: true }
    );
    res.status(200).json({ profile: profileInfo(user, currentUser) });
  } catch (error) {
    next(error);
  }
});

function profileInfo(user, currentUser) {
  const isFollowing = currentUser
    ? currentUser?.followings?.includes(user.id)
    : false;
  return {
    name: user.name,
    email: user.email,
    username: user.username,
    location: user.location,
    bio: user.bio,
    description: user.description,
    profileImage: user.profileImage,
    socialLinks: user.socialLinks,
    stackList: user.stackList,
    following: isFollowing,
  };
}

module.exports = { router, profileInfo };
