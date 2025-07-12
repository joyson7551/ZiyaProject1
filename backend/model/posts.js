const mongoose = require("mongoose");

const post = new mongoose.Schema({
  title: {
    required: true,
    type: String,
  },
  content: {
    required: true,
    type: String,
  },
  tags: {
    type: [String],
    default: [],
    trim: true,
  },
});

module.exports = mongoose.model("posts", post);
