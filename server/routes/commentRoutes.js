import express from "express";
import {
  getAllComments,
  // getCommentsByExperienceId,
  getCommentsByUserId,
  submitComment,
} from "../controller/commentController.js";

const router = express.Router();

//GET routes
router.get("/all", getAllComments);
router.get("/user/:author", getCommentsByUserId);
// router.get("/experience/:_id", getCommentsByExperienceId);

//POST routes
router.post("/commentsubmission", submitComment);

export default router;
