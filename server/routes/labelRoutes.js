const express = require("express");

const labelController = require("../controllers/labelController");
const authController = require("../controllers/authController");
const userController = require("../controllers/userController");

const Router = express.Router();

Router.use(authController.protect);
Router.route("/")
  .get(userController.setUserId("query"), labelController.getAllLabels)
  .post(userController.setUserId("body"), labelController.createLabel);

Router.route("/:id")
  .get(labelController.getLabelById)
  .patch(labelController.updateLabel)
  .delete(labelController.deleteLabel);

module.exports = Router;
