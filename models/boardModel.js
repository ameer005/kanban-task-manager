const mongoose = require("mongoose");

const boardSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please provide board name"],
    trim: true,
  },
});

const Board = mongoose.model("Board", boardSchema);

module.exports = Board;
