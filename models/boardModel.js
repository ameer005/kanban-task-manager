const mongoose = require("mongoose");

const subTaskSchema = new mongoose.Schema({
  title: {
    type: String,
    required: ["true", "Please provide title"],
  },
  isCompleted: {
    type: Boolean,
    required: ["true", "Please set isCompleted"],
    default: false,
  },
});

const taskSchema = new mongoose.Schema({
  title: {
    type: String,
    required: ["true", "Please provide title"],
  },
  description: String,
  subTasks: [subTaskSchema],
});

const columnSchema = new mongoose.Schema({
  name: {
    type: String,
    required: ["true", "Please provide column name"],
  },
  tasks: [taskSchema],
});

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
  columns: [columnSchema],
});

const Board = mongoose.model("Board", boardSchema);

module.exports = Board;
