const mongoose = require("mongoose");
require("mongoose-type-url");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    avatar: { type: String },
    username: { type: String, unique: true, required: true },
    email: { type: String, unique: true, required: true },
    location: { type: String },
    stackList: [{ type: String }],
    availability: { type: Boolean, default: true },
    password: { type: String, required: true },
    bio: String,
    description: { type: String },
    socials: {
      twitter: { type: mongoose.SchemaTypes.Url, unique: true },
      github: { type: mongoose.SchemaTypes.Url, unique: true },
      linkedin: { type: mongoose.SchemaTypes.Url, unique: true },
      medium: { type: mongoose.SchemaTypes.Url, unique: true },
    },
    following: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
  },
  { timestamps: true }
);

userSchema.pre("save", function (next) {
  if (this.password) {
    bcrypt.hash(this.password, 12, (err, hash) => {
      if (err) return next(err);
      this.password = hash;
      next();
    });
  } else {
    next();
  }
});

// TODO: change sync to async methods
userSchema.methods.verifyPassword = function (password) {
  return bcrypt.compareSync(password, this.password);
};

module.exports = mongoose.model("User", userSchema);
