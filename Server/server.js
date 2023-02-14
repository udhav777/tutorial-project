const express = require("express");
const cors = require("cors");
require("dotenv").config();
const mongoose = require("mongoose");
const router = require("./routes/postRouter");
const app = express();
const port = process.env.PORT || 5000;

// midlleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use("/uploads", express.static("uploads"));

// Routes
app.use("/posts", router);

// database connetion

mongoose
  .connect(process.env.DB)
  .then(() => {
    console.log("datbase is connected");
  })
  .catch((err) => console.log(err));

app.listen(port, () => {
  console.log("server is runining at " + port);
});
