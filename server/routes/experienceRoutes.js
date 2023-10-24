import express from "express";
import {
  getAllExperiences,
  getExperiencesByCity,
  getExperiencesByCountry,
  getExperiencesById,
  getExperiencesByType,
  submitExperience,
  uploadPhoto,
} from "../controller/experienceController.js";
import { multerUpload } from "../middlewares/multer.js";

const router = express.Router();

//GET Routes
router.get("/all", getAllExperiences);
router.get("/:country", getExperiencesByCountry);
router.get("/:country/:city", getExperiencesByCity);
router.get("/type/:experienceType", getExperiencesByType);
router.get("/id/:_id", getExperiencesById);

//POST Routes
router.post("/experiencesubmission", submitExperience);
router.post("/mainphotoupload", multerUpload.single("photo"), uploadPhoto);

// set up the same for multiple upload

//Routes to set up :
//&& Query params: bookmarks.length, comments.length??

export default router;
