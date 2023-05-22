require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const app = express();
const PORT = 8000;

const beansRouter = require("./routes/beans");

app.use(express.json());
app.use("/api/beans", beansRouter);

mongoose.connect(process.env.DATABASE_URL);
const database = mongoose.connection;

database.on("error", (error) => {
  console.log(error);
});

database.once("connected", () => {
  console.log("Connected to database successfully!");
});

app.listen(PORT, () => {
  console.log(`Server Started at ${PORT}`);
});

module.exports = database;
