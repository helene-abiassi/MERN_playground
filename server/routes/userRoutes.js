import express from "express";
import {
  getAllUsers,
  getUserById,
  signUp,
  uploadImage,
} from "../controller/userController.js";
import { multerUpload } from "../middlewares/multer.js";

const router = express.Router();

//GET Routes
router.get("/all", getAllUsers);
router.get("/id/:_id", getUserById);
// router.get("/bookmarks/:_id", getUserBookmarks);
// router.get("/id/:_id", getUserSubmissions);

//POST Routes
router.post("/imageUpload", multerUpload.single("userImage"), uploadImage);
router.post("/signup", signUp);

//Posts routes:
// URL param: login

export default router;
