import express from "express";
import {
  getAllComments,
  getCommentsByExperienceId,
  getCommentsByUserId,
  testFormRequest,
} from "../controller/commentController.js";
import jwtAuth from "../middlewares/jwtAuth.js";
import multer from "multer";
import { multerUpload } from "../middlewares/multer.js";

const router = express.Router();

//GET routes
router.get("/all", getAllComments);
router.get("/user/:author", getCommentsByUserId);
router.get("/experience/:experience", getCommentsByExperienceId);
//RAULNOTE - route to test how post request with form-data works
// router.post("/test", multerUpload.single("image"), testFormRequest);

export default router;
