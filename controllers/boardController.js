const Board = require("../models/boardModel");
const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/appError");

exports.getAllBoard = catchAsync(async (req, res, next) => {
  const boards = await Board.find({ user: req.user.id });

  res.status(200).json({
    status: "success",
    results: boards.length,
    data: {
      boards,
    },
  });
});

exports.getBoard = catchAsync(async (req, res, next) => {
  // console.log(req.params.id);
  const board = await Board.findOne({ _id: req.params.id });

  if (!board) {
    return next(new AppError("No document found with this id", 404));
  }

  res.status(200).json({
    status: "success",
    data: {
      board,
    },
  });
});

exports.createBoard = catchAsync(async (req, res, next) => {
  const { name } = req.body;

  if (!name) {
    return next(new AppError("Please provide all valued", 401));
  }

  req.body.user = req.user.id;
  const board = await Board.create(req.body);

  res.status(201).json({
    status: "success",
    data: {
      board,
    },
  });
});

exports.deleteBoard = catchAsync(async (req, res, next) => {
  const board = await Board.findByIdAndDelete(req.params.id);

  if (!board) {
    return next(new AppError("No document found with this id", 404));
  }

  res.status(204).json({
    status: "success",
    data: null,
  });
});

exports.updateBoard = catchAsync(async (req, res, next) => {
  const board = await Board.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  if (!board) {
    return next(new AppError("No document found with this id", 404));
  }

  res.status(200).json({
    status: "success",
    data: {
      board,
    },
  });
});

// TASKS AND SUB TASKS
exports.createTask = catchAsync(async (req, res, next) => {
  const board = await Board.findById(req.params.id);

  if (!board) {
    return next(new AppError("No document found with this id", 404));
  }

  const columnToUpdate = board.columns.find(
    (column) => column._id.toString() === req.body.status
  );

  if (!columnToUpdate) {
    return next(new AppError("No document found with this id", 404));
  }

  columnToUpdate.tasks.push(req.body);

  const updatedBoard = await board.save();

  res.status(200).json({
    status: "success",
    data: {
      updatedBoard,
    },
  });
});

exports.deleteTask = catchAsync(async (req, res, next) => {
  const { columnId, taskId } = req.body;

  const board = await Board.findById(req.params.id);

  if (!board) {
    return next(new AppError("No document found with this board id", 404));
  }

  const columnToUpdate = board.columns.find(
    (column) => column._id.toString() === columnId
  );

  if (!columnToUpdate) {
    return next(new AppError("No document found with this column id", 404));
  }

  const taskIndex = columnToUpdate.tasks.findIndex(
    (task) => task._id.toString() === taskId
  );

  columnToUpdate.tasks.splice(taskIndex, 1);

  board.save();
  res.status(204).json({
    status: "success",
    data: null,
  });
});
