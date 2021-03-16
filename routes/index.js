const express = require("express");
const Portfolio = require("../models/Portfolio");
const router = express.Router();
const User = require("../models/User");
const jwt = require("../modules/token");
const { userInfo } = require("./users");
const { multerUploadsAvatar, dataUri } = require("../midlewares/multer");
const { uploader } = require("../config/cloudinary");

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
router.put(
  "/user",
  jwt.verifyToken,
  multerUploadsAvatar,
  async (req, res, next) => {
    console.log(req.file);
    try {
      if (req.file) {
        const file = dataUri(req).content;
        return uploader
          .upload(file)
          .then(async (result) => {
            var url = result.url;

            const updatedUser = await User.findByIdAndUpdate(
              req.user.id,
              { avatar: url },
              {
                new: true,
              }
            );
            const token = await jwt.generateJWT(updatedUser);
            res.status(200).json({ user: { ...userInfo(updatedUser), token } });
          })
          .catch((err) => {
            console.log(err);
          });
      }

      // simple update
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
      console.log(error);
      next(error);
    }
  }
);

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
