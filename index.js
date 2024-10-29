import express from "express";
import jwt from "jsonwebtoken";
import mongoose from "mongoose";

mongoose
  .connect(
    "mongodb+srv://se3rik:SeregaSwapp1232004@mern-cluster.dtimc.mongodb.net/?retryWrites=true&w=majority&appName=MERN-Cluster"
  )
  .then(() => {
    console.log("DataBase OK");
  })
  .catch((err) => {
    console.log(`DataBase Error`, err);
  });

const app = express();

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.post("/auth/login", (req, res) => {
  const token = jwt.sign(
    {
      email: req.body.email,
      fullName: "Vasya Pupkin",
    },
    "secret123"
  );

  res.json({
    success: true,
    token,
  });
});

app.listen(4444, (err) => {
  if (err) {
    return console.log(err);
  }

  console.log("Server OK");
});
