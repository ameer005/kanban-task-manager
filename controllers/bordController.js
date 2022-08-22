const Board = require("../models/boardModel");
const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/appError");

exports.getAllBoard = catchAsync(async (req, res, next) => {
  const boards = await Board.find();

  res.status(200).json({
    status: "success",
    results: boards.length,
    data: {
      boards,
    },
  });
});

exports.createBoard = catchAsync(async (req, res, next) => {
  const { name } = req.body;

  if (!name) {
    return next(new AppError("Please provide all valued", 401));
  }

  const board = await Board.create({ name });

  res.status(201).json({
    status: "success",
    data: {
      board,
    },
  });
});
