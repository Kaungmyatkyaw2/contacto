const express = require("express");
const { ImageUploader } = require("../utils/imageUploader");
const authController = require("../controllers/authController");
const contactController = require("../controllers/contactController");
const userController = require("../controllers/userController");
const ContactModel = require("../models/contactModel");
const Router = express.Router({ mergeParams: true });

const contactImgUploader = new ImageUploader("contacts");

Router.use((req, res, next) => {
  if (req.params.labelId) {
    req.query.labels = req.params.labelId;
  }
  next();
});

Router.use(authController.protect);
Router.route("/")
  .get(userController.setUserId("query"), contactController.getAllContacts)
  .post(
    contactImgUploader.uploadLocally("photo"),
    contactImgUploader.uploadToCloudinary(),
    userController.setUserId("body"),
    contactController.createContact
  );
Router.route("/:id")
  .get(contactController.getContactById)
  .patch(
    contactImgUploader.uploadLocally("photo"),
    contactController.updateContact
  )
  .delete(contactController.deleteContact);

Router.patch("/:id/remove-label", contactController.removeLabelFromContact);
Router.patch("/:id/add-label", contactController.addLabelToContact);

module.exports = Router;
