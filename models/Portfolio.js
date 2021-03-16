var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var portfolioSchema = new Schema(
  {
    url: { type: String, required: true },
    type: { type: String },
    image: { type: String },
    tagList: [{ type: String }],
    favorites: [{ type: Schema.Types.ObjectId, ref: "User" }],
    comments: [{ type: Schema.Types.ObjectId, ref: "Comment" }],
    author: { type: Schema.Types.ObjectId, required: true, ref: "User" },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Portfolio", portfolioSchema);
