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
  res.status(200).json({
    status: "success",
    // data: {
    //   board,
    // },
  });
});
