import express from "express";
import { getAllExperiences } from "../controller/experienceController.js";

const router = express.Router();

router.get("/all", getAllExperiences);

export default router;
