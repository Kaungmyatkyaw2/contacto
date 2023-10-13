const Contact = require("../models/contactModel");
const Label = require("../models/labelModel");
const catchAsync = require("../utils/catchAsync");
const factory = require("./handleFactory");

exports.getAllLabels = factory.getAll(Label);
exports.createLabel = factory.createOne(Label);
exports.getLabelById = factory.getOne(Label);
exports.updateLabel = factory.updateOne(Label);
exports.deleteLabel = factory.deleteOne(Label);

