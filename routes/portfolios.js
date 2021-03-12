const express = require("express");
const router = express.Router();
const Portfolio = require("../models/Portfolio");
const User = require("../models/User");
const Comment = require("../models/Comment");
const jwt = require("../modules/token");
const { profileInfo } = require("./profiles");
const { verifyAuthor } = require("../midlewares/auth");
const { uploader, cloudinaryConfig } = require("../config/cloudinary");
const { multerUploads, dataUri } = require("../midlewares/multer");

// get all portfolios
router.get("/", jwt.verifyTokenOptional, async (req, res, next) => {
  try {
    let query = req.query;
    let filter = {};
    let limit = 20;
    let offset = 0;

    if (query.tag) filter.tagList = { $in: [query.tag] };
    if (query.limit) limit = +query.limit;
    if (query.offset) offset = +query.offset;
    if (query.author) {
      const author = await User.findOne({ username: query.author });
      filter.author = author.id;
    }

    if (query.favorited) {
      const user = await User.findOne({ username: query.favorited });
      filter.favorites = { $in: [user.id] };
    }

    const portfolios = await Portfolio.find(filter)
      .populate("author")
      .skip(offset)
      .limit(limit)
      .sort({ updatedAt: -1 });

    const portfoliosCount = await Portfolio.find(filter).count();

    res.status(200).json({
      portfolios: portfolios.map((portfolio) =>
        portfolioInfo(portfolio, req.user)
      ),
      portfoliosCount,
    });
  } catch (error) {
    next(error);
  }
});

// get portfolios feed
router.get("/feed", jwt.verifyToken, async (req, res, next) => {
  try {
    let query = req.query;
    let limit = 20;
    let offset = 0;

    if (query.limit) limit = +query.limit;
    if (query.offset) offset = +query.offset;
    const portfolios = await Portfolio.find({ author: req.user.id })
      .populate("author")
      .skip(offset)
      .limit(limit)
      .sort({ updatedAt: -1 });

    const portfoliosCount = await Portfolio.find({ author: req.user.id })
      .skip(offset)
      .limit(limit)
      .count();

    res.status(200).json({
      portfolios: portfolios.map((portfolio) =>
        portfolioInfo(portfolio, req.user)
      ),
      portfoliosCount,
    });
  } catch (error) {
    next(error);
  }
});

// create portfolio
router.post("/", jwt.verifyToken, multerUploads, async (req, res, next) => {
  try {
    req.body.author = req.user.id;
    console.log(req.body);
    if (req.body.stackList) {
      req.body.stackList = JSON.parse(req.body.stackList);
    }
    if (req.body.tagList) {
      req.body.tagList = JSON.parse(req.body.tagList);
    }
    if (req.file) {
      const file = dataUri(req).content;
      return uploader
        .upload(file)
        .then(async (result) => {
          var url = result.url;
          req.body.image = url;

          const portfolio = await (
            await Portfolio.create(req.body)
          ).execPopulate("author");

          res
            .status(201)
            .json({ portfolio: portfolioInfo(portfolio, req.user) });
        })
        .catch((err) => {
          console.log(err);
        });
    }

    const portfolio = await (await Portfolio.create(req.body)).execPopulate(
      "author"
    );
    res.status(201).json({ portfolio: portfolioInfo(portfolio, req.user) });
  } catch (error) {
    next(error);
  }
});

// get one portfolio
router.get("/:portfolioId", jwt.verifyTokenOptional, async (req, res, next) => {
  try {
    const portfolioId = req.params.portfolioId;
    const portfolio = await Portfolio.findById(portfolioId).populate("author");
    res.status(200).json({ portfolio: portfolioInfo(portfolio, req.user) });
  } catch (error) {
    next(error);
  }
});

// update portfolio
router.put("/:portfolioId", jwt.verifyToken, async (req, res, next) => {
  try {
    const portfolioId = req.params.portfolioId;
    const currentPortfolio = await Portfolio.findById(portfolioId);
    verifyAuthor(currentPortfolio.author, req.user.id, res);

    const portfolio = await Portfolio.findByIdAndUpdate(
      portfolioId,
      req.body.portfolio,
      {
        new: true,
      }
    ).populate("author");

    res.status(200).json({ portfolio: portfolioInfo(portfolio, req.user) });
  } catch (error) {
    next(error);
  }
});

// delete portfolio
router.delete("/:portfolioId", jwt.verifyToken, async (req, res, next) => {
  try {
    const portfolioId = req.params.portfolioId;
    const currentPortfolio = await Portfolio.findById(portfolioId);
    verifyAuthor(currentPortfolio.author, req.user.id, res);
    const portfolio = await Portfolio.findByIdAndDelete(portfolioId);
    await Comment.deleteMany({ _id: { $in: portfolio.comments } });
    res.status(200).json({ message: "Portfolio deleted successfully" });
  } catch (error) {
    next(error);
  }
});

// Get all comments of an portfolio
router.get(
  "/:portfolioId/comments",
  jwt.verifyTokenOptional,
  async (req, res, next) => {
    try {
      const portfolioId = req.params.portfolioId;
      const portfolio = await Portfolio.findById(portfolioId).populate({
        path: "comments",
        populate: "author",
      });
      res.status(200).json({
        comments: portfolio.comments
          .map((comment) => commentInfo(comment, req.user))
          .sort((a, b) => b.createdAt - a.createdAt),
      });
    } catch (error) {
      next(error);
    }
  }
);

// create a comment
router.post(
  "/:portfolioId/comments",
  jwt.verifyToken,
  async (req, res, next) => {
    try {
      const portfolioId = req.params.portfolioId;
      const author = req.user.id;
      req.body.comment.author = author;
      const comment = await (
        await Comment.create(req.body.comment)
      ).execPopulate("author");
      const portfolio = await Portfolio.findByIdAndUpdate(portfolioId, {
        $addToSet: { comments: comment.id },
      });

      res.status(200).json({ comment: commentInfo(comment, req.user) });
    } catch (error) {
      next(error);
    }
  }
);

// delete a comment
router.delete(
  "/:portfolioId/comments/:id",
  jwt.verifyToken,
  async (req, res, next) => {
    try {
      const portfolioId = req.params.portfolioId;
      const commentId = req.params.id;
      const currentComment = await Comment.findById(commentId);
      verifyAuthor(currentComment.author, req.user.id, res);
      const comment = await Comment.findByIdAndDelete(commentId);
      const portfolio = await Portfolio.findByIdAndUpdate(portfolioId, {
        $pull: { comments: commentId },
      });

      res
        .status(200)
        .json({ message: "Comment has been deleted successfully" });
    } catch (error) {
      next(error);
    }
  }
);

// favorite portfolio
router.post(
  "/:portfolioId/favorite",
  jwt.verifyToken,
  async (req, res, next) => {
    try {
      const portfolioId = req.params.portfolioId;
      const portfolio = await Portfolio.findByIdAndUpdate(
        portfolioId,
        { $addToSet: { favorites: req.user.id } },
        { new: true }
      ).populate("author");

      res
        .status(200)
        .json({ portfolio: { ...portfolioInfo(portfolio, req.user) } });
    } catch (error) {
      next(error);
    }
  }
);

// unfavorite portfolio
router.delete(
  "/:portfolioId/favorite",
  jwt.verifyToken,
  async (req, res, next) => {
    try {
      const portfolioId = req.params.portfolioId;
      const portfolio = await Portfolio.findByIdAndUpdate(
        portfolioId,
        { $pull: { favorites: req.user.id } },
        { new: true }
      ).populate("author");

      res
        .status(200)
        .json({ portfolio: { ...portfolioInfo(portfolio, req.user) } });
    } catch (error) {
      next(error);
    }
  }
);

function portfolioInfo(portfolio, currentUser) {
  const isFavorite = currentUser
    ? portfolio?.favorites?.includes(currentUser.id)
    : false;

  return {
    id: portfolio.id,
    url: portfolio.url,
    description: portfolio.description,
    tagList: portfolio.tagList,
    stackList: portfolio.stackList,
    image: portfolio.image,
    author: profileInfo(portfolio.author, currentUser),
    favorited: isFavorite,
    favoritesCount: portfolio.favorites.length,
    createdAt: portfolio.createdAt,
    updatedAt: portfolio.updatedAt,
  };
}

function commentInfo(comment, currentUser) {
  return {
    id: comment.id,
    createdAt: comment.createdAt,
    updatedAt: comment.updatedAt,
    body: comment.body,
    author: profileInfo(comment.author, currentUser),
  };
}

module.exports = router;
