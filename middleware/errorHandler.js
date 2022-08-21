module.exports = (err, req, res, next) => {
  console.log(err);

  const defaultError = {
    statusCode: err.statusCode || 500,
    message: err.message || "Something went wrong, try again later",
  };

  // handeling error manually
  if (err.name === "ValidationError") {
    defaultError.statusCode = 400;
    defaultError.message = Object.values(err.errors)
      .map((item) => item.message)
      .join(", ");
  }

  // handling duplicate mongoose field error correctly
  if (err.code && err.code === 11000) {
    defaultError.statusCode = StatusCodes.BAD_REQUEST;
    defaultError.message = `${Object.keys(
      err.keyValue
    )} Field has to be unique `;
  }

  res.status(defaultError.statusCode).json({
    status: "fail",
    message: defaultError.message,
  });
};
