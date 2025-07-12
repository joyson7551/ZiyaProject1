const express = require("express");
const mongoose = require("mongoose");
const dotEnv = require("dotenv");
const cors = require("cors");

dotEnv.config();

const app = express();

app.use(cors());
app.get("/", (req, res) => {
  res.send("server is up");
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

mongoose
  .connect(process.env.DATABASE_URL)
  .then(() => console.log("connected to db"))
  .catch((err) => console.error(err));

app.use("/", require("./routes/posts"));
app.listen(process.env.PORT, () =>
  console.log(`server is up on PORT:${process.env.PORT}`)
);
