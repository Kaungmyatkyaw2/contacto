const multer = require("multer");
const catchAsync = require("./catchAsync");
const cloudinary = require("./cloudinary");
const AppError = require("./appError");
const uuid = require("uuid").v4;

const uploadImageToCloud = async (fPath, public_id) => {
  const options = {
    transformation: {
      width: 150,
      height: 150,
      gravity: "faces",
      crop: "fill",
    },
  };

  if (public_id) {
    options.public_id = public_id;
  }

  return await cloudinary.uploader.upload(fPath, options);
};

exports.ImageUploader = class ImageUploader {
  constructor(destination) {
    const multerStroage = multer.diskStorage({
      destination: (req, file, cb) => {
        cb(null, `public/img/${destination}`);
      },
      filename: (req, file, cb) => {
        const ext = file.mimetype.split("/")[1];
        cb(null, `${uuid()}_${Date.now()}_contactPhoto.${ext}`);
      },
    });

    const multerFileFilter = (req, file, cb) => {
      if (!file.mimetype.startsWith("image")) {
        return cb(new AppError("Please provide images only.", 400), false);
      }
      return cb(null, true);
    };

    this.multerUpload = multer({
      storage: multerStroage,
      fileFilter: multerFileFilter,
    });
  }

  uploadLocally(field) {
    return this.multerUpload.single(field);
  }

  uploadToCloudinary() {
    return catchAsync(async (req, res, next) => {
      if (!req.file) {
        return next();
      }

      const uploadedImage = await uploadImageToCloud(req.file.path);

      req.body.photo = uploadedImage.secure_url;
      req.body.photoPublicId = uploadedImage.public_id;
      next();
    });
  }
};

exports.uploadImageToCloud = uploadImageToCloud;
