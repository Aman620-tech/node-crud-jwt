// const dotenv = require("dotenv");
// dotenv.config({ path: "./.env" });
// const express = require("express");

// const logger = require("morgan");

// const { routes } = require("./routes/userRoutes");
// const cors = require("cors");
// const port = parseInt(process.env.PORT);

// const mongoose = require("mongoose");
// const app = express();
// const DB = process.env.DATABASE;

// app.use(logger("dev"));
// app.use(cors());

// app.use(express.json({ extended: true }));
// app.use(express.urlencoded({ extended: true }));
// app.use(express.json());
// app.use("/", routes);

// const connect = async () => {
//   const dd = await mongoose.connect(DB);
//   if (!dd) {
//     console.log("error");
//   } else {
//     console.log("connected to database");
//   }
// };
// connect();
