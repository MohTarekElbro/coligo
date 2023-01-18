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


app.use((req, res, next) => {
  var allowedOrigins = ["*"];
  var origin = req.headers.origin;
  if (allowedOrigins.indexOf(origin) > -1) {
      res.setHeader('Access-Control-Allow-Origin', origin);
  }
  res.append('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,PATCH');
  res.append('Access-Control-Allow-Headers', 'Content-Type');
  res.append('Access-Control-Allow-Headers', 'Authorization');
  next();
});

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
