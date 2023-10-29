import express from "express";
import {
  getAllUsers,
  getProfile,
  getUserById,
  logIn,
  signUp,
  uploadImage,
} from "../controller/userController.js";
import { multerUpload } from "../middlewares/multer.js";
import jwtAuth from "../middlewares/jwtAuth.js";

const router = express.Router();

//GET Routes
router.get("/all", getAllUsers);
router.get("/id/:_id", getUserById);
router.get("/profile", jwtAuth, getProfile);
//Add all the POST routes that need jwt

//POST Routes
router.post("/imageUpload", multerUpload.single("user_image"), uploadImage);
router.post("/signup", signUp);
router.post("/login", logIn);

export default router;
