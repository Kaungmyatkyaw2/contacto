const mongoose = require("mongoose");

const LabelSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Name is required for an label."],
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
  user: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
  },
});

LabelSchema.index({ user: 1, name: 1 }, { unique: true });

const LabelModel = mongoose.model("Label", LabelSchema);

module.exports = LabelModel;
