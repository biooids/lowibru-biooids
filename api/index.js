import express from "express";
import mongoose from "mongoose";

import dotenv from "dotenv";
dotenv.config();

const app = express();

const PORT = 3000;

app.get("/", () => {
  console.log("hello");
});

mongoose
  .connect(process.env.MONGO)
  .then(() => {
    console.log("Mongo db Atlas was connected successfully");
  })
  .catch((error) => {
    console.log(`Failed to connect to mongodb due to : ${error}`);
  });

const server = app.listen(PORT, () => {
  const host = server.address().address;
  const port = server.address().port;
  console.log(`Server is listening at http://${host}:${port}`);
});
