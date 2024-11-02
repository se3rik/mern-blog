import express from "express";
import mongoose from "mongoose";
import multer from "multer";
import cors from 'cors';

import { registrationValidation, loginValidation, postCreateValidation } from "./validations/index.js";

import { UserController, PostController } from "./controllers/index.js";

import { checkAuth, handleValidationErrors } from "./utils/index.js";

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
const storage = multer.diskStorage({
  destination: (_, __, callback) => {
    callback(null, "uploads");
  },
  filename: (_, file, callback) => {
    callback(null, file.originalname);
  },
});

const upload = multer({ storage });

app.use(express.json());
app.use(cors());
app.use("/uploads", express.static("uploads"));

app.post(
  "/auth/registration",
  registrationValidation,
  handleValidationErrors,
  UserController.registration
);
app.post(
  "/auth/login",
  loginValidation,
  handleValidationErrors,
  UserController.authorization
);
app.get("/auth/me", checkAuth, UserController.getProfileInfo);

app.post("/upload", checkAuth, upload.single("image"), (req, res) => {
  res.json({
    url: `/uploads/${req.file.originalname}`,
  });
});

app.get("/posts", PostController.getAll);
app.get("/posts/:id", PostController.getOne);
app.post(
  "/posts",
  checkAuth,
  postCreateValidation,
  handleValidationErrors,
  PostController.create
);
app.patch(
  "/posts/:id",
  checkAuth,
  handleValidationErrors,
  PostController.update
);
app.delete("/posts/:id", checkAuth, PostController.remove);

app.listen(4444, (err) => {
  if (err) {
    return console.log(err);
  }

  console.log("Server OK");
});
