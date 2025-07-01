import express from "express";
import dotenv from "dotenv";

dotenv.config();
const app = express();

app.get("/", (req, res) => {
  res.send("hello world!");
});

app.listen(process.env.PORT || 5000, () => {
  console.log(`app listening on port ${process.env.PORT || 7000}`);
});
