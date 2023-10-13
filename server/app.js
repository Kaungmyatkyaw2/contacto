const express = require("express");
const AppError = require("./utils/appError");
const globalErrorHandler = require("./controllers/errorController");
const userRouter = require("./routes/userRoutes");
const contactRouter = require("./routes/contactRoutes");
const labelRouter = require("./routes/labelRoutes");
const xss = require("xss-clean");
const hpp = require("hpp");
const compression = require("compression");
const mongoSanitize = require("express-mongo-sanitize");
const rateLimit = require("express-rate-limit");
const cors = require("cors");

const app = express();

app.enable("trust proxy");

const limiter = rateLimit({
  max: 1000,
  window: 1 * 60 * 60 * 1000,
  message: "Too many request. Try again after 1 hour !",
});

app.use(cors());
app.options("*", cors());
app.use("*", limiter);

app.use(express.json({ limit: "10kb" }));

app.use(xss());
app.use(mongoSanitize());
app.use(compression());
app.use(hpp());

app.use("/users", userRouter);
app.use("/contacts", contactRouter);
app.use("/labels", labelRouter);

app.use("*", (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server.`, 404));
});
app.use(globalErrorHandler);

module.exports = app;
