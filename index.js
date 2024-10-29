import express from "express";
import mongoose from "mongoose";

import { registrationValidation } from "./validations/auth.js";

import checkAuth from "./utils/checkAuth.js";

import * as UserController from "./controllers/UserController.js";

mongoose
  .connect(
    "mongodb+srv://se3rik:SeregaSwapp1232004@mern-cluster.dtimc.mongodb.net/blog?retryWrites=true&w=majority&appName=MERN-Cluster"
  )
  .then(() => {
    console.log("DataBase OK");
  })
  .catch((err) => {
    console.log(`DataBase Error`, err);
  });

const app = express();

app.use(express.json());

app.post(
  "/auth/registration",
  registrationValidation,
  UserController.registration
);
app.post("/auth/login", UserController.authorization);
app.get("/auth/me", checkAuth, UserController.getProfileInfo);

app.listen(4444, (err) => {
  if (err) {
    return console.log(err);
  }

  console.log("Server OK");
});
