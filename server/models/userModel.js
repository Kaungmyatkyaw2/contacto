const mongoose = require("mongoose");
const { default: validator } = require("validator");
const bcrypt = require("bcrypt");
const crypto = require("crypto");

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    trim: true,
    required: [true, "Name is required for an account."],
  },
  email: {
    type: String,
    trim: true,
    required: [true, "Email is required for an account."],
    unique: true,
    trim: true,
    validate: {
      validator: validator.isEmail,
      message: "Please provide a valid email.",
    },
  },
  photo: {
    type: String,
    trim: true,
  },
  photoPublicId: {
    type: String,
    trim: true,
  },
  password: {
    type: String,
    trim: true,
    select: false,
    minlength: 6,
    maxlength: 25,
    required: [true, "Password is required for an account"],
  },
  verifiedEmail: {
    type: Boolean,
    default: false,
  },
  verifyEmailToken: String,
  verifyEmailTokenExpires: Date,
  passwordConfirm: {
    type: String,
    required: [true, "You have to confirm your password."],
    trim: true,
    validate: {
      validator: function (pConfirm) {
        return this.password === pConfirm;
      },
      message: "Confirm password must be match with password.",
    },
  },
  active: {
    type: Boolean,
    default: true,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
  passwordChangedAt: {
    type: Date,
  },
  passwordResetToken: String,
  passwordResetExpires: Date,
});

UserSchema.methods.checkPassword = async function (
  candidatePassword,
  actualPassword
) {
  return await bcrypt.compare(candidatePassword, actualPassword);
};

UserSchema.methods.checkPasswordChangedAfter = function (jwtTimeStamp) {
  const jwtTimeStampInMili = jwtTimeStamp * 1000;

  if (!this.passwordChangedAt) {
    return true;
  }
  return jwtTimeStampInMili > this.passwordChangedAt.getTime();
};

UserSchema.methods.createResetToken = function () {
  const resetToken = crypto.randomBytes(32).toString("hex");

  this.passwordResetToken = crypto
    .createHash("sha256")
    .update(resetToken)
    .digest("hex");
  this.passwordResetExpires = Date.now() + 10 * 60 * 1000;

  return resetToken;
};

UserSchema.methods.createVerificationToken = function () {
  const verifyEmailToken = crypto.randomBytes(32).toString("hex");

  this.verifyEmailToken = crypto
    .createHash("sha256")
    .update(verifyEmailToken)
    .digest("hex");
  this.verifyEmailTokenExpires = Date.now() + 24 * 60 * 60 * 1000;

  return verifyEmailToken;
};

UserSchema.pre("save", async function (next) {
  if (this.isModified("password")) {
    this.password = await bcrypt.hash(this.password, 12);
    this.passwordConfirm = undefined;
    return next();
  }

  next();
});

UserSchema.pre("save", function (next) {
  if (this.isNew || !this.isModified("password")) {
    return next();
  }

  this.passwordChangedAt = Date.now() - 1000;

  next();
});

UserSchema.pre(/^find/, function (next) {
  this.find({ active: true });
  next();
});

const UserModel = mongoose.model("User", UserSchema);

module.exports = UserModel;
