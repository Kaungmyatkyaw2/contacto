const User = require("../models/userModel");
const AppError = require("../utils/appError");
const factory = require("./handleFactory");

const filteredObj = (obj, ...allowedFields) => {
  const newObj = {};

  Object.keys(obj).forEach((el) => {
    if (allowedFields.includes(el)) {
      newObj[el] = obj[el];
    }
  });

  return newObj;
};

exports.protectUpdateMe = (req, res, next) => {
  if (req.body.password || req.body.passwordConfirm) {
    return next(new AppError("This route isn't for updating password.", 400));
  }
  req.body = filteredObj(req.body, "photo", "name");

  req.params.id = req.user._id;

  next();
};
exports.updateMe = factory.updateOne(User);

exports.setUserId = (field) => (req, res, next) => {
  const userId = req.user._id;
  req[field].user = userId;
  next();
}
