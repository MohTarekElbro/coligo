const { default: slugify } = require("slugify");
const asyncHandler = require("express-async-handler");
const quizModel = require("../models/quizModel");
const ApiError = require("../utils/apiError");

exports.createQuiz = asyncHandler(async (req, res, next) => {
  const quiz = await quizModel.create(req.body);
  res.status(200).json({ data: quiz });
});

exports.getQuizzes = asyncHandler(async (req, res, next) => {
  const page = req.query.page * 1 || 1;
  const limit = req.query.limit * 1 || 5;
  const skip = (page - 1) * limit;
  const categories = await quizModel.find({}).limit(limit).skip(skip);
  res.status(200).json({ length: categories.length, page, data: categories });
});

exports.getQuiz = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const quiz = await quizModel.findById(id);
  if (!quiz) {
    return next(new ApiError("quiz not found", 404));
  }
  res.status(200).json({ data: quiz });
});

exports.updateQuiz = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const { data } = req.body;

  const quiz = await quizModel.findOneAndUpdate(
    { _id: id },
    data,
    { new: true }
  );
  if (!quiz) {
    return next(new ApiError("quiz not found", 404));
  }
  res.status(200).json({ data: quiz });
});

exports.deleteQuiz = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const quiz = await quizModel.findByIdAndDelete(id);

  if (!quiz) {
    return next(new ApiError(`No quiz for this id ${id}`, 404));
  }
  res.status(204).send();
});
