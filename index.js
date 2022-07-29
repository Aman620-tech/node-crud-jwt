const dotenv = require("dotenv");
dotenv.config({ path: "./.env" });
const express = require("express");

const logger = require("morgan");

const { routes } = require("./routes/userRoutes");
const cors = require("cors");
const port = parseInt(process.env.PORT);

const mongoose = require("mongoose");
const app = express();
const DB = process.env.DATABASE;

app.use(logger("dev"));
app.use(cors());

app.use(express.json({ extended: true }));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use("/", routes);

const connect = async () => {
  const dd = await mongoose.connect(DB);
  if (!dd) {
    console.log("error");
  } else {
    console.log("connected to database");
  }
};
connect();
// app.get('*', (req, res) => { res.send("Oops no path to see") })

app.get("/", (req, res) => {
  console.log("hello world!");
  res.send("Welcome to api ");
});
app.listen(port, (error) => {
  if (error) {
    console.log(error);
  } else {
    console.log(`Server started at port http://localhost:${port}`);
  }
});

module.exports = app;
