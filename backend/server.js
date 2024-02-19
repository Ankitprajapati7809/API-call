const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const router = require("./routes/userRoute");
dotenv.config();
const app = express();
const cors = require("cors");
app.use(cors());

app.use(express.json()); // Use express.json() for parsing JSON bodies

mongoose
  .connect(process.env.URL)
  .then(() => {
    console.log("Connected Successfully");
  })
  .catch((err) => {
    console.log("error", err);
  });

// Create a user
app.use("/", router);

app.listen(4000, () => {
  console.log("Server is running at port 4000...");
});
