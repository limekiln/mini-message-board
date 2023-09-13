import { fileURLToPath } from "url";
import express, { NextFunction, Request, Response } from "express";
import path from "path";
import logger from "morgan";
import cookieParser from "cookie-parser";
import createHttpError from "http-errors";
import mongoose from "mongoose";
import { config } from "dotenv";

import { indexRouter } from "./routes/index";
import { newMessageRouter } from "./routes/newMessage";
import { __dirName } from "./utils";

// Setup ENV variables
config();

// Setup some constants
const SERVER_PORT = 3000;
const MONGODB_CONNECTION_STRING = process.env.MONGODB_CONNECTION_STRING;
const app = express();

// Setup database connection
mongoose.set("strictQuery", false);
const mongoConnect = async () => {
  await mongoose.connect(MONGODB_CONNECTION_STRING as string);
};
try {
  await mongoConnect();
  console.log("DB connection was successful");
} catch (error) {
  console.trace(error);
}

// view engine setup
app.set("views", path.join(__dirName, "views"));
app.set("view engine", "pug");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirName, "public")));

app.use("/", indexRouter);
app.use("/new", newMessageRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createHttpError(404));
});

// error handler
app.use(function (err: any, req: Request, res: Response, _next: NextFunction) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

app.listen(SERVER_PORT, () =>
  console.log(`Server started at port ${SERVER_PORT}`)
);
