const express = require("express");
const { ImageUploader } = require("../utils/imageUploader");
const authController = require("../controllers/authController");
const userController = require("../controllers/userController");

const userImgUploader = new ImageUploader("users");

const Router = express.Router();

Router.post(
  "/signup",
  userImgUploader.uploadLocally("photo"),
  userImgUploader.uploadToCloudinary(),
  authController.signup
);
Router.post("/verifyEmail/:token", authController.verifyEmail);
Router.post("/getVerifyEmailUrl", authController.getVerifyEmailUrl);
Router.post("/login", authController.login);

Router.use(authController.protect);
Router.patch("/updateMyPassword", authController.updateMyPassword);
Router.patch(
  "/updateMe",
  userImgUploader.uploadLocally("photo"),
  userController.protectUpdateMe,
  userController.updateMe
);
Router.get("/me", userController.getMe, userController.getUser);
Router.post("/forgotPassword", authController.forgotPassword);
Router.post("/resetPassword/:token", authController.resetPassword);

module.exports = Router;
