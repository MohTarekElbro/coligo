const express = require("express");

const {
  createQuiz,
  getQuizzes,
  getQuiz,
  updateQuiz,
  deleteQuiz,
} = require("../services/quizService");


const router = express.Router();

router
  .route("/")
  .get(getQuizzes)
  .post(createQuiz);
router
  .route("/:id")
  .get(getQuiz)
  .put(updateQuiz)
  .delete(deleteQuiz);

module.exports = router;
