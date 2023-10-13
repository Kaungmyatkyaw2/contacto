const dotenv = require("dotenv");
const mongoose = require("mongoose");

dotenv.config({
  path: `${__dirname}/config.env`,
});

process.on("uncaughtException", (error) => {
  console.log(error.message, error.name);
  console.log("Uncaught Exception Alert!");
  process.exit(1);
});

const app = require("./app");
const server = app.listen(process.env.PORT, () => {
  console.log(`The app is started on port ${process.env.PORT}`);
});

mongoose.connect(process.env.DB_URL).then(() => {
  console.log("Database is successfully connected.");
});

process.on("unhandledRejection", (error) => {
  console.log(err.message, err.name);
  console.log("Unhandled Rejection Alert!");

  server.close(() => {
    console.log("Sever have closed down.");
    process.exit(1);
  });
});
