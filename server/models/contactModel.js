const mongoose = require("mongoose");
const { default: validator } = require("validator");

const ContactSchema = new mongoose.Schema({
  name: {
    type: String,
    trim: true,
    minLength: [3, "Contact name must have 3 characters minimum."],
    required: [true, "Name is required for a contact."],
  },

  email: {
    type: String,
    validate: {
      validator: validator.isEmail,
      message: "Please provide a valid email.",
    },
  },
  countryCode: {
    type: String,
    trim: true,
  },
  phoneNumber: {
    type: String,
    trim: true,
    required: [true, "Phone number is required for a contact."],
  },
  photo: {
    type: String,
    trim: true,
  },
  photoPublicId: {
    type: String,
    trim: true,
  },
  bgColor: {
    type: String,
    trim: true,
    default: "#00887C",
  },
  user: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
    required: [true, "A contact must belong to an user."],
  },
  labels: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Label",
    },
  ],
});

ContactSchema.index({ name: 1, user: 1 }, { unique: true });

ContactSchema.path("labels").validate(function (value) {
  console.log(value);
  if (!value.length) {
    return true;
  }
  const uniqueLabels = new Set(value.map((label) => label.toString()));
  return uniqueLabels.size === value.length;
}, "Duplicate label IDs are not allowed.");

const ContactModel = mongoose.model("Contact", ContactSchema);

module.exports = ContactModel;
