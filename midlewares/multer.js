var multer = require("multer");
var Datauri = require("datauri/parser");
var path = require("path");

var storage = multer.memoryStorage();
var multerUploads = multer({ storage }).single("image");
var multerUploadsAvatar = multer({ storage }).single("avatar");

var dUri = new Datauri();

/*
 * @description This function converts the buffer to data url
 * @param {Object} req containing the field object
 * @returns {String} The data url from the string buffer
 */
var dataUri = (req) => {
  console.log("sdcdsb");
  return dUri.format(
    path.extname(req.file.originalname).toString(),
    req.file.buffer
  );
};

module.exports = { multerUploads, dataUri, multerUploadsAvatar };
