const Contact = require("../models/contactModel");
const catchAsync = require("../utils/catchAsync");
const factory = require("./handleFactory");

exports.getAllContacts = factory.getAll(Contact);
exports.createContact = factory.createOne(Contact);
exports.getContactById = factory.getOne(Contact,{path : "labels"});
exports.updateContact = factory.updateOne(Contact);
exports.deleteContact = factory.deleteOne(Contact);

exports.addLabelToContact = catchAsync(async (req, res, next) => {
  const updatedData = await Contact.findById(req.params.id);

  updatedData.labels.push(req.body.label);

  await updatedData.save();

  res.status(200).json({
    status: "success",
    data: {
      data: updatedData,
    },
  });
});

exports.removeLabelFromContact = catchAsync(async (req, res, next) => {
  const updatedData = await Contact.findById(req.params.id);
  updatedData.labels = updatedData.labels.filter(
    (el) => el.toString() !== req.body.label
  );

  await updatedData.save();
  res.status(200).json({
    status: "success",
    data: {
      data: updatedData,
    },
  });
});
