const express = require("express");
const router = express.Router();
const Portfolio = require("../models/Portfolio");
const User = require("../models/User");
const Comment = require("../models/Comment");
const jwt = require("../modules/token");
const { profileInfo } = require("./profiles");
const { verifyAuthor } = require("../midlewares/auth");

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
router.post("/", jwt.verifyToken, async (req, res, next) => {
  try {
    req.body.portfolio.author = req.user.id;
    const portfolio = await (
      await Portfolio.create(req.body.portfolio)
    ).execPopulate("author");

    res.status(201).json({ portfolio: portfolioInfo(portfolio, req.user) });
  } catch (error) {
    next(error);
  }
});

// get one portfolio
router.get("/:slug", jwt.verifyTokenOptional, async (req, res, next) => {
  try {
    const slug = req.params.slug;
    const portfolio = await Portfolio.findOne({ slug }).populate("author");
    res.status(200).json({ portfolio: portfolioInfo(portfolio, req.user) });
  } catch (error) {
    next(error);
  }
});

// update portfolio
router.put("/:slug", jwt.verifyToken, async (req, res, next) => {
  try {
    const slug = req.params.slug;
    const currentPortfolio = await Portfolio.findOne({ slug });
    verifyAuthor(currentPortfolio.author, req.user.id, res);

    const portfolio = await Portfolio.findOneAndUpdate(
      { slug },
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
router.delete("/:slug", jwt.verifyToken, async (req, res, next) => {
  try {
    const slug = req.params.slug;
    const currentPortfolio = await Portfolio.findOne({ slug });
    verifyAuthor(currentPortfolio.author, req.user.id, res);
    const portfolio = await Portfolio.findOneAndDelete({ slug });
    await Comment.deleteMany({ _id: { $in: portfolio.comments } });
    res.status(200).json({ message: "Portfolio deleted successfully" });
  } catch (error) {
    next(error);
  }
});

// Get all comments of an portfolio
router.get(
  "/:slug/comments",
  jwt.verifyTokenOptional,
  async (req, res, next) => {
    try {
      const slug = req.params.slug;
      const portfolio = await Portfolio.findOne({ slug }).populate({
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
router.post("/:slug/comments", jwt.verifyToken, async (req, res, next) => {
  try {
    const slug = req.params.slug;
    const author = req.user.id;
    req.body.comment.author = author;
    const comment = await (await Comment.create(req.body.comment)).execPopulate(
      "author"
    );
    const portfolio = await Portfolio.findOneAndUpdate(
      { slug },
      { $addToSet: { comments: comment.id } }
    );

    res.status(200).json({ comment: commentInfo(comment, req.user) });
  } catch (error) {
    next(error);
  }
});

// delete a comment
router.delete(
  "/:slug/comments/:id",
  jwt.verifyToken,
  async (req, res, next) => {
    try {
      const slug = req.params.slug;
      const commentId = req.params.id;
      const currentComment = await Comment.findById(commentId);
      verifyAuthor(currentComment.author, req.user.id, res);
      const comment = await Comment.findByIdAndDelete(commentId);
      const portfolio = await Portfolio.findOneAndUpdate(
        { slug },
        { $pull: { comments: commentId } }
      );

      res
        .status(200)
        .json({ message: "Comment has been deleted successfully" });
    } catch (error) {
      next(error);
    }
  }
);

// favorite portfolio
router.post("/:slug/favorite", jwt.verifyToken, async (req, res, next) => {
  try {
    const slug = req.params.slug;
    const portfolio = await Portfolio.findOneAndUpdate(
      { slug },
      { $addToSet: { favorites: req.user.id } },
      { new: true }
    ).populate("author");

    res
      .status(200)
      .json({ portfolio: { ...portfolioInfo(portfolio, req.user) } });
  } catch (error) {
    next(error);
  }
});

// unfavorite portfolio
router.delete("/:slug/favorite", jwt.verifyToken, async (req, res, next) => {
  try {
    const slug = req.params.slug;
    const portfolio = await Portfolio.findOneAndUpdate(
      { slug },
      { $pull: { favorites: req.user.id } },
      { new: true }
    ).populate("author");

    res
      .status(200)
      .json({ portfolio: { ...portfolioInfo(portfolio, req.user) } });
  } catch (error) {
    next(error);
  }
});

function portfolioInfo(portfolio, currentUser) {
  const isFavorite = currentUser
    ? portfolio.favorites.includes(currentUser.id)
    : false;

  return {
    slug: portfolio.slug,
    title: portfolio.title,
    description: portfolio.description,
    body: portfolio.body,
    tagList: portfolio.tagList,
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
