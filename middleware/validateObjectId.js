// This middleware function checks if the provided ID in the request parameters is a valid MongoDB ObjectId.
// If the ID is not valid, it sends a 400 Bad Request response with an error message.
const mongoose = require("mongoose");

module.exports = (req, res, next) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    return res.status(400).json({ message: "Invalid ID format" });
  }
  next();
};