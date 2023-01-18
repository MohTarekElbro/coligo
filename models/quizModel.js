const mongoose = require("mongoose");

const QuizSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Quiz name is required"],
      unique: [true, "Quiz name must be unique"],
      minlength: [3, "Too short Quiz name"],
      maxlength: [32, "Too long Quiz name"],
    },
    course: String,
    topic: String,
    duo_to: String,
  },
  { timestamps: true }
);

const QuizModel = mongoose.model("Quiz", QuizSchema);

module.exports = QuizModel;
