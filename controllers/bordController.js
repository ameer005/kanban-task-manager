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
