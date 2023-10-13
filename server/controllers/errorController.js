const AppError = require("../utils/appError");

const handleCastError = (err) => {
  return new AppError(`Invalid ${err.path} : ${err.value}`, 400);
};

const handleJWTError = () => {
  return new AppError("Invalid Token ! Please login again !", 401);
};

const handleJWTExpiredError = () => {
  return new AppError("Your Token has expired ! Please login again !", 401);
};

const handleValidationError = (error) => {
  const errorKeys = Object.keys(error.errors);
  const msg =
    "Invalid Data. " +
    errorKeys.map((el) => error.errors[el].message).join(" ");

  return new AppError(msg, 400);
};

const handleDuplicateKeysError = (error) => {
  const duplicateFields = Object.keys(error.keyPattern);

  const msg =
    "These fields are already in used : " + duplicateFields.join(" , ");

  return new AppError(msg, 400);
};

const sendErrorDev = (error, res) => {
  res.status(error.statusCode || 500).json({
    ...error,
    message: error.message,
    stack: error.stack,
  });
};

const sendErrorProd = (err, res) => {
  if (err.isOperational) {
    return res.status(err.statusCode).json({
      status: err.status,
      message: err.message,
    });
  }

  return res.status(500).json({
    status: "error",
    message: "Something went wrong. Try again later.",
  });
};

const handleErrorGlobally = (error, req, res, next) => {
  console.log(error)
  if (error.name == "ValidationError") error = handleValidationError(error);
  if (error.code == 11000) error = handleDuplicateKeysError(error);
  if (error.name === "JsonWebTokenError") error = handleJWTError();
  if (error.name === "TokenExpiredError") error = handleJWTExpiredError();
  if (error.name === "CastError") error = handleCastError(error);

  if (process.env.NODE_ENV === "production") {
    return sendErrorProd(error, res);
  }

  sendErrorDev(error, res);
};

module.exports = handleErrorGlobally;
