const catchAsync = require("../utils/catchAsync");
const ApiFeatures = require("../utils/apiFeature");
const AppError = require("../utils/appError");
const { uploadImageToCloud } = require("../utils/imageUploader");

exports.getAll = (Model) => {
  return catchAsync(async (req, res, next) => {
    const query = new ApiFeatures(Model.find(), req.query)
      .filter()
      .sort()
      .paginate()
      .select()
      .search();

    const data = await query.query;

    res.status(200).json({
      status: "success",
      result: data.length,
      data: {
        data,
      },
    });
  });
};

exports.createOne = (Model) => {
  return catchAsync(async (req, res, next) => {
    const data = await Model.create(req.body);

    res.status(201).json({
      status: "success",
      data: {
        data,
      },
    });
  });
};

exports.getOne = (Model, populateOpt) => {
  return catchAsync(async (req, res, next) => {
    const query = new ApiFeatures(
      Model.findById(req.params.id).populate(populateOpt),
      req.query
    ).select();
    const data = await query.query;

    if (!data) {
      return next(new AppError("No documents are found with this id.", 400));
    }

    res.status(200).json({
      status: "success",
      data: {
        data,
      },
    });
  });
};

exports.updateOne = (Model) => {
  return catchAsync(async (req, res, next) => {
    const data = await Model.findById(req.params.id);

    if (!data) {
      return next(new AppError("No documents are found with this id.", 400));
    }

    if (req.file) {
      const uploadedImage = await uploadImageToCloud(
        req.file.path,
        data.photoPublicId
      );

      req.body.photo = uploadedImage.secure_url;
      req.body.photoPublicId = uploadedImage.public_id;
    }

    const updatedData = await Model.findByIdAndUpdate(data._id, req.body, {
      new: true,
      runValidators: true,
    });

    res.status(200).json({
      status: "success",
      data: {
        data: updatedData,
      },
    });
  });
};

exports.deleteOne = (Model) => {
  return catchAsync(async (req, res, next) => {
    const delData = await Model.findByIdAndDelete(req.params.id);
    if (!delData) {
      return next(new AppError("No documents are found with this id.", 400));
    }
    res.status(204).json({
      status: "success",
      data: null,
    });
  });
};
