const { default: slugify } = require("slugify");
const asyncHandler = require("express-async-handler");
const announcementModel = require("../models/announcementModel");
const ApiError = require("../utils/apiError");

exports.createAnnouncement = asyncHandler(async (req, res, next) => {
  const { data } = req.body;
  const announcement = await announcementModel.create(data);
  res.status(200).json({ data: announcement });
});

exports.getAnnouncements = asyncHandler(async (req, res, next) => {
  const page = req.query.page * 1 || 1;
  const limit = req.query.limit * 1 || 5;
  const skip = (page - 1) * limit;
  const announcements = await announcementModel.find({}).limit(limit).skip(skip);
  res.status(200).json({ length: announcements.length, page, data: announcements });
});

exports.getAnnouncement = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const announcement = await announcementModel.findById(id);
  if (!announcement) {
    return next(new ApiError("announcement not found", 404));
  }
  res.status(200).json({ data: announcement });
});

exports.updateAnnouncement = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const { data } = req.body;

  const announcement = await announcementModel.findOneAndUpdate(
    { _id: id },
    data,
    { new: true }
  );
  if (!announcement) {
    return next(new ApiError("announcement not found", 404));
  }
  res.status(200).json({ data: announcement });
});

exports.deleteAnnouncement = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const announcement = await announcementModel.findByIdAndDelete(id);

  if (!announcement) {
    return next(new ApiError(`No announcement for this id ${id}`, 404));
  }
  res.status(204).send();
});
