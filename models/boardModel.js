const mongoose = require("mongoose");

const boardSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please provide board name"],
    trim: true,
  },
  user: {
    type: mongoose.Types.ObjectId,
    ref: "User",
    required: [true, "Please provide user"],
  },
});

const Board = mongoose.model("Board", boardSchema);

module.exports = Board;
