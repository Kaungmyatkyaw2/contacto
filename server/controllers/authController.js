const User = require("./../models/userModel");
const catchAsync = require("./../utils/catchAsync");
const AppError = require("../utils/appError");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");

const { promisify } = require("util");
const Email = require("../utils/email");

const signToken = (id) =>
  jwt.sign({ id }, process.env.JWT_SECRET_KEY, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });

const createSendToken = (user, statusCode, res) => {
  const token = signToken(user._id);
  const cookieConfig = {
    expires: new Date(
      Date.now() + process.env.COOKIES_EXPIRES_IN * 24 * 60 * 60 * 1000
    ),
    httpOnly: true,
  };

  user.password = undefined;

  res.cookie("jwt", token, cookieConfig);

  res.status(statusCode).json({
    status: "success",
    token,
    data: {
      user,
    },
  });
};

const createSendVerifyEmailToken = async (
  verifyToken,
  user,
  req,
  res,
  next
) => {
  try {
    if (user.verifiedEmail) {
      return next(new AppError("Email is already verified.", 400));
    }

    const verifyEmailUrl = `${req.protocol}://${req.get(
      "host"
    )}/users/verifyEmail/${verifyToken}`;

    const verifyEmailForClient = `${req.headers.origin}/verifyEmail?token=${verifyToken}`;

    await new Email(user, verifyEmailForClient).sendVerifyEmailLink();
    res.status(200).json({
      status: "success",
      message:
        "The verify email link is already sent to your email. Please Check the email!",
    });
  } catch (error) {
    console.log(error);
    user.verifyEmailToken = undefined;
    user.verifyEmailTokenExpires = undefined;
    await user.save({ validateBeforeSave: false });

    return next(
      new AppError("Error while sending email. Try again later !", 500)
    );
  }
};

exports.signup = catchAsync(async (req, res, next) => {
  const userData = {
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
    passwordConfirm: req.body.passwordConfirm,
    photo: req.body.photo,
    photoPublicId: req.body.photoPublicId,
  };
  const user = await User.create(userData);
  const verifyToken = user.createVerificationToken();
  await user.save({ validateBeforeSave: false });
  await createSendVerifyEmailToken(verifyToken, user, req, res, next);
});

exports.getVerifyEmailUrl = catchAsync(async (req, res, next) => {
  const user = await User.findOne({ email: req.body.email });

  if (!user) {
    return next(new AppError("This user is no longer exist.", 400));
  }

  const verifyToken = user.createVerificationToken();
  await user.save({ validateBeforeSave: false });
  await createSendVerifyEmailToken(verifyToken, user, req, res, next);
});

exports.verifyEmail = catchAsync(async (req, res, next) => {
  const token = req.params.token;
  const verifyToken = crypto.createHash("sha256").update(token).digest("hex");

  const user = await User.findOne({
    verifyEmailToken: verifyToken,
    verifyEmailTokenExpires: { $gte: Date.now() },
  });

  if (!user) {
    return next(new AppError("Token is invalid or already expired.", 401));
  }

  user.verifyEmailToken = undefined;
  user.verifyEmailTokenExpires = undefined;
  user.verifiedEmail = true;

  await user.save({ validateBeforeSave: false });

  createSendToken(user, 200, res);
});

exports.login = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return next(new AppError("Please provide an email and password.", 403));
  }

  const user = await User.findOne({ email }).select("+password");

  if (!user || !(await user.checkPassword(password, user.password))) {
    return next(new AppError("Invalid email or password.", 401));
  }

  if (!user.verifiedEmail) {
    return next(
      new AppError(
        "The user haven't verified the email.Please verify first. ",
        401
      )
    );
  }

  createSendToken(user, 200, res);
});

exports.updateMyPassword = catchAsync(async (req, res, next) => {
  const { _id: userId } = req.user;
  const { password, passwordConfirm, oldPassword } = req.body;

  const currentUser = await User.findById(userId).select("+password");

  if (!currentUser) {
    return next(new AppError("This user is no longer exist.", 400));
  }

  const isPasswordCorrect = await currentUser.checkPassword(
    oldPassword,
    currentUser.password
  );

  if (!isPasswordCorrect) {
    return next(new AppError("Invalid old password.", 401));
  }

  currentUser.password = password;
  currentUser.passwordConfirm = passwordConfirm;

  await currentUser.save();

  createSendToken(currentUser, 200, res);
});

exports.forgotPassword = catchAsync(async (req, res, next) => {
  if (!req.body.email) {
    return next(new AppError("Please provide an email.", 400));
  }

  const user = await User.findOne({ email: req.body.email });

  if (!user) {
    return next(new AppError("Please provide an valid email.", 400));
  }

  const resetToken = user.createResetToken();

  user.save({ validateBeforeSave: false });

  try {
    const resetPasswordURL = `${req.protocol}://${req.get(
      "host"
    )}/users/resetPassword/${resetToken}`;
    const resetPasswordURLForClient = `${req.headers.origin}/resetPassword?token=${resetToken}`;

    await new Email(user, resetPasswordURLForClient).sendResetPasswordLink();

    res.status(200).json({
      status: "success",
      message:
        "The password reset link is already sent to your email. Please Check the email!",
    });
  } catch (error) {
    console.log(error);
    user.passwordResetToken = undefined;
    user.passwordResetExpires = undefined;
    await user.save({ validateBeforeSave: false });

    return next(
      new AppError("Error while sending email. Try again later !", 500)
    );
  }
});

exports.resetPassword = catchAsync(async (req, res, next) => {
  const token = req.params.token;

  if (!req.body.password || !req.body.passwordConfirm) {
    return next(
      new AppError("Please provide password and passwordConfirm.", 400)
    );
  }
  const hashedToken = crypto.createHash("sha256").update(token).digest("hex");

  const user = await User.findOne({
    passwordResetToken: hashedToken,
    passwordResetExpires: { $gt: Date.now() },
  });

  if (!user) {
    return next(new AppError("The token is invalid or has expired.", 400));
  }

  user.password = req.body.password;
  user.passwordConfirm = req.body.passwordConfirm;
  user.passwordResetToken = undefined;
  user.passwordResetExpires = undefined;

  await user.save();

  createSendToken(user, 200, res);
});

exports.protect = catchAsync(async (req, res, next) => {
  let token;

  if (
    !req.headers.authorization ||
    !req.headers.authorization.trim().startsWith("Bearer")
  ) {
    return next(
      new AppError("You are not logged in! Please login to get accesss.", 401)
    );
  }

  token = req.headers.authorization.split(" ")[1].trim();

  const decodedJWT = await promisify(jwt.verify)(
    token,
    process.env.JWT_SECRET_KEY
  );

  const currentUser = await User.findById(decodedJWT.id);

  if (!currentUser) {
    return next(
      new AppError("The user belonging to this token is no longer exist.", 401)
    );
  }

  if (!currentUser.checkPasswordChangedAfter(decodedJWT.iat)) {
    return next(
      new AppError("The password have changed.Please log in again. ", 401)
    );
  }

  if (!currentUser.verifiedEmail) {
    return next(
      new AppError(
        "The user haven't verified the email.Please verify first. ",
        401
      )
    );
  }

  req.user = currentUser;

  next();
});
