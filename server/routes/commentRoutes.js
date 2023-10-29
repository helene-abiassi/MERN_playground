import express from "express";
import {
  getAllComments,
  getCommentsByUserId,
  submitComment,
} from "../controller/commentController.js";

const router = express.Router();

//GET routes
router.get("/all", getAllComments);
router.get("/user/:author", getCommentsByUserId);

//POST routes
router.post("/commentsubmission", submitComment);

export default router;
