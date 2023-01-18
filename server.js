const express = require("express");
const dotenv = require("dotenv");
const morgan = require("morgan");
const ApiError = require("./utils/apiError");
const dbConnection = require("./config/database");
const quizRouter = require("./routes/quizRoute");
const announcementRouter = require("./routes/announcementRoute");
const globalError = require("./middlewares/errorMiddleware");

dotenv.config({ path: "config.env" });

//connect with db
dbConnection();

//espress app
const app = express();

//Middlewares
app.use(express.json());
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

//Routes
app.use("/api/v1/quizzes", quizRouter);
app.use("/api/v1/announcements", announcementRouter);

app.use("*", (req, res, next) => {
  next(new ApiError(`Can not find path ${req.originalUrl}`, 400));
});

//Global  error handling middleware for express
app.use(globalError);

const PORT = process.env.PORT || 3000;
const server = app.listen(PORT, () => {
  console.log(`app running on : ${PORT}`);
});

//handle rejection outside express
process.on("unhandledRejection", (err) => {
  console.error(`UnunhandledRejection Errors: ${err.name} | ${err.message}`);
  server.close(() => {
    console.error(`Shutting down....`);
    process.exit(1);
  });
});
